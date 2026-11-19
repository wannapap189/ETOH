import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPage} from '../etoh.mjs';
import {englishRoutes} from '../localization-v24.mjs';

// Read-only rendering audit. The only generated artifact is the JSON report in seo/.
const root=fileURLToPath(new URL('../',import.meta.url));
const origin='https://etohcols.com';
const supported=new Set(JSON.parse(await fs.readFile(path.join(root,'locales/en/routes.json'),'utf8')));
const thai=/[\u0e00-\u0e7f]/u;
const voids=new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const decode=value=>String(value).replace(/&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi,entity=>{
  const named={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' '};
  const lower=entity.toLowerCase();
  if(named[lower]!==undefined)return named[lower];
  const code=lower.startsWith('&#x')?parseInt(lower.slice(3,-1),16):parseInt(lower.slice(2,-1),10);
  return Number.isFinite(code)&&code<=0x10ffff?String.fromCodePoint(code):entity;
});
const normalize=value=>decode(value).replace(/\s+/gu,' ').trim();
function attrs(tag){
  const result={};
  const body=tag.replace(/^<\/?[\w:-]+/,'').replace(/\/?\s*>$/,'');
  for(const m of body.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g))result[m[1].toLowerCase()]=decode(m[2]??m[3]??m[4]??'');
  return result;
}
function inspect(html){
  const tags=[],texts=[],stack=[];
  const tokens=html.match(/<!--[\s\S]*?-->|<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)\s*>|<[^>]+>|[^<]+/gi)||[];
  for(const token of tokens){
    if(token.startsWith('<!--')||/^<!/i.test(token))continue;
    if(/^<(script|style)\b/i.test(token)){
      const head=token.match(/^<[^>]+>/)?.[0];
      if(head)tags.push({name:head.match(/^<([\w:-]+)/)[1].toLowerCase(),attrs:attrs(head)});
      continue;
    }
    if(token.startsWith('</')){
      const name=token.match(/^<\/([\w:-]+)/)?.[1].toLowerCase();
      const index=stack.findLastIndex(item=>item.name===name);
      if(index>=0)stack.length=index;
      continue;
    }
    if(token.startsWith('<')){
      const name=token.match(/^<([\w:-]+)/)?.[1].toLowerCase();
      if(!name)continue;
      const tag={name,attrs:attrs(token)};
      tags.push(tag);
      if(!voids.has(name)&&!token.endsWith('/>'))stack.push(tag);
      continue;
    }
    const text=normalize(token);
    if(text)texts.push({text,tag:stack.at(-1)?.name||'',languageSwitch:stack.some(tag=>tag.attrs['data-language']==='th')});
  }
  return {tags,texts};
}

const failures=[],missing=new Map(),assets=new Map(),internalTargets=new Set(),routeResults=[];
const fail=(route,kind,detail)=>failures.push({route,kind,detail});
const untranslated=(route,value,kind)=>{
  const key=normalize(value);
  if(!thai.test(key))return;
  const record=missing.get(key)||{source:key,routes:[],contexts:[]};
  if(!record.routes.includes(route))record.routes.push(route);
  if(!record.contexts.includes(kind))record.contexts.push(kind);
  missing.set(key,record);
};
const cache=new Map();
async function render(route){if(!cache.has(route))cache.set(route,await renderPage(route));return cache.get(route);}
function internalURL(raw,route){
  if(!raw||/^(?:data:|mailto:|tel:|javascript:)/i.test(raw))return null;
  try{
    const url=new URL(raw,origin+route);
    return ['etohcols.com','www.etohcols.com'].includes(url.hostname)?url:null;
  }catch{return null;}
}
const sourceCoverage=[];
for(const index of [1,2,3]){
  const source=JSON.parse(await fs.readFile(path.join(root,`locales/en/source-${index}.json`),'utf8'));
  let translations={};
  try{translations=JSON.parse(await fs.readFile(path.join(root,`locales/en/translations-${index}.json`),'utf8'));}
  catch(error){fail(`translations-${index}.json`,'dictionary-load',error.message);}
  const keys=new Set(source.map(item=>item.source));
  const absent=[...keys].filter(key=>typeof translations[key]!=='string'||!translations[key].trim());
  const extra=Object.keys(translations).filter(key=>!keys.has(key));
  const untranslatedValues=Object.entries(translations).filter(([,value])=>thai.test(value)).map(([key])=>key);
  sourceCoverage.push({index,source:keys.size,translated:Object.keys(translations).length,missing:absent,extra,untranslatedValues});
  if(absent.length||extra.length||untranslatedValues.length)fail(`translations-${index}.json`,'dictionary-coverage',`${absent.length} missing, ${extra.length} extra, ${untranslatedValues.length} Thai values`);
}

