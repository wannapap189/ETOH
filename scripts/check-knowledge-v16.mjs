import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {renderPage} from '../etoh.mjs';
import {articles} from '../articles-v16.mjs';
import {businessProducts} from '../business-v9.mjs';
const base='http://127.0.0.1:4186';
assert.equal(businessProducts.length,8);
assert.deepEqual(businessProducts.filter(p=>p.brand==='PHARMOL').map(p=>p.percent),['95','96','99.9']);
assert.deepEqual(businessProducts.filter(p=>p.brand==='ETOH').map(p=>p.percent),['70','75','95','96','99.9']);
assert.deepEqual(businessProducts.filter(p=>p.planned).map(p=>p.sku),[]);
const pages=['/blog/','/category/ethanol-alcohol/','/faqs/',...articles.map(a=>a.path)];
// Public technical references only; these hosts do not expose company certificates.
const allowedSources=new Set(['www.cdc.gov','www.ttb.gov','www6.excise.go.th','cosmetic.fda.moph.go.th','lawelcs.excise.go.th','www.ema.europa.eu','pubchem.ncbi.nlm.nih.gov','eur-lex.europa.eu','www.osha.gov','cosmeticseurope.eu']);
let anchors=0;
for(const path of pages){
 const r=await fetch(base+path);assert.equal(r.status,200,path);assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow');const html=await r.text();
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path);
 assert.match(html,/knowledge-v16.css/);assert.doesNotMatch(html,/\/assets\/documents\//);
 assert.doesNotMatch(html,/PAK\s*ETHANOL|Mandalay\s*Beverages/i);
 const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
 for(const [,id] of html.matchAll(/href="#([^"]+)"/g)){assert.ok(ids.has(id),path+' missing #'+id);anchors++;}
 for(const [,href] of html.matchAll(/href="(https:[^"]+)"/g)){if(/\.pdf(?:[?&"]|$)|media\.php|pdfviewer/.test(href))assert.ok(allowedSources.has(new URL(href.replaceAll('&amp;','&')).hostname),'Unapproved public document: '+href);}
 if(articles.some(a=>a.path===path))assert.ok(html.includes('href="https://etohcols.com'+path+'"'),path+' canonical');
}
for(const path of ['/shop/','/undenatured-alcohol/','/denatured-alcohol/','/quote/','/logistics/']){
 const {html}=await renderPage(path);assert.doesNotMatch(html,/(?:href="\/product\/|value="|data-sku=")pharmol-(?:70|75)/i,path+' retired SKU');
}
for(const path of ['/product/pharmol-70/','/product/pharmol-75/']){
 const r=await fetch(base+path,{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'/undenatured-alcohol/');
}
const report={checkedAt:new Date().toISOString(),pages:pages.length,anchors,articleCount:articles.length,productCount:businessProducts.length,retiredProductRedirects:2,failures:[]};
await fs.writeFile(new URL('../seo/knowledge-validation-v16.json',import.meta.url),JSON.stringify(report,null,2));console.log(report);
