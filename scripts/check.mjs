import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {renderPage,escape} from '../etoh.mjs';
import {markets} from '../expertise-v8.mjs';
import {articles} from '../articles-v16.mjs';
import {businessApplications as applications} from '../application-catalog-v17.mjs';
const inventory=JSON.parse(await fs.readFile(new URL('../seo/url-inventory.json',import.meta.url),'utf8'));
const routes=[...inventory.pages.map(p=>p.path),'/packaging/','/iso-tank/','/quality/','/partner/','/quote/','/seo-audit/','/muku/','/muku/products/','/muku/contact/','/muku/business/','/muku/about/','/muku/quality/','/muku/product/hand-spray-70/','/muku/product/hand-sanitizer-75/','/muku/product/hand-gel-75/','/muku/product/alcohol-solution/'];
routes.push('/industries/',...markets.map(m=>'/industries/'+m.slug+'/'),'/logistics/','/cart/','/checkout/');
routes.push(...articles.filter(a=>!routes.includes(a.path)).map(a=>a.path));
routes.push('/applications/',...applications.map(a=>'/applications/'+a.slug+'/'));
const failures=[],localLinks=new Set(),assets=new Set();let legacyOK=0;let legacyRedirects=0;
routes.push('/oem/','/stock-management/');
for(const route of routes){const r=await renderPage(route);try{if(route==='/product/pharmol-70/'){assert.equal(r.status,301);assert.equal(r.redirect,'/undenatured-alcohol/');legacyRedirects++;continue;}assert.equal(r.status,200,route+' status');assert.match(r.html,/<meta name="robots" content="noindex,nofollow">/);assert.equal((r.html.match(/<h1(?:\s|>)/g)||[]).length,1,route+' requires one H1');const old=inventory.pages.find(p=>p.path===route);if(old?.title){assert.ok(r.html.includes('<title>'+escape(old.title)+'</title>'),route+' original title');if(old.canonical)assert.ok(r.html.includes('href="'+escape(old.canonical)+'"'),route+' canonical');if(old.description)assert.ok(r.html.includes('content="'+escape(old.description)+'"'),route+' description');legacyOK++;}assert.ok(r.html.includes('https://line.me/R/ti/p/~@'+(route.startsWith('/muku/')?'mukushop':'etohcols')));for(const m of r.html.matchAll(/href="(\/[^"?#]*)/g)){if(!m[1].includes('.')&&m[1]!=='/')localLinks.add(m[1]);}for(const m of r.html.matchAll(/(?:src|href)="(\/(?:assets\/[^"?]+|style.css|app.js))/g))assets.add(m[1]);}catch(e){failures.push(e.message);}}
const broken=[];for(const route of localLinks){const r=await renderPage(route.endsWith('/')?route:route+'/');if(r.status===301&&r.redirect&&r.redirect!==route){if((await renderPage(r.redirect)).status!==200)broken.push(route);}else if(r.status!==200)broken.push(route);}
for(const asset of assets){try{await fs.access(new URL('../dist'+asset,import.meta.url));}catch{failures.push('Missing '+asset);}}
assert.equal((await renderPage('/this-page-does-not-exist/')).status,404);
const report={checkedAt:new Date().toISOString(),routes:routes.length,legacyMetadataPreserved:legacyOK,legacyRedirects,assets:assets.size,failures,brokenInternalLinks:broken};
await fs.writeFile(new URL('../seo/validation.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length||broken.length)process.exitCode=1;
