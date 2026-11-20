import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {renderPage} from '../etoh.mjs';
import {articles} from '../articles-v16.mjs';
import {newArticlesV37,newSourcesV37,relatedArticlePathsV37} from '../articles-v37.mjs';
import {translate} from '../localization-v24.mjs';

assert.equal(newArticlesV37.length,6);
assert.equal(articles.length,12);
assert.equal(new Set(articles.map(a=>a.path)).size,12);
const hashes=[];
for(const article of newArticlesV37){
 const asset=await fs.readFile(new URL('../dist/assets/business-v9/'+article.image+'.webp',import.meta.url));
 hashes.push(createHash('sha256').update(asset).digest('hex'));
 assert.equal(article.sections.length,6,article.path+' section count');
 assert.equal(new Set(article.sections.map(s=>s[0])).size,6,article.path+' unique section IDs');
 assert.ok(article.sections.some(s=>s[2].includes('<table>')),article.path+' comparison table');
 assert.ok(article.sections.some(s=>s[2].includes('<ul>')),article.path+' actionable checklist');
 assert.ok(article.sources.length>=2,article.path+' sources');
 for(const key of article.sources)assert.ok(newSourcesV37[key]?.[1].startsWith('https://'),article.path+' source '+key);
 for(const english of [false,true]){
  const prefix=english?'/en':'';
  const path=prefix+article.path;
  const {html,status}=await renderPage(path);
  assert.equal(status,200,path);
  const title=english?translate(article.title):article.title;
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path+' one h1');
  assert.ok(html.includes('<h1>'+title+'</h1>'),path+' accurate headline');
  assert.ok(html.includes('rel="canonical" href="https://etohcols.com'+path+'"'),path+' canonical');
  for(const language of ['th','en'])assert.ok(html.includes('hreflang="'+language+'"'),path+' alternate '+language);
  assert.ok(/<meta name="robots" content="noindex,\s*nofollow"/.test(html),path+' preview protection');
  assert.doesNotMatch(html,/\/assets\/documents\//,path+' no original certificates');
  const graphs=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  const graph=graphs.find(g=>g['@graph']?.some(n=>n['@type']==='Article'));
  assert.ok(graph,path+' Article markup');
  const node=graph['@graph'].find(n=>n['@type']==='Article');
  assert.equal(node.url,'https://etohcols.com'+path);
  assert.equal(node.headline,title);
  assert.equal(node.inLanguage,english?'en':'th');
  assert.equal(node.dateModified,'2026-11-20');
  assert.ok(!node.datePublished&&!node.author,path+' no invented publication date/author');
  assert.deepEqual(node.citation,article.sources.map(key=>newSourcesV37[key][1]));
  if(english)assert.doesNotMatch(JSON.stringify(graph),/[\u0e00-\u0e7f]/,path+' English schema');
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const [id] of article.sections){assert.ok(ids.has(id));assert.ok(html.includes('href="#'+id+'"'));}
  for(const related of relatedArticlePathsV37[article.path])assert.ok(html.includes('href="'+prefix+related+'"'),path+' related link '+related);
 }
}
assert.equal(new Set(hashes).size,6,'Six distinct new hero assets');
for(const prefix of ['','/en']){
 const hub=await renderPage(prefix+'/blog/');
 for(const article of articles)assert.ok(hub.html.includes('href="'+prefix+article.path+'"'),'Hub discovery '+prefix+article.path);
 assert.equal((hub.html.match(/class="k16-card"/g)||[]).length,12);
}
console.log('Six new articles passed: 12 bilingual pages, distinct photos, source citations, navigation, document privacy, SEO and preview protection. Knowledge hub contains all 12 articles.');
