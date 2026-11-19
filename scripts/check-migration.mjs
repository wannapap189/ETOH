import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const limits = {requests: 140, timeoutMs: 10000, responseBytes: 2 * 1024 * 1024, sitemapDocuments: 16, sitemapEntries: 10000};
const help = `Usage: node scripts/check-migration.mjs --base-url <http(s)origin> --mode preview|production [--report <path>]

Reads seo/migration-contract.json and makes bounded, read-only HTTP GET requests.
The target may be a staging origin; canonical URLs must still use the live origin.
Preview requires indexing blocks. Production checks approved indexable pages,
sitemaps, existing verification tokens, and unresolved release decisions.
Relative report paths resolve from the web-preview directory. Default:
seo/migration-validation-{mode}.json. No raw HTML or verification tokens are saved.
Exit 0: assertions passed (review any warnings); 1: assertions failed; 2: configuration/runtime error.
This is a limited HTTP check, not a full crawl, privacy audit, or SEO retention guarantee.`;

function options(args) {
  if (args.includes('--help') || args.includes('-h')) return {help: true};
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    if (!['--base-url', '--mode', '--report'].includes(key) || !args[i + 1] || args[i + 1].startsWith('--') || result[key]) throw new Error('Invalid CLI options. Use --help.');
    result[key] = args[i + 1];
  }
  if (!result['--base-url'] || !['preview', 'production'].includes(result['--mode'])) throw new Error('Explicit --base-url and --mode preview|production are required.');
  let base;
  try { base = new URL(result['--base-url']); } catch { throw new Error('The base URL must be an HTTP(S) origin.'); }
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash) throw new Error('The base URL must be an HTTP(S) origin without credentials, path, query, or fragment.');
  return {base: base.origin, mode: result['--mode'], report: path.resolve(root, result['--report'] || `seo/migration-validation-${result['--mode']}.json`)};
}

const namedEntities = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', ndash: '–', mdash: '—', hellip: '…', copy: '©', reg: '®', trade: '™', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', ensp: '\u2002', emsp: '\u2003'};
function decode(value = '') {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, entity) => {
    if (entity[0] !== '#') return namedEntities[entity.toLowerCase()] ?? all;
    const n = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : all;
  });
}
function attrs(tag) {
  const result = {};
  for (const m of tag.replace(/^<\/?[^\s>]+/, '').matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) result[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return result;
}
function textOnly(html) { return decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '').replace(/<[^>]*>/g, '')).trim(); }
function pageInfo(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
  return {
    titles: [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)].map(m => decode(m[1]).trim()),
    descriptions: metas.filter(m => m.name?.toLowerCase() === 'description').map(m => m.content ?? ''),
    canonicals: [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).filter(m => m.rel?.toLowerCase().split(/\s+/).includes('canonical')).map(m => m.href ?? ''),
    robotMeta: metas.filter(m => ['robots', 'googlebot'].includes(m.name?.toLowerCase())).map(m => m.content ?? '').join(','),
    verification: metas.filter(m => m.name?.toLowerCase() === 'google-site-verification').map(m => m.content ?? ''),
    h1Count: [...html.matchAll(/<h1(?:\s|>)/gi)].length,
    bodyPresent: Boolean(textOnly(html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1] ?? ''))
  };
}
const hasNoindex = value => /(?:^|[\s,;:])(?:noindex|none)(?:$|[\s,;])/i.test(value);

function robotsGroups(text) {
  const groups = [];
  let group = null, hasRules = false;
  for (const raw of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = match[1].trim().toLowerCase(), value = match[2].trim();
    if (key === 'user-agent') {
      if (!group || hasRules) { group = {agents: [], rules: []}; groups.push(group); hasRules = false; }
      group.agents.push(value.toLowerCase());
    } else if (group && ['allow', 'disallow'].includes(key)) {
      hasRules = true;
      if (value) group.rules.push({allow: key === 'allow', value});
    }
  }
  return groups;
}
function robotAllows(groups, pathname, agent) {
  let selected = groups.filter(g => g.agents.includes(agent));
  if (!selected.length) selected = groups.filter(g => g.agents.includes('*'));
  const matching = selected.flatMap(g => g.rules).filter(rule => {
    const pattern = rule.value.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '.*').replace(/\\\$$/, '$');
    return new RegExp('^' + pattern).test(pathname);
  }).sort((a, b) => b.value.replace(/[*$]/g, '').length - a.value.replace(/[*$]/g, '').length || Number(b.allow) - Number(a.allow));
  return matching.length ? matching[0].allow : true;
}

