import fs from 'node:fs';
import {businessApplications,applicationGroups} from './application-catalog-v17.mjs';

const directory=new URL('./locales/en/',import.meta.url);
const supported=new Set(JSON.parse(fs.readFileSync(new URL('routes.json',directory),'utf8')));
const dictionary={};
for(const file of ['translations-1.json','translations-2.json','translations-3.json','query-translations.json','overrides.json','home-v25.json','oem-v26.json','stock-v27.json','packaging-v27.json','halal-v28.json','oem-scope-v29.json','etoh-range-v29.json','etoh-availability-articles-v29.json']){
 const path=new URL(file,directory);
 if(fs.existsSync(path))Object.assign(dictionary,JSON.parse(fs.readFileSync(path,'utf8')));
}
export const decode=s=>String(s).replace(/&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi,m=>({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' '}[m]??String.fromCodePoint(m[2].toLowerCase()==='x'?parseInt(m.slice(3,-1),16):parseInt(m.slice(2,-1),10))));
export const normalize=s=>decode(s).replace(/\s+/g,' ').trim();
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function translate(value){const key=normalize(value);return dictionary[key]??decode(value);}
export const englishPath=path=>path==='/'?'/en/':'/en'+path;
export const englishRoutes=()=>[...supported].map(englishPath);

function localizeLink(raw){
 const href=decode(raw);
 if(href.startsWith('#')||/^(?:mailto:|tel:|data:)/.test(href))return raw;
 let u;try{u=new URL(href,'https://etohcols.com');}catch{return raw;}
 if(!['etohcols.com','www.etohcols.com'].includes(u.hostname)||!supported.has(u.pathname))return raw;
 u.pathname=englishPath(u.pathname);
 for(const key of ['industry','note']){const value=u.searchParams.get(key);if(value)u.searchParams.set(key,translate(value));}
 return escape(u.pathname+u.search+u.hash);
}

function translateHTML(html){
 // Option values remain language-neutral backend inputs even when display labels change.
 html=html.replace(/<option\b([^>]*)>([^<]*)<\/option>/g,(whole,attrs,label)=>/\bvalue\s*=/.test(attrs)?whole:`<option${attrs} value="${escape(decode(label))}">${label}</option>`);
 return (html.match(/<!--[\s\S]*?-->|<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)\s*>|<[^>]+>|[^<]+/gi)||[]).map(token=>{
  if(/^<(?:script|style|!--)/i.test(token))return token;
  if(token.startsWith('<')){
   if(/^<br\b/i.test(token))return token+' ';
   return token.replace(/\b(alt|title|placeholder|aria-label|data-scene-title|content|href|action)\s*=\s*(["'])(.*?)\2/gi,(all,name,quote,value)=>{
    if(['href','action'].includes(name.toLowerCase()))return `${name}=${quote}${localizeLink(value)}${quote}`;
    if(!/[\u0E00-\u0E7F]/.test(value))return all;
    return `${name}=${quote}${escape(translate(value))}${quote}`;
   });
  }
  if(!/[\u0E00-\u0E7F]/.test(token))return token;
  return (token.match(/^\s*/)?.[0]||'')+escape(translate(token))+(token.match(/\s*$/)?.[0]||'');
 }).join('');
}

function switcher(path,english){
 const en=englishPath(path);
 return `<nav class="v24-language" aria-label="${english?'Language':'ภาษา'}"><a data-language="th" lang="th" hreflang="th" href="${escape(path)}" ${english?'':'aria-current="true"'}>ไทย</a><a data-language="en" lang="en" hreflang="en" href="${escape(en)}" ${english?'aria-current="true"':''}>English</a></nav>`;
}

export function localizeResult(result,path,english=false){
 if(result.redirect)return {...result,redirect:english?englishPath(result.redirect):result.redirect};
 if(!supported.has(path)||result.status!==200)return result;
 let html=result.html;
 if(english){
  html=translateHTML(html).replace('<html lang="th">','<html lang="en">');
  if(path==='/partner/')html=html.replace(/<h1>[\s\S]*?<\/h1>/,'<h1>Become an<br> <em>Etohcols distributor</em></h1>');
  html=html.replace(/<link\b[^>]*rel="canonical"[^>]*>/gi,'').replace(/<meta\b[^>]*property="og:url"[^>]*>/gi,'');
  const canonical='https://etohcols.com'+englishPath(path);
  html=html.replace('</head>',`<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="en_US"></head>`);
 }
 const controls=switcher(path,english);
 if(html.includes('<div class="v9-top"><div class="v9-wrap">'))html=html.replace(/(<div class="v9-top"><div class="v9-wrap">)([\s\S]*?)(<\/div><\/div>)/,`$1$2${controls}$3`);
 else html=html.replace(/(<body[^>]*>)/,`$1<div class="v24-legacy-language">${controls}</div>`);
 const values={};
 for(const item of businessApplications)values[item.title]=translate(item.title);
 for(const group of applicationGroups)values[group.name]=translate(group.name);
 const queryFile=new URL('query-translations.json',directory);
 if(fs.existsSync(queryFile))Object.assign(values,JSON.parse(fs.readFileSync(queryFile,'utf8')));
 const cfg=JSON.stringify({lang:english?'en':'th',basePath:path,values:english?values:{}}).replace(/</g,'\\u003c');
 const assets=`<link rel="stylesheet" href="/assets/localization-v24.css"><script id="v24-locale-data" type="application/json">${cfg}</script><script src="/assets/localization-v24.js" defer></script>`;
 // Locale helpers execute before existing deferred behavior scripts.
 html=html.replace('<script src=',assets+'<script src=');
 if(!html.includes('id="v24-locale-data"'))html=html.replace('</head>',assets+'</head>');
 const thCanonical=decode(result.html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]||'https://etohcols.com'+path);
 html=html.replace('</head>',`<link rel="alternate" hreflang="th" href="${escape(thCanonical)}"><link rel="alternate" hreflang="en" href="https://etohcols.com${englishPath(path)}"><link rel="alternate" hreflang="x-default" href="${escape(thCanonical)}"></head>`);
 return {...result,html};
}
