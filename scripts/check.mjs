import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {renderPage} from '../etoh.mjs';
import {markets} from '../expertise-v8.mjs';
import {articles} from '../articles-v16.mjs';
import {businessApplications as applications} from '../application-catalog-v17.mjs';
const inventory=JSON.parse(await fs.readFile(new URL('../seo/url-inventory.json',import.meta.url),'utf8'));
const contract=JSON.parse(await fs.readFile(new URL('../seo/migration-contract.json',import.meta.url),'utf8'));
const approvedByPath=new Map();
for(const row of contract.urls.filter(row=>Object.hasOwn(row,'approvedMetadata'))){
  const approved=row.approvedMetadata,fields=['title','description','approvedOn','reason'];
  assert.ok(row.expectedStatus===200&&inventory.pages.some(page=>page.path===row.path),'Approved metadata must belong to a retained original URL');
  assert.ok(approved&&typeof approved==='object'&&!Array.isArray(approved)&&Object.keys(approved).length===fields.length&&fields.every(field=>typeof approved[field]==='string'&&approved[field].trim()),row.path+' invalid approved metadata fields');
  const date=new Date(approved.approvedOn);
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(approved.approvedOn)&&Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===approved.approvedOn,row.path+' invalid approval date');
  assert.ok(!approvedByPath.has(row.path),row.path+' duplicate metadata approval');
  approvedByPath.set(row.path,approved);
}
const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0'};
function decode(value){return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi,(entity,key)=>{
  if(key[0]!=='#')return entities[key.toLowerCase()];
  const code=key[1].toLowerCase()==='x'?parseInt(key.slice(2),16):parseInt(key.slice(1),10);
  return code>0&&code<=0x10ffff?String.fromCodePoint(code):entity;
});}
function attributes(tag){const result={};for(const match of tag.replace(/^<[^\s>]+/,'').matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g))result[match[1].toLowerCase()]=decode(match[2]??match[3]??match[4]??'');return result;}
function metadata(html){
  const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1]??'';
  return {
    titles:[...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)].map(match=>decode(match[1]).trim()),
    descriptions:[...head.matchAll(/<meta\b[^>]*>/gi)].map(match=>attributes(match[0])).filter(meta=>meta.name?.toLowerCase()==='description').map(meta=>meta.content??''),
    canonicals:[...head.matchAll(/<link\b[^>]*>/gi)].map(match=>attributes(match[0])).filter(link=>link.rel?.toLowerCase().split(/\s+/).includes('canonical')).map(link=>link.href??'')
  };
}
const routes=[...inventory.pages.map(p=>p.path),'/packaging/','/iso-tank/','/quality/','/partner/','/quote/','/seo-audit/','/muku/','/muku/products/','/muku/contact/','/muku/business/','/muku/about/','/muku/quality/','/muku/product/hand-spray-70/','/muku/product/hand-sanitizer-75/','/muku/product/hand-gel-75/','/muku/product/alcohol-solution/'];
routes.push('/industries/',...markets.map(m=>'/industries/'+m.slug+'/'),'/logistics/','/cart/','/checkout/');
routes.push(...articles.filter(a=>!routes.includes(a.path)).map(a=>a.path));
routes.push('/applications/',...applications.map(a=>'/applications/'+a.slug+'/'));
const failures=[],localLinks=new Set(),assets=new Set();let legacyOK=0;let approvedOK=0;let legacyRedirects=0;
routes.push('/oem/','/stock-management/');
for(const route of routes){
  const r=await renderPage(route);
  try{
    if(route==='/product/pharmol-70/'){assert.equal(r.status,301);assert.equal(r.redirect,'/undenatured-alcohol/');legacyRedirects++;continue;}
    assert.equal(r.status,200,route+' status');
    assert.match(r.html,/<meta name="robots" content="noindex,nofollow">/);
    assert.equal((r.html.match(/<h1(?:\s|>)/g)||[]).length,1,route+' requires one H1');
    const old=inventory.pages.find(page=>page.path===route),approved=approvedByPath.get(route);
    if(old?.title||approved){
      const expected=approved??old,actual=metadata(r.html),policy=approved?'approved':'original';
      assert.deepEqual(actual.titles,[expected.title],route+' '+policy+' title');
      if(expected.description)assert.deepEqual(actual.descriptions,[expected.description],route+' '+policy+' description');
      if(old.canonical)assert.deepEqual(actual.canonicals,[old.canonical],route+' original canonical');
      if(approved)approvedOK++;else legacyOK++;
    }
    assert.ok(r.html.includes('https://line.me/R/ti/p/~@'+(route.startsWith('/muku/')?'mukushop':'etohcols')));
    for(const match of r.html.matchAll(/href="(\/[^"?#]*)/g))if(!match[1].includes('.')&&match[1]!=='/')localLinks.add(match[1]);
    for(const match of r.html.matchAll(/(?:src|href)="(\/(?:assets\/[^"?]+|style.css|app.js))/g))assets.add(match[1]);
  }catch(error){failures.push(error.message);}
}
const broken=[];for(const route of localLinks){const r=await renderPage(route.endsWith('/')?route:route+'/');if(r.status===301&&r.redirect&&r.redirect!==route){if((await renderPage(r.redirect)).status!==200)broken.push(route);}else if(r.status!==200)broken.push(route);}
for(const asset of assets){try{await fs.access(new URL('../dist'+asset,import.meta.url));}catch{failures.push('Missing '+asset);}}
assert.equal((await renderPage('/this-page-does-not-exist/')).status,404);
const report={checkedAt:new Date().toISOString(),routes:routes.length,legacyMetadataPreserved:legacyOK,approvedMetadataApplied:approvedOK,legacyRedirects,assets:assets.size,failures,brokenInternalLinks:broken};
await fs.writeFile(new URL('../seo/validation.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length||broken.length)process.exitCode=1;