function validateContract(contract) {
  let canonical;
  try { canonical = new URL(contract.canonicalOrigin); } catch { throw new Error('Invalid canonical origin in migration contract.'); }
  if (!['http:', 'https:'].includes(canonical.protocol) || canonical.origin !== contract.canonicalOrigin || canonical.username || canonical.password) throw new Error('Invalid canonical origin in migration contract.');
  if (!Array.isArray(contract.urls) || !contract.urls.length || contract.urls.length > 100 || !Array.isArray(contract.releaseDecisions) || !Array.isArray(contract.verification?.googleSiteVerification)) throw new Error('Invalid migration contract structure.');
  const seen = new Set();
  for (const row of contract.urls) {
    if (typeof row.path !== 'string' || !row.path.startsWith('/') || row.path.startsWith('//') || /[?#\\]/.test(row.path) || seen.has(row.path) || ![200, 301].includes(row.expectedStatus) || !['index', 'review'].includes(row.indexing) || typeof row.sitemapRequired !== 'boolean' || typeof row.baseline?.title !== 'string' || typeof row.baseline?.description !== 'string') throw new Error('Invalid or duplicate URL row in migration contract.');
    seen.add(row.path);
    if (row.expectedStatus === 301 && (typeof row.location !== 'string' || !row.location.startsWith('/') || row.location.startsWith('//') || /[?#\\]/.test(row.location))) throw new Error('Redirect rows require an origin-relative destination.');
    if (row.expectedStatus === 200 && row.canonical !== contract.canonicalOrigin + row.path) throw new Error('Retained-page canonical must match its live origin and exact path.');
    if (row.sitemapRequired && (row.indexing !== 'index' || row.expectedStatus !== 200)) throw new Error('Only approved, retained 200 pages may require sitemap inclusion.');
  }
  if (contract.verification.googleSiteVerification.some(t => typeof t !== 'string' || !t.trim())) throw new Error('Invalid verification token list.');
}

async function run(config) {
  const contract = JSON.parse(await fs.readFile(path.join(root, 'seo/migration-contract.json'), 'utf8'));
  validateContract(contract);
  const failures = [], warnings = [], pages = [], cache = new Map();
  let requestCount = 0;
  const fail = (code, pathname, detail) => failures.push({code, ...(pathname ? {path: pathname} : {}), ...(detail ? {detail} : {})});
  const warn = (code, pathname) => warnings.push({code, path: pathname, reviewRequired: true});
  async function request(pathname) {
    const url = new URL(pathname, config.base);
    if (url.origin !== config.base || url.username || url.password) { fail('off-origin-request-refused'); return null; }
    if (cache.has(url.href)) return cache.get(url.href);
    if (requestCount >= limits.requests) { fail('request-limit-exceeded'); return null; }
    requestCount++;
    let result = null;
    try {
      const response = await fetch(url, {redirect: 'manual', signal: AbortSignal.timeout(limits.timeoutMs), headers: {'User-Agent': 'Etohcols-Migration-HTTP-Check/1.0'}});
      const reader = response.body?.getReader();
      let bytes = 0;
      const chunks = [];
      if (reader) for (;;) {
        const item = await reader.read();
        if (item.done) break;
        bytes += item.value.byteLength;
        if (bytes > limits.responseBytes) { await reader.cancel(); throw new Error('Response too large'); }
        chunks.push(item.value);
      }
      result = {status: response.status, text: Buffer.concat(chunks).toString('utf8'), headers: response.headers};
    } catch { fail('request-failed-or-limit-exceeded', url.pathname); }
    cache.set(url.href, result);
    return result;
  }
  function liveDestination(location, requestPath) {
    try {
      const destination = new URL(location, new URL(requestPath, config.base));
      if (![config.base, contract.canonicalOrigin].includes(destination.origin) || destination.username || destination.password) return null;
      return contract.canonicalOrigin + destination.pathname + destination.search + destination.hash;
    } catch { return null; }
  }

  for (const row of contract.urls) {
    const response = await request(row.path);
    const record = {path: row.path, expectedStatus: row.expectedStatus, status: response?.status ?? null};
    pages.push(record);
    if (!response) continue;
    if (response.status !== row.expectedStatus) fail('unexpected-status', row.path);
    if (row.expectedStatus === 301) {
      record.destinationMatches = liveDestination(response.headers.get('location') ?? '', row.path) === contract.canonicalOrigin + row.location;
      if (!record.destinationMatches) fail('redirect-destination-mismatch', row.path);
      const target = await request(row.location);
      record.targetStatus = target?.status ?? null;
      if (target && target.status !== 200) fail('redirect-target-not-direct-200', row.path);
      continue;
    }
    if (response.status !== 200) continue;
    const info = pageInfo(response.text);
    record.canonicalMatches = info.canonicals.length === 1 && info.canonicals[0] === row.canonical;
    if (!record.canonicalMatches) fail('canonical-mismatch-or-duplicate', row.path);
    if (info.titles.length !== 1 || !info.titles[0]) fail('title-missing-or-duplicate', row.path);
    if (info.h1Count !== 1) fail('requires-exactly-one-h1', row.path);
    if (!info.bodyPresent) fail('body-content-missing', row.path);
    if (row.baseline.title && info.titles[0] !== row.baseline.title) warn('baseline-title-changed', row.path);
    if (row.baseline.description && (info.descriptions.length !== 1 || info.descriptions[0] !== row.baseline.description)) warn('baseline-description-changed', row.path);
    record.metaNoindex = hasNoindex(info.robotMeta);
    record.headerNoindex = hasNoindex(response.headers.get('x-robots-tag') ?? '');
    if (config.mode === 'preview' && (!record.metaNoindex || !record.headerNoindex)) fail('preview-indexing-protection-missing', row.path);
    if (config.mode === 'production' && row.indexing === 'index' && (record.metaNoindex || record.headerNoindex)) fail('production-page-noindex', row.path);
  }

  const unknownPath = '/__etohcols_migration_check_missing_20261119__/';
  if (contract.urls.some(row => row.path === unknownPath)) throw new Error('The fixed missing-page probe conflicts with the contract.');
  const missing = await request(unknownPath);
  if (missing && missing.status !== 404) fail('unknown-url-must-return-404', unknownPath);
  const robots = await request('/robots.txt');
  if (robots && robots.status !== 200) fail('robots-not-200', '/robots.txt');
  if (robots && /<(?:!doctype\s+html|html)\b/i.test(robots.text)) fail('robots-returned-html', '/robots.txt');
  const groups = robotsGroups(robots?.text ?? '');
  if (config.mode === 'preview') {
    if (robotAllows(groups, '/', '*')) fail('preview-robots-root-not-blocked', '/robots.txt');
    for (const row of contract.urls.filter(r => r.expectedStatus === 200)) if (robotAllows(groups, row.path, 'googlebot')) fail('preview-robots-page-not-blocked', row.path);
  } else {
    for (const row of contract.urls.filter(r => r.expectedStatus === 200 && r.indexing === 'index')) {
      if (['*', 'googlebot'].some(agent => !robotAllows(groups, row.path, agent))) fail('production-robots-page-blocked', row.path);
    }
  }

  const sitemap = {checked: config.mode === 'production', documents: 0, urlCount: 0};
  const verification = {checked: config.mode === 'production', requiredTokenCount: contract.verification.googleSiteVerification.length, matchedTokenCount: null, accountAccessProven: false};
  if (config.mode === 'production') {
    for (const decision of contract.releaseDecisions.filter(d => d.status === 'pending')) fail('pending-release-decision', undefined, String(decision.id));
    const home = await request('/');
    if (home?.status !== 200) fail('verification-homepage-not-200', '/');
    const presentTokens = home ? pageInfo(home.text).verification : [];
    verification.matchedTokenCount = contract.verification.googleSiteVerification.filter(token => presentTokens.includes(token)).length;
    if (!verification.requiredTokenCount) fail('verification-baseline-missing', '/');
    if (verification.matchedTokenCount !== verification.requiredTokenCount) fail('existing-google-verification-not-preserved', '/');
    const queue = ['/sitemap.xml'], seen = new Set(), sitemapURLs = new Set();
    let entryCount = 0;
    while (queue.length) {
      const sitemapPath = queue.shift();
      if (seen.has(sitemapPath)) continue;
      if (seen.size >= limits.sitemapDocuments) { fail('sitemap-document-limit-exceeded'); break; }
      seen.add(sitemapPath);
      const response = await request(sitemapPath);
      if (!response) continue;
      if (response.status !== 200) { fail('sitemap-not-200', new URL(sitemapPath, config.base).pathname); continue; }
      if (/<!DOCTYPE|<!ENTITY/i.test(response.text)) { fail('unsupported-sitemap-declarations'); continue; }
      const isIndex = /<(?:[\w.-]+:)?sitemapindex(?:\s|>)/i.test(response.text);
      if (!isIndex && !/<(?:[\w.-]+:)?urlset(?:\s|>)/i.test(response.text)) { fail('invalid-sitemap-root'); continue; }
      const tag = isIndex ? 'sitemap' : 'url';
      const entries = [...response.text.matchAll(new RegExp('<(?:[\\w.-]+:)?' + tag + '\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?' + tag + '\\s*>', 'gi'))];
      if (isIndex && !entries.length) fail('empty-sitemap-index');
      for (const entry of entries) {
        if (++entryCount > limits.sitemapEntries) break;
        const loc = decode(entry[1].match(/<(?:[\w.-]+:)?loc\b[^>]*>([\s\S]*?)<\/(?:[\w.-]+:)?loc\s*>/i)?.[1]?.trim() ?? '');
        let destination;
        try { destination = new URL(loc); } catch { fail('invalid-sitemap-location'); continue; }
        if (destination.username || destination.password || destination.hash) { fail('invalid-sitemap-location'); continue; }
        if (isIndex) {
          if (![config.base, contract.canonicalOrigin].includes(destination.origin)) { fail('off-origin-child-sitemap-refused'); continue; }
          queue.push(destination.pathname + destination.search);
        } else {
          if (destination.origin !== contract.canonicalOrigin) fail('sitemap-url-not-canonical-origin');
          sitemapURLs.add(destination.href);
        }
      }
      if (entryCount > limits.sitemapEntries) { fail('sitemap-entry-limit-exceeded'); break; }
    }
    sitemap.documents = seen.size;
    sitemap.urlCount = sitemapURLs.size;
    for (const row of contract.urls) {
      if (row.sitemapRequired && !sitemapURLs.has(row.canonical)) fail('required-canonical-missing-from-sitemap', row.path);
      if ((row.expectedStatus === 301 || row.indexing === 'review') && sitemapURLs.has(contract.canonicalOrigin + row.path)) fail('redirect-or-review-url-in-sitemap', row.path);
    }
  }

  const report = {
    checkedAt: new Date().toISOString(), mode: config.mode, baseOrigin: config.base, canonicalOrigin: contract.canonicalOrigin,
    passed: failures.length === 0, reviewRequired: warnings.length > 0, requestCount, limits, pages, sitemap, verification,
    failures, warnings,
    limitations: ['Limited HTTP checks against the supplied origin; not a full crawl, privacy audit, or SEO retention guarantee.', 'Normal offsite hyperlinks and live canonical destinations are not fetched.', 'Existing verification markup does not prove account access or ownership.', 'Metadata differences require editorial review; no page content or production setting is changed.', 'Sitemap URL membership is checked; extra unlisted sitemap pages are not crawled.', 'No raw HTML, metadata text, or verification tokens are included in this report.']
  };
  await fs.mkdir(path.dirname(config.report), {recursive: true});
  await fs.writeFile(config.report, JSON.stringify(report, null, 2) + '\n');
  console.log(`Migration HTTP check (${config.mode}): ${pages.length} routes, ${failures.length} failures, ${warnings.length} review warnings. JSON report saved.`);
  process.exitCode = failures.length ? 1 : 0;
}

try {
  const config = options(process.argv.slice(2));
  if (config.help) console.log(help);
  else await run(config);
} catch {
  console.error('Migration checker configuration or runtime error. Check CLI options, contract schema, and report-path permissions. Use --help for usage.');
  process.exitCode = 2;
}