for(const route of englishRoutes()){
  const base=route.slice(3)||'/';
  const start=failures.length;
  let result;
  try{result=await render(route);}catch(error){fail(route,'render-exception',error.stack||error.message);continue;}
  if(![200,301].includes(result.status)){fail(route,'status',result.status);continue;}
  if(result.status===301){
    if(!result.redirect?.startsWith('/en/'))fail(route,'redirect-language',result.redirect);
    if(result.redirect===route)fail(route,'redirect-loop',route);
    else if((await render(result.redirect)).status!==200)fail(route,'redirect-target',result.redirect);
    routeResults.push({route,status:result.status,redirect:result.redirect,failures:failures.length-start});
    continue;
  }
  const {tags,texts}=inspect(result.html);
  if(tags.find(tag=>tag.name==='html')?.attrs.lang!=='en')fail(route,'html-language','Expected lang="en"');
  for(const text of texts)if(!(text.languageSwitch&&text.text==='ไทย'))untranslated(route,text.text,'text:'+text.tag);
  for(const tag of tags){
    for(const attr of ['alt','title','placeholder','aria-label','aria-description','aria-valuetext'])if(tag.attrs[attr])untranslated(route,tag.attrs[attr],`${tag.name}[${attr}]`);
    if(tag.name==='meta'&&['description','keywords','og:title','og:description','twitter:title','twitter:description'].includes(tag.attrs.name||tag.attrs.property))untranslated(route,tag.attrs.content||'','metadata');
    if(['a','area','form'].includes(tag.name)){
      const attribute=tag.name==='form'?'action':'href';
      const url=internalURL(tag.attrs[attribute],route);
      if(url){
        if(tag.attrs['data-language']==='th'){
          if(url.pathname!==base)fail(route,'thai-switch-target',url.pathname);
        }else if(supported.has(url.pathname))fail(route,'unlocalized-internal-link',url.pathname+url.search+url.hash);
        if(url.pathname.startsWith('/en/'))internalTargets.add(url.pathname);
      }
    }
    for(const attr of ['src','poster','href']){
      if(!['img','script','link','source','video','audio'].includes(tag.name)||!tag.attrs[attr])continue;
      const url=internalURL(tag.attrs[attr],route);
      if(url&&(url.pathname.startsWith('/assets/')||['/style.css','/app.js'].includes(url.pathname))){
        const routes=assets.get(url.pathname)||new Set();routes.add(route);assets.set(url.pathname,routes);
      }
    }
    if(tag.attrs.srcset)for(const src of tag.attrs.srcset.split(',').map(entry=>entry.trim().split(/\s+/)[0])){
      const url=internalURL(src,route);
      if(url?.pathname.startsWith('/assets/')){const routes=assets.get(url.pathname)||new Set();routes.add(route);assets.set(url.pathname,routes);}
    }
  }
  const links=tags.filter(tag=>tag.name==='link');
  const canonical=links.filter(tag=>(tag.attrs.rel||'').split(/\s+/).includes('canonical'));
  if(canonical.length!==1||canonical[0].attrs.href!==origin+route)fail(route,'canonical',canonical.map(tag=>tag.attrs.href));
  const thaiResult=await render(base);
  const thaiCanonical=inspect(thaiResult.html).tags.find(tag=>tag.name==='link'&&tag.attrs.rel==='canonical')?.attrs.href||origin+base;
  for(const [lang,expected] of [['en',origin+route],['th',thaiCanonical],['x-default',thaiCanonical]]){
    const matches=links.filter(tag=>tag.attrs.rel==='alternate'&&tag.attrs.hreflang===lang);
    if(matches.length!==1||matches[0].attrs.href!==expected)fail(route,'hreflang-'+lang,matches.map(tag=>tag.attrs.href));
  }
  const switches=tags.filter(tag=>tag.name==='a'&&tag.attrs['data-language']);
  if(!switches.some(tag=>tag.attrs['data-language']==='en'&&tag.attrs.href===route&&tag.attrs['aria-current']))fail(route,'english-switch','Missing current-language link');
  if(!switches.some(tag=>tag.attrs['data-language']==='th'&&tag.attrs.href===base))fail(route,'thai-switch','Missing Thai counterpart');
  const og=tags.filter(tag=>tag.name==='meta'&&tag.attrs.property==='og:url');
  if(og.length!==1||og[0].attrs.content!==origin+route)fail(route,'og-url',og.map(tag=>tag.attrs.content));
  routeResults.push({route,status:result.status,failures:failures.length-start});
}
for(const target of internalTargets){
  const result=await render(target);
  if(![200,301].includes(result.status))fail(target,'broken-internal-target',result.status);
}
for(const [asset,routes] of assets){
  try{await fs.access(path.join(root,'dist',decodeURIComponent(asset)));}
  catch{fail([...routes][0],'missing-asset',{asset,routes:[...routes]});}
}
if(missing.size)fail('*','untranslated-output',`${missing.size} unique Thai strings remain`);
const report={checkedAt:new Date().toISOString(),routes:routeResults.length,status200:routeResults.filter(row=>row.status===200).length,status301:routeResults.filter(row=>row.status===301).length,assets:assets.size,internalEnglishTargets:internalTargets.size,sourceCoverage,failures,untranslated:[...missing.values()],routeResults};
await fs.writeFile(path.join(root,'seo/localization-validation-v24.json'),JSON.stringify(report,null,2)+'\n','utf8');
console.log(JSON.stringify({routes:report.routes,status200:report.status200,status301:report.status301,assets:report.assets,internalEnglishTargets:report.internalEnglishTargets,coverage:sourceCoverage.map(({index,source,translated,missing,extra,untranslatedValues})=>({index,source,translated,missing:missing.length,extra:extra.length,thaiValues:untranslatedValues.length})),failures:failures.length,untranslated:missing.size,firstFailures:failures.slice(0,12),firstMissing:[...missing.values()].slice(0,12),report:'seo/localization-validation-v24.json'},null,2));
if(failures.length)process.exitCode=1;
