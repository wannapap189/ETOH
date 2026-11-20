import {businessArticlesV37,businessSourcesV37,businessTranslationsV37} from './articles-business-v37.mjs';
import {buyingArticlesV37,buyingSourcesV37,buyingTranslationsV37} from './articles-buying-v37.mjs';
import {qualityArticlesV37,qualitySourcesV37,qualityTranslationsV37} from './articles-quality-v37.mjs';

const all=[...businessArticlesV37,...buyingArticlesV37,...qualityArticlesV37];
const order=[
 '/ethanol-for-perfume/',
 '/ethanol-spec-coa-sds/',
 '/ethanol-total-delivered-cost/',
 '/ethanol-packaging-guide/',
 '/ethanol-storage-delivery/',
 '/switch-ethanol-supplier/'
];
export const newArticlesV37=order.map(path=>all.find(article=>article.path===path));
export const newSourcesV37={...businessSourcesV37,...buyingSourcesV37,...qualitySourcesV37};
export const newTranslationsV37={
 ...businessTranslationsV37,...buyingTranslationsV37,...qualityTranslationsV37,
 'ความรู้เพิ่มเติมสำหรับธุรกิจ':'More knowledge for your business',
 'เลือกสินค้าให้ตรงสูตร':'Match ethanol to your formulation',
 'วางแผนจัดซื้อให้คุ้มค่า':'Plan better purchasing',
 'จากการพัฒนาสูตรและอ่านเอกสาร':'From formulation and document review',
 'ถึงต้นทุน ขนาดบรรจุ และการส่งมอบ':'to cost, packaging and delivery',
 'ตรวจเนื้อหาและแหล่งอ้างอิง · 20 พฤศจิกายน 2569':'Content and sources reviewed · 20 November 2026'
};
for(const article of newArticlesV37){
 const title=newTranslationsV37[article.title];
 newTranslationsV37[article.title+' | ความรู้เอทานอล Etohcols']=title+' | Etohcols ethanol knowledge';
 newTranslationsV37['/ '+article.tag]='/ '+newTranslationsV37[article.tag];
}
for(const [label] of Object.values(newSourcesV37))newTranslationsV37[label+' ↗']=newTranslationsV37[label]+' ↗';

// Preserve the original article URLs and connect each question to its next useful step.
export const relatedArticlePathsV37={
 '/what-is-ethanol-alcohol/':['/denatured-vs-undenatured-alcohol/','/ethanol-spec-coa-sds/','/ethanol-concentration-guide/'],
 '/denatured-vs-undenatured-alcohol/':['/ethanol-for-perfume/','/ethanol-spec-coa-sds/','/ethanol-regulations-thailand/'],
 '/ethyl-alcohol-vs-methyl-alcohol/':['/what-is-ethanol-alcohol/','/ethanol-spec-coa-sds/','/ethanol-storage-delivery/'],
 '/ethanol-concentration-guide/':['/ethanol-for-perfume/','/ethanol-spec-coa-sds/','/switch-ethanol-supplier/'],
 '/where-to-buy-ethanol/':['/ethanol-total-delivered-cost/','/ethanol-packaging-guide/','/switch-ethanol-supplier/'],
 '/ethanol-regulations-thailand/':['/ethanol-storage-delivery/','/ethanol-spec-coa-sds/','/denatured-vs-undenatured-alcohol/'],
 '/ethanol-for-perfume/':['/denatured-vs-undenatured-alcohol/','/ethanol-concentration-guide/','/switch-ethanol-supplier/'],
 '/ethanol-spec-coa-sds/':['/switch-ethanol-supplier/','/ethanol-storage-delivery/','/ethanol-regulations-thailand/'],
 '/ethanol-total-delivered-cost/':['/ethanol-packaging-guide/','/switch-ethanol-supplier/','/where-to-buy-ethanol/'],
 '/ethanol-packaging-guide/':['/ethanol-total-delivered-cost/','/ethanol-storage-delivery/','/ethanol-spec-coa-sds/'],
 '/ethanol-storage-delivery/':['/ethanol-packaging-guide/','/ethanol-spec-coa-sds/','/ethanol-regulations-thailand/'],
 '/switch-ethanol-supplier/':['/ethanol-spec-coa-sds/','/ethanol-total-delivered-cost/','/ethanol-for-perfume/']
};
