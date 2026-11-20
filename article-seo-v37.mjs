import {newArticlesV37,newSourcesV37} from './articles-v37.mjs';
import {translate} from './localization-v24.mjs';

const origin='https://etohcols.com';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function applyNewArticleSeo(result,basePath,english=false){
 const article=newArticlesV37.find(item=>item.path===basePath);
 if(!article||result.status!==200||!result.html)return result;
 const text=value=>english?translate(value):value;
 const canonical=origin+(english?'/en':'')+basePath;
 const title=text(article.title)+(english?' | Etohcols ethanol knowledge':' | ความรู้เอทานอล Etohcols');
 const description=text(article.intro);
 const image=origin+'/assets/business-v9/'+article.image+'.webp';
 // These are newly prepared preview articles. Do not invent a publication date or author.
 const graph={
  '@context':'https://schema.org',
  '@graph':[
   {'@type':'Article','@id':canonical+'#article',url:canonical,
    mainEntityOfPage:{'@type':'WebPage','@id':canonical},
    headline:text(article.title),description,inLanguage:english?'en':'th',
    articleSection:text(article.tag),image:[image],dateModified:article.dateModified,
    publisher:{'@type':'Organization',name:'Etohcols',url:origin+'/'},
    citation:article.sources.map(key=>newSourcesV37[key][1])},
   {'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[
    {'@type':'ListItem',position:1,name:english?'Home':'หน้าแรก',item:origin+(english?'/en/':'/')},
    {'@type':'ListItem',position:2,name:english?'Ethanol knowledge':'ความรู้เอทานอล',item:origin+(english?'/en':'')+'/blog/'},
    {'@type':'ListItem',position:3,name:text(article.title),item:canonical}
   ]}
  ]
 };
 let html=result.html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i,'<title>'+escape(title)+'</title>');
 html=html.replace(/<meta\b[^>]*(?:name="description"|property="og:(?:title|description|image|type)")[^>]*>/gi,'');
 const tags=`<meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:image" content="${image}"><meta property="og:type" content="article"><script type="application/ld+json">${JSON.stringify(graph).replace(/</g,'\\u003c')}</script>`;
 return {...result,html:html.replace('</head>',tags+'</head>')};
}
