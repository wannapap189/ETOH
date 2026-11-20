import {articles,knowledgeSources} from './articles-v16.mjs';

const origin='https://etohcols.com';
const path='/what-is-ethanol-alcohol/';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Approved editorial metadata is separate from the immutable legacy inventory.
export const articleSeo={
 path,
 th:{
  title:'เอทิลแอลกอฮอล์ (เอทานอล) คืออะไร? ชื่อเรียกและการใช้งาน | Etohcols',
  description:'รู้จักเอทิลแอลกอฮอล์ เอทานอล Ethanol และ EtOH เปรียบเทียบชนิดแปลงสภาพ–ไม่แปลงสภาพ เกรด ความเข้มข้น และการเลือกใช้ในธุรกิจ พร้อมแนวทางขอสเปกและเอกสาร',
  headline:'เอทิลแอลกอฮอล์คืออะไร',
  home:'หน้าแรก',hub:'ความรู้เอทานอล',section:'พื้นฐานและชื่อเรียก'
 },
 en:{
  title:'What Is Ethanol (Ethyl Alcohol)? Names and Uses | Etohcols',
  description:'Understand ethanol, ethyl alcohol and EtOH, denatured and undenatured types, grades, concentrations and business uses, with guidance on specifications and documents.',
  headline:'What is ethyl alcohol?',
  home:'Home',hub:'Ethanol knowledge',section:'Basics and terminology'
 }
};

export function applyArticleSeo(result,basePath,english=false){
 if(basePath!==path||result.status!==200||!result.html)return result;
 const content=articleSeo[english?'en':'th'];
 const article=articles.find(a=>a.path===path);
 const pagePath=(english?'/en':'')+path;
 const canonical=origin+pagePath;
 const root=origin+(english?'/en/':'/');
 const image=origin+'/assets/business-v9/'+article.image+'.webp';
 // Construct after HTML localization: JSON-LD scripts are deliberately not auto-translated.
 // Author and first-publication date are omitted until verified; publisher is the site brand.
 const graph={
  '@context':'https://schema.org',
  '@graph':[
   {'@type':'Article','@id':canonical+'#article',url:canonical,
    mainEntityOfPage:{'@type':'WebPage','@id':canonical},
    headline:content.headline,description:content.description,
    inLanguage:english?'en':'th',articleSection:content.section,image:[image],
    ...(article.dateModified?{dateModified:article.dateModified}:{}),
    publisher:{'@type':'Organization',name:'Etohcols',url:origin+'/'},
    citation:article.sources.map(key=>knowledgeSources[key][1])},
   {'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[
    {'@type':'ListItem',position:1,name:content.home,item:root},
    {'@type':'ListItem',position:2,name:content.hub,item:origin+(english?'/en':'')+'/blog/'},
    {'@type':'ListItem',position:3,name:content.section,item:canonical}
   ]}
  ]
 };
 let html=result.html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i,'<title>'+escape(content.title)+'</title>');
 html=html.replace(/<meta\b[^>]*(?:name="description"|property="og:(?:title|description|image|type)")[^>]*>/gi,'');
 const tags=`<meta name="description" content="${escape(content.description)}"><meta property="og:title" content="${escape(content.title)}"><meta property="og:description" content="${escape(content.description)}"><meta property="og:image" content="${image}"><meta property="og:type" content="article"><script type="application/ld+json">${JSON.stringify(graph).replace(/</g,'\\u003c')}</script>`;
 return {...result,html:html.replace('</head>',tags+'</head>')};
}
