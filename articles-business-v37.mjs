// Reviewed business guidance. Examples are hypothetical, not customer case studies.
// Foreign technical guidance is not a statement of Thai product approval.
export const businessTranslationsV37 = {};
const t = (th, en) => {
  if (businessTranslationsV37[th] && businessTranslationsV37[th] !== en) throw new Error(`Conflicting translation: ${th}`);
  businessTranslationsV37[th] = en;
  return th;
};
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P = (th, en) => `<p>${esc(t(th, en))}</p>`;
const UL = rows => `<ul>${rows.map(([th,en]) => `<li>${esc(t(th,en))}</li>`).join('')}</ul>`;
const A = (th, en, url) => {
  t(th,en);
  t(th+' ↗',en+' ↗');
  return `<a href="${esc(url)}">${esc(th)} ↗</a>`;
};
const links = (...rows) => `<p>${rows.map(row => A(...row)).join(' · ')}</p>`;
const table = (heads, rows) => `<div class="k16-table" role="region" aria-label="${esc(t('ตารางเปรียบเทียบ เลื่อนแนวนอนเพื่ออ่านทุกคอลัมน์','Comparison table; scroll horizontally to read all columns'))}" tabindex="0"><span class="k16-table-hint">${esc(t('เลื่อนตารางด้านข้างเพื่ออ่านครบทุกคอลัมน์ ↔','Scroll sideways to read all columns ↔'))}</span><table><thead><tr>${heads.map(([th,en]) => `<th scope="col">${esc(t(th,en))}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(([th,en],i) => i ? `<td>${esc(t(th,en))}</td>` : `<th scope="row">${esc(t(th,en))}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const source = (th,en,url) => { t(th,en); t(th+' ↗',en+' ↗'); return [th,url]; };
export const businessSourcesV37 = {
  v37PerfumeSDA: source('TTB สหรัฐอเมริกา · สูตรแอลกอฮอล์แปลงสภาพที่ระบุสำหรับน้ำหอม','U.S. TTB · Denatured alcohol formulas listed for perfumes','https://www.ttb.gov/regulated-commodities/industrial-alcohol/sda-tutorial/sdamenu8sub8/'),
  v37Stability: source('Cosmetics Europe · แนวทางทดสอบความคงตัวของเครื่องสำอาง','Cosmetics Europe · Guidelines on stability testing of cosmetic products','https://cosmeticseurope.eu/wp-content/uploads/2024/10/Guidelines_on_Stability_Testing_of_Cosmetics_CE-CTFA_-_2004.pdf'),
  v37CosmeticCriteria: source('อย. ไทย · หลักเกณฑ์การพิจารณาการจดแจ้งเครื่องสำอาง','Thai FDA · Cosmetic notification assessment criteria','https://cosmetic.fda.moph.go.th/permission-for-cosmetics/category/criteria-for-considering'),
  v37EthanolSafety: source('CDC / NIOSH · ข้อมูลอันตรายของเอทิลแอลกอฮอล์','CDC / NIOSH · Ethyl alcohol hazard information','https://www.cdc.gov/niosh/npg/npgd0262.html'),
  v37RawMaterialControls: source('FDA สหรัฐอเมริกา · การตรวจวัตถุดิบและการควบคุมคุณภาพเครื่องสำอาง','U.S. FDA · Cosmetic raw material checks and quality controls','https://www.fda.gov/cosmetics/cosmetics-guidance-documents/good-manufacturing-practice-gmp-guidelinesinspection-checklist-cosmetics'),
  v37SDS: source('OSHA · วิธีอ่านเอกสารข้อมูลความปลอดภัย SDS','OSHA · Understanding safety data sheets','https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf')
};
const ref = key => {
  const [th,url] = businessSourcesV37[key];
  return A(th,businessTranslationsV37[th],url);
};
const publication = {
  dateModified:'2026-11-20',
  dateLabelThai:t('ตรวจเนื้อหาและแหล่งอ้างอิง · 20 พฤศจิกายน 2569','Content and sources reviewed · 20 November 2026')
};

export const businessArticlesV37 = [
  {
    path:'/ethanol-for-perfume/', ...publication,
    tag:t('วัตถุดิบสำหรับธุรกิจน้ำหอม','Raw materials for fragrance businesses'),
    title:t('เลือกเอทานอลสำหรับผลิตน้ำหอมอย่างไร','How to choose ethanol for perfume production'),
    sub:t('พิจารณาสารแปลงสภาพ สเปก และผลทดสอบกับหัวน้ำหอมจริง','Assess denaturants, specifications and tests with the actual fragrance concentrate'),
    intro:t('น้ำหอมที่ได้กลิ่นและความใสตามต้องการ เริ่มจากวัตถุดิบที่เข้ากับสูตร ธุรกิจน้ำหอมจึงควรเลือกเอทานอลจากองค์ประกอบ เอกสาร และผลทดลองร่วมกัน ไม่ตัดสินจากความเข้มข้นหรือราคาต่อลิตรเพียงอย่างเดียว','Achieving the intended fragrance and clarity starts with a raw material that works in the formulation. Fragrance businesses should assess ethanol through its composition, documentation and trial results together, rather than concentration or price per litre alone.'),
    image:'app-perfume-shops-brands-v18',
    alt:t('ผู้ประกอบการน้ำหอมประเมินกลิ่นจากกระดาษทดสอบและบันทึกข้อมูลสูตร','A fragrance business owner assesses scent on a test strip and records formulation details'),
    sources:['v37PerfumeSDA','v37Stability','v37CosmeticCriteria','v37EthanolSafety'],
    sections:[
      ['role',t('เอทานอลแปลงสภาพใช้กับน้ำหอมได้หรือไม่','Can denatured ethanol be used in perfume?'),
        P('ใช้ได้ในบางสูตรที่ยอมรับชนิดและปริมาณสารแปลงสภาพนั้น แอลกอฮอล์แปลงสภาพไม่ได้มีสูตรเดียว ตัวอย่างเช่น TTB ของสหรัฐอเมริการะบุสูตร SDA หลายสูตรสำหรับน้ำหอม จึงต้องดูสูตรจริง ไม่สรุปว่าเอทานอลแปลงสภาพทุกตัวใช้แทนกันได้ รายการของ TTB เป็นข้อมูลในระบบสหรัฐฯ ไม่ใช่การอนุมัติสินค้า ETOH หรือใบอนุญาตในไทย','It can be used in formulations that accept the particular denaturants and their amounts. Denatured alcohol is not a single formula: the U.S. TTB, for example, lists several SDA formulas for perfumes. Evaluate the actual composition rather than treating all denatured ethanol as interchangeable. The TTB list applies to the U.S. system; it is not an approval of ETOH products or a Thai permit.')+
        P('ในน้ำหอมระบบแอลกอฮอล์ เอทานอลเป็นส่วนหนึ่งของระบบตัวทำละลายที่ต้องทำงานร่วมกับหัวน้ำหอม น้ำ และส่วนผสมอื่น การเลือกวัตถุดิบจึงต้องเริ่มจากข้อกำหนดของสูตรที่คุณผลิต เช่น ยอมรับสารแปลงสภาพชนิดใด มีเกณฑ์กลิ่นพื้นหลังอย่างไร และต้องการลักษณะผลิตภัณฑ์สำเร็จแบบใด','In an alcohol-based perfume, ethanol forms part of a solvent system that must work with the fragrance concentrate, water and other ingredients. Start with the requirements of your formulation: which denaturants are acceptable, what background-odor criteria apply, and what characteristics the finished product should have.')+
        `<p>${ref('v37PerfumeSDA')}</p>`+
        links(['เข้าใจชนิดแปลงสภาพและไม่แปลงสภาพ','Understand denatured and undenatured ethanol','/denatured-vs-undenatured-alcohol/'])],
      ['specification',t('ข้อมูลที่ต้องขอก่อนตัดสินใจจากคำว่า 96%','What to request before choosing on the basis of 96%'),
        P('ความเข้มข้น 96% บอกข้อมูลเพียงด้านหนึ่ง ให้ขอสเปกของรายการที่เสนอพร้อมหน่วยและอุณหภูมิอ้างอิง แล้วเทียบกับเกณฑ์รับเข้าของคุณ การซื้อวัตถุดิบที่ชื่อคล้ายกันแต่ข้อมูลไม่ครบ ทำให้แยกได้ยากว่าผลทดลองที่ต่างกันมาจากเอทานอล หัวน้ำหอม หรือส่วนผสมอื่น','A concentration of 96% describes only one aspect of the material. Request the specification for the offered item, including the measurement basis and reference temperature, and compare it with your incoming-material criteria. Similar names with incomplete information make it harder to determine whether a trial difference comes from the ethanol, fragrance concentrate or another ingredient.')+
        table([['ข้อมูล','Information'],['สิ่งที่ควรยืนยันกับผู้ขาย','What to confirm with the supplier']], [
          [['ชนิดและสูตรสารแปลงสภาพ','Ethanol type and denaturing formula'],['ชื่อสารแปลงสภาพ ปริมาณหรือช่วงที่ควบคุม และข้อมูลที่ผู้พัฒนาสูตรต้องใช้ประเมิน','Denaturant identities, controlled amounts or ranges, and the information needed by the formulator']],
          [['ความเข้มข้นและน้ำ','Concentration and water'],['หน่วย v/v หรือ w/w เกณฑ์รับเข้า วิธีทดสอบ และปริมาณน้ำเมื่อสูตรกำหนด','Whether the basis is v/v or w/w, acceptance limits, test method and water content when specified']],
          [['กลิ่นและสิ่งเจือปน','Odor and impurities'],['เกณฑ์ของรายการที่เสนอ และข้อกำหนดเฉพาะที่แบรนด์หรือโรงงานต้องการ','The offered specification and any additional requirements set by the brand or manufacturer']],
          [['เอกสารและล็อต','Documentation and lot'],['SPEC สำหรับเทียบเกณฑ์ COA ของล็อตที่เสนอ และ SDS ของสูตรจริง','SPEC for comparing limits, the COA for the offered lot, and the SDS for the actual formula']],
          [['การส่งมอบ','Delivery'],['ขนาดบรรจุ ซีล การระบุล็อต เงื่อนไขเก็บรักษา และปริมาณที่พร้อมเสนอ','Packaging size, seals, lot identification, storage conditions and the quantity available to quote']]
        ])+links(['อ่านเรื่องความเข้มข้นและหน่วยวัด','Read about concentrations and measurement bases','/ethanol-concentration-guide/'],['เอกสารแต่ละประเภทใช้ทำอะไร','Understand each document type','/quality/'])],
      ['trial',t('ออกแบบการทดลองให้ตอบโจทย์สูตรของคุณ','Design trials around your formulation'),
        P('ใช้สูตรอ้างอิงและเกณฑ์ผ่านที่กำหนดล่วงหน้า เปลี่ยนวัตถุดิบที่ต้องการประเมินอย่างมีบันทึก เพื่ออ่านผลเปรียบเทียบได้ชัดเจน แนวทาง Cosmetics Europe ให้ปรับการทดสอบความคงตัวตามผลิตภัณฑ์และบรรจุภัณฑ์จริง จึงไม่ควรใช้การดูว่าใสทันทีหลังผสมเป็นหลักฐานทั้งหมด หรือกำหนดระยะทดสอบเดียวให้ทุกสูตร','Use a reference formulation and predefined acceptance criteria, recording the material change so that comparisons remain interpretable. Cosmetics Europe recommends adapting stability studies to the product and its packaging. Immediate clarity after mixing is therefore not the complete evidence, and one test duration should not be applied to every formulation.')+
        UL([
          ['บันทึกรหัสวัตถุดิบ ล็อตหัวน้ำหอม สูตรเอทานอล และสัดส่วนส่วนผสมที่ใช้จริง','Record material codes, the fragrance-concentrate lot, ethanol formula and actual ingredient proportions.'],
          ['เปรียบเทียบกลิ่นตามวิธีประเมินของผู้พัฒนาสูตร พร้อมเกณฑ์กลิ่นพื้นหลังที่ยอมรับ','Compare scent using the formulator’s assessment method and an agreed background-odor criterion.'],
          ['ติดตามสี ความใส การแยกชั้นหรือตะกอน ตามเงื่อนไขเก็บและช่วงเวลาที่กำหนดสำหรับสูตร','Monitor color, clarity, separation or sediment under storage conditions and time points defined for the formulation.'],
          ['ประเมินร่วมกับขวด ฝา ซีล และหัวสเปรย์ที่จะใช้จริง พร้อมเกณฑ์การรั่วหรือการเปลี่ยนแปลงของภาชนะ','Evaluate the actual bottle, closure, seal and spray pump, with criteria for leakage or changes to the packaging.'],
          ['ให้ผู้รับผิดชอบสูตรและคุณภาพสรุปผลก่อนทดลองขยายกำลังผลิต และเก็บข้อมูลอ้างอิงของรุ่นที่อนุมัติ','Have formulation and quality personnel review the results before a scale-up trial, and retain records of the approved version.']
        ])+`<p>${ref('v37Stability')}</p>`],
      ['example',t('ตัวอย่างการตัดสินใจ: แบรนด์น้ำหอมที่มีหลายกลิ่น','Decision example: a brand with several fragrances'),
        P('สมมติแบรนด์หนึ่งมีน้ำหอมสามกลิ่นและต้องการผู้ขายวัตถุดิบอีกแห่ง ทีมงานควรส่งสเปกเดิมและข้อกำหนดสารแปลงสภาพก่อนรับตัวอย่าง จากนั้นจัดชุดเปรียบเทียบตามแผนของผู้พัฒนาสูตร โดยใช้หัวน้ำหอมและบรรจุภัณฑ์ที่ควบคุมไว้ พร้อมบันทึกว่าเปลี่ยนวัตถุดิบใดบ้าง','Suppose a brand has three fragrances and wants an additional raw-material supplier. The team should provide its existing specification and denaturant requirements before receiving a sample. It can then prepare comparisons under the formulator’s plan, using controlled fragrance concentrates and packaging while recording each material change.' )+
        P('หากมีเพียงบางกลิ่นผ่านเกณฑ์ ให้บันทึกขอบเขตการอนุมัติเป็นรายสูตร และหาสาเหตุของสูตรที่ยังไม่ผ่านก่อนใช้วัตถุดิบเดียวกันทั้งแบรนด์ การทดลองนี้ช่วยกำหนดสิ่งที่ต้องตรวจ ไม่ได้เป็นหลักฐานว่าสินค้ารายการใดจะทำให้น้ำหอมติดทนนานขึ้นหรือเหมาะกับทุกหัวน้ำหอม','If only some fragrances meet the criteria, document approval by formulation and investigate the others before using the material across the brand. This exercise defines what needs checking; it is not evidence that a particular material will improve fragrance longevity or suit every concentrate.')],
      ['before-order',t('เช็กลิสต์ก่อนสั่งวัตถุดิบเพื่อผลิตจำหน่าย','Checklist before ordering for commercial production'),
        P('แยกการเลือกวัตถุดิบออกจากการประเมินผลิตภัณฑ์สำเร็จ สำหรับธุรกิจในไทย ให้ตรวจข้อกำหนดส่วนผสม การจดแจ้ง ฉลาก และข้อมูลผลิตภัณฑ์กับหลักเกณฑ์ อย. ที่ใช้กับงานของคุณ เอทานอลเป็นสารไวไฟ จึงต้องจัดการตัวอย่างและสินค้าโดยอ้างอิง SDS ของสูตรจริงและวิธีทำงานของสถานประกอบการ','Keep raw-material selection separate from finished-product assessment. For a business in Thailand, check ingredient, notification, labeling and product-information requirements against the Thai FDA criteria applicable to your activity. Ethanol is flammable; handle samples and stock using the SDS for the actual formula and your workplace procedures.')+
        UL([
          ['ยืนยันสูตรสารแปลงสภาพและสเปกของรายการที่จะซื้อ ไม่อาศัยเพียงชื่อการค้าหรือเปอร์เซ็นต์','Confirm the denaturing formula and specification of the item to be purchased, not just its trade name or percentage.'],
          ['มีบันทึกผลทดลองและผู้รับผิดชอบอนุมัติสูตร พร้อมข้อจำกัดที่ต้องแจ้งฝ่ายจัดซื้อ','Keep trial results, formulation approval and any limitations that purchasing staff need to know.'],
          ['ยืนยันข้อมูลล็อต เอกสารส่งมอบ และการตรวจรับก่อนนำวัตถุดิบเข้าผลิต','Confirm lot information, delivery documents and incoming checks before releasing the material to production.'],
          ['ตรวจพื้นที่จัดเก็บ ภาชนะ และผู้ขนส่งให้เหมาะกับสินค้าตามข้อมูลความปลอดภัย','Check storage space, containers and transport suitability against the product’s safety information.']
        ])+`<p>${ref('v37CosmeticCriteria')} · ${ref('v37EthanolSafety')}</p>`],
      ['etoh',t('เริ่มประเมิน ETOH 96% กับสูตรน้ำหอมของคุณ','Start evaluating ETOH 96% for your fragrance formulation'),
        P('Etohcols เสนอ ETOH 96% เป็นรายการเริ่มต้นสำหรับธุรกิจน้ำหอมที่สูตรยอมรับสารแปลงสภาพ โดยต้องยืนยันชนิดและปริมาณสารแปลงสภาพ สเปก เอกสาร และผลทดสอบกับหัวน้ำหอมจริงก่อนเลือกใช้ แจ้งสูตรที่ใช้อยู่หรือเกณฑ์รับเข้าที่เปิดเผยได้ พร้อมปริมาณใช้และจังหวัดปลายทาง เพื่อให้ทีมประสานข้อมูลและข้อเสนอได้ตรงงาน','Etohcols offers ETOH 96% as a starting candidate for fragrance businesses whose formulations accept denaturants. Confirm the denaturant types and amounts, specifications, documentation and tests with the actual fragrance concentrate before selecting it. Share the formulation requirements or incoming criteria you can disclose, together with usage volume and destination province, so the team can coordinate relevant information and a quotation.')+
        P('ตัวอย่างทดสอบฟรี โดยพิจารณาค่าจัดส่งตามพื้นที่และแจ้งก่อนส่ง เอกสารฉบับจริงต้องขอจากทีมงาน แจ้งขนาดบรรจุและจำนวนที่ต้องการ เพื่อยืนยันรายละเอียดสินค้าและการจัดส่งเป็นรายคำขอ','Test samples are free, with shipping assessed by destination and confirmed before dispatch. Obtain actual documents from the team. Specify the packaging and quantity required so product and delivery details can be confirmed for each request.')+
        links(['ดูข้อมูล ETOH 96%','View ETOH 96% information','/product/etoh-96/'],['ขอตัวอย่างทดสอบสูตรน้ำหอม','Request a fragrance-formulation test sample','/quote/?intent=sample'],['แนวทางสำหรับร้านน้ำหอมและแบรนด์','Guidance for perfume shops and brands','/applications/perfume-shops-brands/'])]
    ]
  },
  {
    path:'/switch-ethanol-supplier/', ...publication,
    tag:t('จัดซื้อและประเมินวัตถุดิบ','Procurement and raw material assessment'),
    title:t('เปลี่ยนผู้ขายเอทานอล ต้องเทียบอะไรบ้าง','What to compare when changing ethanol suppliers'),
    sub:t('จากสเปกเดิมและตัวอย่างทดสอบ สู่ต้นทุนรวมและการตรวจรับ','From existing specifications and trial samples to total cost and incoming checks'),
    intro:t('การหาผู้ขายรายใหม่อาจเริ่มจากราคา รอบส่ง หรือความสะดวกในการติดต่อ แต่การตัดสินใจควรจบที่วัตถุดิบซึ่งผ่านเกณฑ์ของธุรกิจ พร้อมเงื่อนไขการส่งมอบที่เทียบกันได้ ใช้แนวทางนี้เตรียมข้อมูลก่อนขอราคาและก่อนเปลี่ยนการจัดซื้อจริง','A search for a new supplier may start with price, delivery schedules or easier communication. The decision should ultimately rest on material that meets your business requirements and delivery terms that can be compared fairly. Use this approach to prepare before requesting quotations or changing purchasing arrangements.'),
    image:'app-scientific-supply-distributors-v19',
    alt:t('เจ้าหน้าที่ตรวจรายการและเอกสารระหว่างเตรียมสินค้าสำหรับส่งมอบ','A staff member checks items and records while preparing a delivery'),
    sources:['v37RawMaterialControls','v37SDS'],
    sections:[
      ['baseline',t('เริ่มจากสิ่งที่ต้องคงเดิม และสิ่งที่อยากปรับ','Separate what must stay the same from what you want to improve'),
        P('ให้ฝ่ายจัดซื้อ ฝ่ายผลิต และฝ่ายคุณภาพสรุปโจทย์ร่วมกันก่อนขอราคา เช่น ต้องการลดต้นทุนถึงปลายทาง เพิ่มผู้ขายสำรอง หรือปรับรอบส่ง หากไม่มีเกณฑ์ตั้งต้น การเปรียบเทียบมักเหลือเพียงเปอร์เซ็นต์บนฉลาก ทั้งที่สารแปลงสภาพ เกรด และเงื่อนไขรับสินค้าอาจต่างกัน','Have purchasing, production and quality teams define the objective together before requesting prices: for example, assessing delivered cost, adding a backup supplier or changing delivery frequency. Without a baseline, comparison can collapse into the percentage on the label even when denaturants, grade and receiving terms differ.')+
        UL([
          ['สิ่งที่ต้องคงเดิม: ชนิดเอทานอล สูตรสารแปลงสภาพ และเกณฑ์สำคัญที่สูตรหรือกระบวนการกำหนด','What must stay the same: ethanol type, denaturing formula and critical criteria required by the formulation or process.'],
          ['สิ่งที่ต้องการปรับ: ขนาดต่อรอบ ความถี่ส่ง เอกสาร การตอบกลับ หรือเงื่อนไขชำระเงิน','What you want to improve: delivery size, frequency, documentation, responsiveness or payment terms.'],
          ['ข้อมูลอ้างอิง: SPEC ที่อนุมัติ COA ล็อตที่เคยรับเข้า และบันทึกปัญหาที่ต้องการแก้','Reference information: the approved SPEC, COAs for previously accepted lots and records of problems to address.'],
          ['ผู้อนุมัติ: ใครตรวจเอกสาร ใครประเมินตัวอย่าง และใครอนุมัติเปลี่ยนรายการจัดซื้อ','Approval responsibilities: who reviews documents, evaluates samples and approves the purchasing change.']
        ])],
      ['comparison',t('ทำตารางเทียบก่อนขอคำตอบว่าใช้แทนกันได้ไหม','Build a comparison before asking whether materials are interchangeable'),
        P('กรอกข้อมูลเดิมและข้อเสนอใหม่เคียงกัน โดยแยกค่าที่ระบุในสเปกออกจากผลวิเคราะห์ของล็อต หากยังไม่มีข้อมูล ให้บันทึกว่าอยู่ระหว่างยืนยัน แทนการถือว่าเท่ากัน SDS ใช้อ่านอันตราย องค์ประกอบที่เปิดเผย และวิธีจัดการ แต่ไม่ใช่เอกสารแทน SPEC หรือหลักฐานอนุมัติสูตรของลูกค้า','Place the current material and new offer side by side, distinguishing specification limits from lot-specific results. Mark missing information as awaiting confirmation rather than assuming equality. An SDS communicates hazards, disclosed composition and handling information; it does not replace the SPEC or approval of the customer’s formulation.')+
        table([['ประเด็นที่เทียบ','Comparison point'],['ข้อมูลที่ต้องทำให้ตรงกัน','Information to align']], [
          [['ชนิดและส่วนประกอบ','Type and composition'],['แปลงสภาพหรือไม่แปลงสภาพ ชนิดและปริมาณสารเติมที่กระบวนการต้องรู้','Denatured or undenatured, plus additive identities and amounts needed for process assessment']],
          [['ความเข้มข้นและหน่วยขาย','Concentration and sales unit'],['ฐาน v/v หรือ w/w อุณหภูมิอ้างอิง และการเสนอเป็นลิตรหรือกิโลกรัม','The v/v or w/w basis, reference temperature, and whether quantities are quoted in litres or kilograms']],
          [['เกณฑ์คุณภาพ','Quality criteria'],['เกรด น้ำ สิ่งเจือปน กลิ่นหรือสารตกค้างตามงาน พร้อมวิธีทดสอบที่เทียบกันได้','Grade, water, impurities, odor or residue as relevant, with comparable test methods']],
          [['เอกสารและการติดตามล็อต','Documents and lot traceability'],['รหัสสินค้า รุ่นสเปก COA ล็อตที่ส่ง และผู้ประสานกรณีพบข้อแตกต่าง','Product code, specification revision, delivered-lot COA and the contact for discrepancies']],
          [['บรรจุภัณฑ์และรับสินค้า','Packaging and receiving'],['ขนาด ภาชนะ ซีล น้ำหนักหรือปริมาณสุทธิ อุปกรณ์ลงของ และเงื่อนไขคืนภาชนะถ้ามี','Size, container, seal, net quantity, unloading equipment and any container-return conditions']],
          [['ข้อเสนอทางการค้า','Commercial offer'],['จำนวนต่อครั้ง ค่าส่ง ภาษี ระยะเวลาเสนอราคา เงื่อนไขชำระเงิน และช่วงส่งที่ยืนยัน','Order quantity, freight, taxes, quotation validity, payment terms and confirmed delivery window']]
        ])+`<p>${ref('v37SDS')}</p>`+
        links(['ทำความเข้าใจเอกสารคุณภาพ','Understand quality documents','/quality/'],['เลือกความเข้มข้นให้ตรงฐานการวัด','Compare concentrations on the correct measurement basis','/ethanol-concentration-guide/'])],
      ['sample',t('ทดสอบตามเกณฑ์รับเข้า ก่อนขยายปริมาณซื้อ','Test against acceptance criteria before increasing purchase volumes'),
        P('กำหนดเกณฑ์ผ่านและขนาดทดลองร่วมกับผู้รับผิดชอบกระบวนการก่อนรับตัวอย่าง แนวทางตรวจโรงงานเครื่องสำอางของ FDA สหรัฐฯ เน้นการระบุวัตถุดิบ ตรวจตามสเปก และควบคุมรายการที่ไม่ผ่าน หลักคิดนี้ช่วยจัดลำดับงานประเมินได้ แต่ไม่ได้เป็นการรับรองว่าเอทานอลใดใช้แทนกันได้หรือเป็นข้อกำหนดเดียวสำหรับทุกอุตสาหกรรม','Agree acceptance criteria and trial scale with the process owner before receiving a sample. The U.S. FDA’s cosmetic inspection guidance emphasizes material identification, specification checks and control of rejected materials. These principles help organize an evaluation; they do not establish ethanol interchangeability or a single requirement for every industry.')+
        UL([
          ['ตรวจรหัสและเอกสารตัวอย่างให้ตรงกับสูตรที่จะเสนอขาย และระบุสิ่งที่ยังต้องยืนยันในล็อตส่งจริง','Check that the sample identity and documentation match the offered formula, and record what still needs confirmation for the delivered lot.'],
          ['ทดสอบกับสูตรหรือชิ้นงานจริงตามวิธีที่ตกลง เช่น ความใส คราบหลังแห้ง การละลาย หรือความเข้ากันได้กับวัสดุ','Test the actual formulation or workpiece using agreed methods, such as clarity, dry residue, dissolution or material compatibility.'],
          ['บันทึกผลเทียบกับตัวอย่างอ้างอิง รวมทั้งข้อแตกต่างและเงื่อนไขที่ยังไม่ผ่าน','Record comparisons with the reference sample, including differences and criteria not yet met.'],
          ['เมื่อผ่านการประเมินแล้ว จึงกำหนดล็อตทดลองผลิตและการตรวจรับตามความเสี่ยงของกระบวนการ','Once evaluation criteria are met, define a production trial and incoming checks appropriate to the process risks.'],
          ['เก็บหลักฐานอนุมัติและติดตามล็อตแรก แทนการถือว่าตัวอย่างผ่านแล้วทุกล็อตจะเหมือนกัน','Retain approval evidence and monitor initial deliveries rather than assuming a passing sample guarantees identical results for every lot.']
        ])+`<p>${ref('v37RawMaterialControls')}</p>`+
        links(['ขอตัวอย่างสำหรับเปรียบเทียบ','Request a comparison sample','/quote/?intent=sample'])],
      ['cost',t('เทียบต้นทุนรวมถึงปลายทางบนเงื่อนไขเดียวกัน','Compare total delivered cost on the same terms'),
        P('จัดทำยอดเปรียบเทียบจากราคาสินค้า ค่าภาชนะ ค่าขนส่ง ภาษี และค่าบริการปลายทางตามที่ตกลง แล้วระบุหน่วยและปริมาณส่งมอบเดียวกันให้ชัด การเสนอเป็นลิตรกับกิโลกรัมต้องมีข้อมูลแปลงหน่วยที่ยืนยันสำหรับสินค้านั้น ไม่ใช้การคาดเดาอัตราเดียวกับทุกสูตร','Build the comparison from the material price, container charges, freight, taxes and agreed destination services, with a consistent unit and delivered quantity. Comparing litres with kilograms requires a confirmed conversion basis for the actual material rather than an assumed rate applied to every formulation.')+
        P('แยกยอดในใบเสนอราคาออกจากค่าใช้จ่ายภายในที่ธุรกิจประเมินเอง เช่น การทดสอบเปลี่ยนวัตถุดิบ พื้นที่เก็บ จำนวนครั้งรับของ และเงินที่จมในสต็อก อย่ารวมเงินมัดจำภาชนะที่คืนได้เป็นต้นทุนถาวรโดยไม่แยกเงื่อนไข ข้อเสนอที่ราคาสินค้าต่ำกว่าจึงยังไม่ใช่ข้อสรุปว่าต้นทุนรวมต่ำกว่า','Separate the quotation total from internal costs your business estimates, such as change-evaluation testing, storage space, receiving frequency and cash tied up in inventory. Distinguish refundable container deposits from permanent costs and record their conditions. A lower material price alone therefore does not establish a lower overall cost.')+
        links(['วางแผนการส่งมอบ','Plan delivery arrangements','/logistics/'],['ประเมินการเก็บและรอบเบิกสินค้า','Assess storage and scheduled releases','/stock-management/'])],
      ['example',t('ตัวอย่างการตัดสินใจ: ผู้ผลิตน้ำยาทำความสะอาดต่างจังหวัด','Decision example: a provincial cleaning-product manufacturer'),
        P('สมมติผู้ผลิตรายย่อยใช้เอทานอลแปลงสภาพในสูตรน้ำยาเช็ดกระจก และรับสินค้าเป็นถัง 200 ลิตร ผู้ขายรายใหม่เสนอราคาสินค้าต่ำกว่า แต่มีเงื่อนไขจำนวนต่อเที่ยวและค่าส่งต่างจากเดิม ทีมจัดซื้อควรขอข้อเสนอสำหรับปริมาณและจังหวัดเดียวกัน พร้อมส่งสูตรสารแปลงสภาพที่ยอมรับและเกณฑ์คราบหลังเช็ดให้ตรวจเทียบ','Suppose a small manufacturer uses denatured ethanol in a glass-cleaner formulation and receives it in 200 L drums. A new supplier quotes a lower material price but different quantities per delivery and freight charges. Purchasing should request an offer for the same quantity and province, while supplying the accepted denaturing formula and wipe-residue criteria for comparison.')+
        P('หากตัวอย่างผ่านแต่รอบส่งไม่ตรงกับการผลิต ธุรกิจอาจประเมินการใช้เป็นผู้ขายสำรองหรือปรับรอบซื้อก่อนเปลี่ยนทั้งหมด หากผลทดลองยังไม่ผ่าน ให้ตรวจเหตุและทดสอบใหม่ตามกระบวนการอนุมัติ ไม่ใช้ส่วนลดชดเชยข้อกำหนดคุณภาพที่จำเป็น ตัวอย่างนี้แสดงวิธีคิด ไม่ใช่ผลลัพธ์หรือยอดประหยัดของลูกค้าจริง','If the sample passes but delivery timing does not fit production, the business may evaluate a backup-supplier arrangement or adjust purchasing cycles before a full switch. If trial criteria are not met, investigate and retest under the approval process; a discount should not replace essential quality requirements. This is a decision example, not a reported customer outcome or saving.')],
      ['handover',t('ข้อมูลที่ต้องส่งต่อให้การซื้อครั้งถัดไปทำซ้ำได้','Make the next purchase repeatable'),
        P('การอนุมัติเปลี่ยนผู้ขายควรจบด้วยข้อมูลที่คนรับของและคนสั่งซื้อใช้ได้จริง ระบุขอบเขตว่าอนุมัติสินค้า สูตร และงานใด พร้อมวิธีจัดการหากเอกสาร ล็อต หรือผลตรวจรับไม่ตรง แผนสำรองควรมีผู้รับผิดชอบและช่องทางติดต่อ ไม่พึ่งเพียงคำรับรองว่าส่งได้ตลอด','Supplier approval should produce information that receiving and purchasing staff can actually use. State which material, formula and applications are approved, and how to handle document, lot or inspection discrepancies. Assign responsibility and contact channels for contingency plans rather than relying on a general promise of uninterrupted supply.')+
        UL([
          ['รหัสสินค้าและสเปกฉบับอนุมัติ พร้อมสูตรสารแปลงสภาพที่ยืนยัน','Approved product code and specification revision, with the confirmed denaturing formula.'],
          ['ปริมาณต่อรอบ ขนาดบรรจุ จังหวัด และช่วงเวลารับสินค้าที่ตกลง','Agreed quantity per delivery, packaging, destination province and receiving window.'],
          ['รายการเอกสารที่ต้องมาพร้อมสินค้า และขั้นตอนตรวจรับก่อนปล่อยใช้','Required delivery documents and incoming checks before release for use.'],
          ['ผู้แจ้งและผู้อนุมัติเมื่อสเปก สูตร บรรจุภัณฑ์ หรือเงื่อนไขส่งเปลี่ยน','Notification and approval responsibilities when specifications, formula, packaging or delivery terms change.'],
          ['วิธีแจ้งปัญหา แยกสินค้าที่รอตรวจ และทบทวนผลการส่งมอบช่วงเริ่มต้น','How to report problems, segregate material awaiting review and assess initial delivery performance.']
        ])+
        P('ส่งสเปกเดิม ปริมาณใช้ และปลายทางให้ทีม Etohcols เพื่อประสานรายการที่ควรประเมิน เอกสารจริงขอจากทีมงานเท่านั้น ตัวอย่างฟรี ค่าจัดส่งพิจารณาตามพื้นที่และแจ้งก่อนส่ง เว็บใช้การขอใบราคา โดยทีมงานยืนยันขนาดบรรจุ จำนวน และเงื่อนไขจัดส่งเป็นรายคำขอ','Send your existing specification, usage volume and destination to the Etohcols team to coordinate candidates for evaluation. Actual documents are available only from the team. Samples are free, with shipping assessed by destination and confirmed before dispatch. The website uses quotation requests, with packaging, quantity and delivery terms confirmed by the team for each enquiry.')+
        links(['ให้ทีมช่วยเทียบสเปกและข้อเสนอ','Ask the team to compare specifications and offers','/quote/?intent=advice'],['เตรียมข้อมูลก่อนซื้อเอทานอล','Prepare for ethanol procurement','/where-to-buy-ethanol/'],['ดูรายการสินค้าเพื่อขอราคา','View products for a quotation request','/shop/'])]
    ]
  }
];
