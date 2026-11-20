// New knowledge content: document review and receiving/storage planning.
// These articles explain purchasing decisions; product SDSs and qualified site reviews govern execution.
export const qualityTranslationsV37 = {};
const t = (th, en) => { qualityTranslationsV37[th] = en; return th; };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P = (th, en) => `<p>${esc(t(th, en))}</p>`;
const UL = rows => `<ul>${rows.map(([th,en]) => `<li>${esc(t(th,en))}</li>`).join('')}</ul>`;
const A = (th, en, url) => `<a href="${esc(url)}">${esc(t(`${th} ↗`, `${en} ↗`))}</a>`;
const links = rows => `<p>${rows.map(row => A(...row)).join(' · ')}</p>`;
const note = (th,en) => `<aside class="k16-note">${esc(t(th,en))}</aside>`;
const table = (heads,rows) => `<div class="k16-table" role="region" aria-label="${esc(t('ตารางเปรียบเทียบ เลื่อนแนวนอนเพื่ออ่านทุกคอลัมน์','Comparison table. Scroll horizontally to read all columns.'))}" tabindex="0"><span class="k16-table-hint">${esc(t('เลื่อนตารางด้านข้างเพื่ออ่านครบทุกคอลัมน์ ↔','Scroll sideways to read all columns ↔'))}</span><table><thead><tr>${heads.map(x=>`<th scope="col">${esc(t(...x))}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i?`<td>${esc(t(...x))}</td>`:`<th scope="row">${esc(t(...x))}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const reviewed = t('ตรวจเนื้อหาและแหล่งอ้างอิง · 20 พฤศจิกายน 2569','Content and references reviewed · 20 November 2026');

export const qualitySourcesV37 = {
 q37sds: [t('OSHA สหรัฐอเมริกา · หัวข้อและข้อมูลใน SDS','US OSHA · SDS sections and information'),'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200AppD'],
 q37hazcom: [t('OSHA สหรัฐอเมริกา · การสื่อสารอันตรายและรูปแบบ SDS','US OSHA · Hazard communication and SDS format'),'https://www.osha.gov/hazcom'],
 q37ccohs: [t('CCOHS แคนาดา · คำอธิบายข้อมูลใน SDS','CCOHS Canada · Understanding SDS information'),'https://www.ccohs.ca/oshanswers/chemicals/whmis_ghs/sds.html'],
 q37coa: [t('FDA สหรัฐอเมริกา · ตัวอย่างหลักการ COA ในแนวทาง Q7A หัวข้อ 11.4','US FDA · COA principles in Q7A guidance, section 11.4'),'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/q7a-good-manufacturing-practice-guidance-active-pharmaceutical-ingredients'],
 q37iso: [t('ISO · ความหมายของการรับรองและการตรวจสอบผู้รับรอง','ISO · Certification and verifying certification bodies'),'https://www.iso.org/certification.html'],
 q37iso9001: [t('ISO · ระบบบริหารคุณภาพ ISO 9001','ISO · The ISO 9001 quality management system'),'https://www.iso.org/insights/iso-9001-explained'],
 q37niosh: [t('CDC / NIOSH · คุณสมบัติและอันตรายของเอทิลแอลกอฮอล์','CDC / NIOSH · Ethyl alcohol properties and hazards'),'https://www.cdc.gov/niosh/npg/npgd0262.html'],
 q37fire: [t('HSE สหราชอาณาจักร · การป้องกันอัคคีภัยในกระบวนการทำงาน','UK HSE · Work process fire safety'),'https://www.hse.gov.uk/fireandexplosion/workplace.htm'],
 q37storage: [t('HSE สหราชอาณาจักร · แนวทางเก็บของเหลวไวไฟในภาชนะ','UK HSE · Storage of flammable liquids in containers'),'https://www.hse.gov.uk/pUbns/books/hsg51.htm'],
};

export const qualityArticlesV37 = [
 {
  path:'/ethanol-spec-coa-sds/',
  tag:t('อ่านเอกสารก่อนจัดซื้อ','Review documents before purchasing'),
  title:t('SPEC, COA และ SDS ต่างกันอย่างไร','SPEC, COA and SDS: what is the difference?'),
  sub:t('ตรวจเอกสารเอทานอลให้ตรงสินค้า ตั้งแต่เทียบสเปกจนถึงรับเข้าคลัง','Match ethanol documents to the product, from specification review to receipt'),
  intro:t('ใบเสนอราคาที่ระบุเพียงเอทานอล 96% ยังไม่เพียงพอสำหรับอนุมัติวัตถุดิบ ใช้ SPEC กำหนดสิ่งที่ต้องการ ใช้ COA ตรวจข้อมูลของล็อต และใช้ SDS วางแผนความปลอดภัย แล้วเชื่อมเอกสารทั้งสามกับสินค้าที่ได้รับจริง','A quotation that says only ethanol 96% is not enough to approve a raw material. Use the SPEC to define requirements, the COA to review a batch and the SDS to plan safe handling. Then connect all three to the material actually delivered.'),
  dateModified:'2026-11-20',dateLabelThai:reviewed,
  image:'app-laboratory-research-services-v18',
  alt:t('นักวิเคราะห์ตรวจตัวอย่างในห้องปฏิบัติการคุณภาพ','An analyst checking samples in a quality laboratory'),
  sources:['q37sds','q37hazcom','q37coa','q37iso','q37iso9001'],
  sections:[
   ['three-documents',t('เอกสารสามชนิด ตอบคำถามคนละเรื่อง','Three documents answer different questions'),
    P('การซื้อซ้ำให้ได้ผลสม่ำเสมอ เริ่มจากข้อตกลงที่ตรวจสอบได้ ฝ่ายจัดซื้อ ฝ่ายพัฒนาสูตร ฝ่ายคุณภาพ และผู้รับสินค้า ควรใช้ชื่อสินค้าและรหัสสูตรเดียวกัน เพื่อไม่ให้เอกสารที่ถูกต้องไปประกอบกับสินค้าคนละรายการ','Repeatable purchasing starts with requirements that can be checked. Purchasing, formulation, quality and receiving teams should use the same product name and formulation code, so a valid document is not accidentally matched to a different product.')+
    table([
      ['เอกสาร','Document'],['ใช้ตอบคำถาม','Question it answers'],['ข้อจำกัดที่ควรเข้าใจ','Important limit']
    ],[
      [['SPEC / Specification','SPEC / Specification'],['สินค้ารายการนี้ต้องมีคุณสมบัติและเกณฑ์ยอมรับอะไร','Which properties and acceptance criteria must this product meet?'],['เป็นข้อกำหนด ไม่ใช่ผลวิเคราะห์ของทุกล็อต','It defines requirements; it is not a test result for every batch.']],
      [['COA / Certificate of Analysis','COA / Certificate of Analysis'],['ล็อตที่ระบุมีผลทดสอบอะไร เทียบกับเกณฑ์ใด','What results are reported for the identified batch, against which criteria?'],['ตรวจเฉพาะรายการที่รายงาน ไม่ได้ยืนยันทุกคุณสมบัติที่สูตรของคุณต้องการ','It covers the reported tests, not every property your formulation may need.']],
      [['SDS / Safety Data Sheet','SDS / Safety Data Sheet'],['สินค้ามีอันตรายอย่างไร และต้องเตรียมการจัดการอย่างไร','What hazards does the product present, and how should handling be planned?'],['ไม่ใช่ใบรับรองความบริสุทธิ์หรือใบอนุมัติการใช้ในผลิตภัณฑ์สำเร็จรูป','It is neither a purity certificate nor approval for a finished-product application.']]
    ])+
    P('SDS มักจัดข้อมูลเป็น 16 หัวข้อ เพื่อให้ค้นหาข้อมูลอันตรายและการจัดการได้เป็นระบบ ส่วนคำว่า MSDS เป็นชื่อที่ยังพบในเอกสารเก่า เมื่อขอเอกสารควรระบุว่าต้องการ SDS ฉบับปัจจุบันของสินค้าที่เสนอ','SDSs commonly organize hazard and handling information into 16 sections. MSDS is a name still found in older documents. When requesting information, ask for the current SDS for the product being offered.')],

   ['match-product-and-lot',t('เริ่มจากจับคู่ชื่อสินค้า สูตร และล็อต','Start by matching the product, formulation and batch'),
    P('ความเข้มข้นเท่ากันไม่ได้หมายถึงเป็นสินค้าเดียวกัน ETOH เป็นกลุ่มแปลงสภาพ จึงต้องตรวจสูตรและข้อมูลสารแปลงสภาพของรายการที่เสนอด้วย ส่วน PHARMOL เป็นกลุ่มไม่แปลงสภาพและเป็นอีกทางเลือกสำหรับงานที่กำหนดชนิดนี้','Equal concentration does not make two products identical. ETOH is the denatured range, so review the offered formulation and denaturant information. PHARMOL is the undenatured range and a separate option for applications that require that type.')+
    UL([
      ['เทียบชื่อ รหัสสินค้า เกรด และความเข้มข้นระหว่างใบเสนอราคา SPEC และ SDS','Match the product name, code, grade and concentration across the quotation, SPEC and SDS.'],
      ['เมื่อระบุล็อตที่จะส่งแล้ว ให้จับคู่เลขล็อตบน COA กับฉลากสินค้าและเอกสารส่งมอบ','Once the dispatch batch is identified, match its COA batch number to the product label and delivery records.'],
      ['ถ้าส่งหลายล็อต ให้แยกจำนวนและเอกสารของแต่ละล็อต เพื่อค้นกลับเมื่อเกิดข้อสงสัย','For multiple batches, keep quantities and documents separate so each can be traced later.'],
      ['แยก COA ตัวอย่างที่ใช้ประเมินเบื้องต้น ออกจาก COA ของล็อตที่ส่งจริง','Distinguish a sample COA used for initial evaluation from the COA for the batch actually delivered.'],
      ['เก็บเลขฉบับหรือวันที่เอกสาร พร้อมผู้ตรวจและวันที่อนุมัติในระบบของธุรกิจ','Record the document version or date, reviewer and approval date in your business records.']
    ])+
    P('หากมีการเปลี่ยนสูตร เกรด หรือแหล่งผลิตระหว่างการเสนอราคา ควรให้ทีมคุณภาพทบทวนเอกสารและการอนุมัติวัตถุดิบอีกครั้ง ก่อนถือว่าใช้แทนรายการเดิมได้','If the formulation, grade or manufacturing source changes during quotation, have the quality team review the documents and material approval before treating the offer as a replacement for the original item.')],

   ['read-test-results',t('อ่านตัวเลขให้ครบทั้งหน่วย วิธีทดสอบ และเกณฑ์','Read the unit, test method and acceptance criterion together'),
    P('ตัวเลขใน COA จะใช้ตัดสินใจได้เมื่อรู้ว่าทดสอบอะไร วัดอย่างไร และใช้เกณฑ์ใด ตัวอย่างหลักการในแนวทาง FDA Q7A สำหรับวัตถุดิบยาระบุการเชื่อมชื่อวัตถุดิบ ล็อต เกณฑ์ และผลวิเคราะห์เข้าด้วยกัน บทความนี้นำหลักการตรวจเอกสารมาอธิบาย ไม่ได้หมายความว่าเอทานอลทุกเกรดเป็นวัตถุดิบยาหรืออยู่ใต้ข้อกำหนดสหรัฐอเมริกานี้','A COA result is useful when the test, method and acceptance criterion are understood. As one example, FDA Q7A guidance for pharmaceutical ingredients links material identity and batch information to criteria and analytical results. This is a document-review principle, not a claim that all ethanol grades are pharmaceutical ingredients or subject to that US guidance.')+
    table([
      ['สิ่งที่อ่าน','What to read'],['คำถามก่อนเปรียบเทียบ','Question before comparing']
    ],[
      [['ความเข้มข้นและหน่วย','Concentration and unit'],['เป็น % v/v หรือ % w/w มีอุณหภูมิอ้างอิงหรือเงื่อนไขการวัดหรือไม่ ไม่เปรียบเทียบเปอร์เซ็นต์ต่างฐานโดยตรง','Is it % v/v or % w/w? Is a reference temperature or measurement condition specified? Do not directly compare percentages on different bases.']],
      [['รายการทดสอบ','Test parameter'],['มีผลที่เกี่ยวกับสูตรของคุณครบหรือไม่ เช่น น้ำหรือสิ่งเจือปนที่ฝ่ายคุณภาพกำหนด','Are the parameters your formulation needs reported, such as water or impurities specified by your quality team?']],
      [['วิธีทดสอบ','Test method'],['ใช้วิธีเดียวกับเกณฑ์รับเข้าหรือเทียบกันได้หรือไม่ ให้ห้องปฏิบัติการประเมินหากต่างวิธี','Is the method the same as, or comparable to, your incoming specification? Ask the laboratory to assess differing methods.']],
      [['เกณฑ์และผล','Criterion and result'],['ค่าเป็นค่าต่ำสุด ค่าสูงสุด หรือช่วงยอมรับ และผลของล็อตอยู่ในเกณฑ์นั้นหรือไม่','Is the criterion a minimum, maximum or range, and does this batch meet it?']],
      [['คำว่า Pass หรือ Complies','Pass or Complies'],['ถ้าการอนุมัติของคุณต้องใช้ค่าตัวเลข ให้สอบถามว่ามีผลเชิงปริมาณสำหรับรายการนั้นหรือไม่','If your approval needs a numerical value, ask whether a quantitative result is available for that parameter.']]
    ])+
    links([['อ่านเรื่องความเข้มข้นและการเลือกสินค้า','Read about concentrations and product selection','/ethanol-concentration-guide/']])],

   ['receiving-example',t('ตัวอย่าง: อนุมัติเอทานอล 96% ก่อนรับถัง 200 ลิตร','Example: approving ethanol 96% before receiving a 200 L drum'),
    P('สมมุติโรงงานต้องการเปลี่ยนผู้จำหน่ายเอทานอลสำหรับสูตรที่ใช้อยู่ การเห็นคำว่า 96% บนใบเสนอราคาเหมือนเดิมยังไม่ทำให้อนุมัติแทนได้ ขั้นแรกให้ส่งสเปกที่ยอมรับและข้อกำหนดของสูตร โดยปกปิดข้อมูลที่ไม่เกี่ยวกับการประเมินได้','Suppose a manufacturer wants to change the ethanol supplier for an existing formulation. Seeing the same 96% on a quotation does not by itself approve a substitute. Start by sharing the accepted specification and formulation requirements; unrelated confidential details can be omitted.')+
    UL([
      ['ก่อนทดสอบ: เทียบชนิดเอทานอล สูตรแปลงสภาพ หน่วยความเข้มข้น และรายการทดสอบที่จำเป็น','Before trial: compare ethanol type, denaturing formulation, concentration basis and required tests.'],
      ['ก่อนสั่ง: ให้ฝ่ายที่รับผิดชอบอนุมัติผลทดลองและเกณฑ์รับเข้า พร้อมตกลงชุดเอกสารที่จะได้รับ','Before ordering: obtain the responsible team’s approval of trial results and incoming criteria, and agree the document set to be supplied.'],
      ['เมื่อรับ: ตรวจชื่อรายการ จำนวน สภาพบรรจุภัณฑ์ และล็อต ให้ตรงกับเอกสารส่งมอบและ COA','At receipt: match the item, quantity, package condition and batch to delivery records and the COA.'],
      ['ก่อนปล่อยใช้: ทำตามขั้นตอนตรวจรับของธุรกิจ หากเอกสารไม่ตรงให้พักการอนุมัติและติดต่อทีมงาน','Before release: follow your incoming-control procedure. If documents do not match, hold approval and contact the team.']
    ])+
    P('ตัวอย่างนี้เป็นกระบวนการพิจารณาจัดซื้อ ไม่ได้กำหนดเกณฑ์วิเคราะห์แทนฝ่ายคุณภาพของคุณ และไม่ได้ยืนยันว่าผลิตภัณฑ์ที่ใช้เปอร์เซ็นต์เดียวกันทดแทนกันได้ทุกสูตร','This example is a purchasing review process. It does not set analytical criteria for your quality team or confirm that products with the same percentage are interchangeable in every formulation.')+
    links([['วางแผนเปลี่ยนผู้จำหน่าย','Plan a supplier change','/switch-ethanol-supplier/']])],

   ['certification-scope',t('ใบรับรองมาตรฐาน ต้องดูขอบเขตที่ครอบคลุม','Read the scope of every certification'),
    P('ใบรับรองระบบ เช่น ISO 9001 ใช้ประกอบการพิจารณาระบบบริหารคุณภาพภายในขอบเขตที่ระบุ ไม่ได้แทน COA ของล็อต และไม่ใช่การรับรองว่าสินค้าทุกรายการเหมาะกับทุกอุตสาหกรรม ISO เป็นผู้จัดทำมาตรฐาน ส่วนการรับรองดำเนินการโดยหน่วยรับรองภายนอก','A system certificate such as ISO 9001 supports a review of the quality management system within its stated scope. It does not replace a batch COA or certify every product for every industry. ISO develops standards; external certification bodies perform certification.')+
    P('หากลูกค้าปลายทางต้องการ HALAL ให้แจ้งข้อกำหนดตั้งแต่ขอราคา Etohcols มีเอกสารฮาลาลให้ทีมงานตรวจและประสานตามรายการสินค้า ต้องยืนยันชื่อผลิตภัณฑ์ แหล่งผลิต ขอบเขต และอายุเอกสารก่อนใช้ประกอบการอนุมัติ ไม่ใช้ตราบนหน้าเว็บแทนหลักฐานของรายการที่ซื้อ','If the end customer requires HALAL documentation, state that requirement when requesting a quotation. Etohcols can have the team check and coordinate available halal documents for the relevant item. Confirm the product, manufacturing source, scope and validity before approval; a website mark is not evidence for the purchased item.')+
    UL([
      ['ตรวจหน่วยงานที่ออกเอกสาร เลขที่เอกสาร และช่วงวันที่มีผล','Check the issuer, document number and validity period.'],
      ['อ่านสถานที่ กิจกรรม และรายชื่อผลิตภัณฑ์ที่อยู่ในขอบเขตจริง','Read the actual sites, activities and products covered.'],
      ['ตรวจว่าข้อกำหนดของลูกค้าปลายทางต้องการเอกสารฉบับใดและจากหน่วยงานใด','Confirm which document and issuing body the end customer requires.']
    ])+
    links([['ดูประเภทมาตรฐานและเอกสารที่ขอได้','Explore available document and certification types','/quality/']])],

   ['request-documents',t('ขอเอกสารให้ตรงงาน ผ่านทีมงาน Etohcols','Request the right documents through the Etohcols team'),
    P('เอกสารฉบับจริงต้องขอจากทีมงานเท่านั้น แจ้งชื่อหรือรหัสสินค้า ความเข้มข้น การใช้งาน และเอกสารที่ต้องใช้ หากเป็นงานรับเข้าให้ระบุเลขล็อตหรือเลขอ้างอิงการสั่งซื้อด้วย ทีมงานจะตรวจรายการที่เกี่ยวข้องก่อนจัดส่ง','Actual documents must be requested from the team. Provide the product name or code, concentration, application and documents required. For incoming inspection, also supply the batch or order reference. The team will check the relevant items before sending them.')+
    P('เตรียมรายการสั้น ๆ ว่าต้องใช้เอกสารเพื่อเทียบวัตถุดิบใหม่ อนุมัติผู้ขาย ตรวจรับล็อต หรือส่งต่อให้ลูกค้า พร้อมระบุรูปแบบหรือภาษาที่องค์กรต้องการ จะช่วยลดการขอข้อมูลซ้ำและทำให้ผู้พิจารณาได้รับชุดข้อมูลเดียวกัน','Briefly state whether the documents are for a new-material comparison, supplier approval, batch receipt or an end customer. Include your organization’s format or language requirements. This reduces repeat requests and helps reviewers work from the same information.')+
    P('แหล่งอ้างอิงต่างประเทศในบทความใช้ประกอบคำอธิบายเอกสารและระบบคุณภาพ การใช้งานในประเทศไทยต้องตรวจข้อกำหนดที่เกี่ยวข้องกับสินค้าและกิจการของคุณโดยเฉพาะ','The international references support explanations of documents and quality systems. For use in Thailand, check the requirements that apply to your particular product and operation.')+
    links([
      ['ขอ SPEC, COA, SDS หรือเอกสารรับรองจากทีมงาน','Request SPEC, COA, SDS or certification documents','/quote/?intent=document'],
      ['อ่านแนวทางจัดเก็บและเตรียมรับเอทานอล','Read storage and delivery planning guidance','/ethanol-storage-delivery/']
    ])]
  ]
 },
 {
  path:'/ethanol-storage-delivery/',
  tag:t('เตรียมรับสินค้าและวางแผนสต็อก','Plan receiving and inventory'),
  title:t('การจัดเก็บและขนส่งเอทานอล ต้องเตรียมอะไรบ้าง','Ethanol storage and delivery: what should you prepare?'),
  sub:t('เลือกขนาดบรรจุและรอบส่ง ให้ปลายทางรับได้และธุรกิจใช้งานต่อเนื่อง','Choose packaging and delivery cycles your site can receive and your business can use'),
  intro:t('การสั่งเอทานอลต้องคิดถึงพื้นที่เก็บ วิธีรับสินค้า และอัตราการใช้ควบคู่กับราคา ไม่ว่าจะเป็นถัง 200 ลิตร IBC 1,000 ลิตร หรือตู้ Tank 20,000 ลิตร ควรยืนยันความพร้อมของปลายทางและเงื่อนไขขนส่งก่อนนัดส่ง','An ethanol order needs storage, receiving and usage planning alongside its price. Whether ordering 200 L drums, 1,000 L IBCs or a 20,000 L tank container, confirm destination readiness and transport arrangements before scheduling dispatch.'),
  dateModified:'2026-11-20',dateLabelThai:reviewed,
  image:'logistics-loading-v8',
  alt:t('การเตรียมสินค้าและขนขึ้นรถตู้ทึบภายในพื้นที่คลังสินค้า','Preparing packaged goods and loading a closed-box truck in a warehouse area'),
  sources:['q37sds','q37ccohs','q37niosh','q37fire','q37storage'],
  sections:[
   ['delivery-brief',t('ให้ข้อมูลปลายทางก่อนเลือกรถและนัดส่ง','Describe the destination before choosing a vehicle'),
    P('รถที่เข้าถึงหน้างานได้และวิธีนำสินค้าลง มีผลต่อทั้งค่าใช้จ่ายและความพร้อมใช้งาน แจ้งจุดรับจริงตั้งแต่ขอราคา ไม่ใช้เพียงชื่อจังหวัด เพราะร้านในซอย โรงงานที่มีเวลารับเฉพาะ และคลังที่มีท่าขนถ่าย ต้องวางแผนต่างกัน','Site access and unloading arrangements affect both cost and readiness for use. Describe the actual receiving point when requesting a quotation, not only the province. A shop in a narrow lane, a factory with restricted receiving hours and a warehouse with a loading dock need different plans.')+
    UL([
      ['สินค้า: ชื่อสูตร ความเข้มข้น ขนาดบรรจุ จำนวน และกำหนดที่ต้องการใช้','Product: formulation, concentration, package size, quantity and required use date.'],
      ['ทางเข้า: พิกัด ข้อจำกัดความสูงหรือความกว้าง ทางเข้าและจุดจอดที่อนุญาต','Access: location, height or width restrictions, entrance and permitted stopping area.'],
      ['การรับ: วันและช่วงเวลา ผู้ประสานงาน อุปกรณ์ยก และผู้รับผิดชอบการขนลง','Receiving: dates and hours, contact person, lifting equipment and unloading responsibility.'],
      ['พื้นที่เก็บ: ความจุที่อนุมัติให้เก็บได้และพื้นที่ที่พร้อมรับสินค้าในวันส่ง','Storage: approved storage capacity and space actually available on delivery day.'],
      ['เอกสาร: ข้อมูลที่ผู้รับสินค้า ฝ่ายความปลอดภัย และผู้ขนส่งต้องตรวจล่วงหน้า','Documents: information the receiving team, safety team and carrier need to review in advance.']
    ])+
    P('ถ้าเงื่อนไขเปลี่ยน เช่น เข้าไม่ได้ตามเวลาหรืออุปกรณ์ยกไม่พร้อม ควรแจ้งก่อนจัดรถ เพื่อประเมินรอบส่งและค่าใช้จ่ายใหม่อย่างชัดเจน','If conditions change, such as unavailable access hours or lifting equipment, tell the team before a vehicle is arranged so the schedule and costs can be reassessed clearly.')],

   ['sds-before-receipt',t('อ่าน SDS สี่ส่วนสำคัญร่วมกับฝ่ายความปลอดภัย','Review four SDS sections with the safety team'),
    P('ให้ใช้ SDS ของสูตรและความเข้มข้นที่จะรับจริง เอทานอลแปลงสภาพอาจมีส่วนประกอบที่ทำให้การประเมินต่างจากเอทานอลอีกสูตรหนึ่ง และเอกสารข้อมูลทั่วไปของสารไม่แทน SDS ของสินค้าผสม','Use the SDS for the actual formulation and concentration being delivered. Denatured ethanol can contain ingredients that change the assessment. A general chemical reference does not replace the SDS for a formulated product.')+
    table([
      ['หัวข้อใน SDS','SDS section'],['ประเด็นที่นำมาวางแผน','Planning use']
    ],[
      [['7 · การขนถ่ายและจัดเก็บ','7 · Handling and storage'],['เงื่อนไขจัดเก็บและวิธีจัดการที่ผู้จัดทำเอกสารระบุ','Review stated storage conditions and handling precautions.']],
      [['8 · การควบคุมการสัมผัส','8 · Exposure controls'],['ให้ผู้รับผิดชอบประเมินมาตรการควบคุมและอุปกรณ์คุ้มครอง','Have the responsible person assess exposure controls and protective equipment.']],
      [['10 · ความเสถียรและปฏิกิริยา','10 · Stability and reactivity'],['ตรวจสภาวะและวัสดุที่ต้องหลีกเลี่ยง','Identify conditions and materials to avoid.']],
      [['14 · ข้อมูลการขนส่ง','14 · Transport information'],['ให้ผู้ขนส่งตรวจข้อมูลการขนส่งของสูตรจริงและข้อกำหนดเส้นทาง','Have the carrier verify transport information for the actual formulation and route.']]
    ])+
    P('อย่าคัดลอกเลข UN ชั้นอันตราย หรือกลุ่มบรรจุจากสินค้าอื่นมาใช้เอง หากข้อมูลไม่ครบให้ทีมงานประสานผู้จัดทำ SDS และผู้ขนส่งก่อนยืนยันงาน ผู้รับผิดชอบต้องตรวจข้อกำหนดท้องถิ่นและรูปแบบขนส่งที่เกี่ยวข้องด้วย','Do not copy a UN number, hazard class or packing group from another product. If information is incomplete, ask the team to coordinate with the SDS issuer and carrier before confirmation. The responsible parties must also check applicable local and transport-mode requirements.')+
    links([['ทำความเข้าใจ SPEC, COA และ SDS','Understand SPEC, COA and SDS','/ethanol-spec-coa-sds/']])],

   ['package-and-site',t('ขนาดบรรจุต้องพอดีกับทั้งการใช้และพื้นที่รับ','Match packaging to consumption and site capability'),
    table([
      ['รูปแบบสินค้า','Supply format'],['เรื่องที่ควรตกลงก่อนส่ง','Agree before dispatch']
    ],[
      [['แกลลอน 1 / 5 / 20 ลิตร','1 / 5 / 20 L jerrycans'],['ยืนยันสูตร ขนาดบรรจุ จำนวน จุดรับสินค้า และเงื่อนไขจัดส่งกับทีมงานก่อนนัดส่ง','Confirm the formulation, packaging, quantity, receiving point and delivery terms with the team before scheduling dispatch.']],
      [['ถัง 200 ลิตร','200 L drums'],['จำนวนถัง น้ำหนักรวม วิธีเคลื่อนย้าย และอุปกรณ์รับที่เหมาะกับบรรจุภัณฑ์','Confirm drum count, gross weight, movement arrangements and suitable receiving equipment.']],
      [['IBC 1,000 ลิตร','1,000 L IBCs'],['พื้นที่วาง การยกขน และความพร้อมของจุดนำสินค้าไปใช้','Review placement space, lifting arrangements and the point of use.']],
      [['ตู้ Tank 20,000 ลิตร','20,000 L tank container'],['ให้ทีมเทคนิคประเมินวิธีส่งมอบ จุดรับ ระบบถัง อุปกรณ์เชื่อมต่อ และผู้รับผิดชอบหน้างานก่อนนัดส่ง','Have the technical team review the transfer method, receiving point, tank system, connections and site responsibilities before scheduling.']]
    ])+
    P('IBC และตู้ Tank เป็นคนละรูปแบบบรรจุ ไม่ควรเลือกจากปริมาณอย่างเดียว ส่วนรถ 6 ล้อหรือ 10 ล้อตู้ทึบประตูสไลด์ด้านข้าง เป็นตัวเลือกด้านขนาดรถและการเข้าถึงสินค้า ไม่ใช่หลักฐานว่ารถนั้นผ่านเงื่อนไขขนส่งสินค้าทุกชนิด ต้องยืนยันชนิดรถ พิกัดบรรทุก อุปกรณ์ และข้อกำหนดของสินค้ารายการนั้นกับผู้ขนส่ง','An IBC and a tank container are different formats; volume alone should not determine the choice. A six- or ten-wheel closed-box truck with side sliding doors is an option for vehicle size and cargo access, not evidence of approval to carry every product. Confirm vehicle type, permitted payload, equipment and item-specific requirements with the carrier.')+
    links([['เทียบขนาดบรรจุสำหรับธุรกิจ','Compare packaging formats for your business','/ethanol-packaging-guide/'],['ส่งข้อมูลเพื่อวางแผนจัดส่ง','Prepare a delivery request','/logistics/']])],

   ['storage-readiness',t('พื้นที่ว่าง ไม่ได้แปลว่าพร้อมเก็บเอทานอล','Empty floor space is not proof of safe ethanol storage'),
    P('เอทานอลเป็นสารไวไฟ และมีวัสดุบางชนิดที่เข้ากันไม่ได้ เช่น สารออกซิไดซ์แรง ให้ผู้มีความรู้ด้านความปลอดภัยประเมินพื้นที่จาก SDS และสภาพหน้างานจริง ก่อนเพิ่มปริมาณสต็อกหรือเริ่มการถ่ายเท','Ethanol is flammable and incompatible with certain materials, including strong oxidizers. Have a competent safety professional assess the actual site and SDS before increasing inventory or starting transfer operations.')+
    UL([
      ['ประเมินแหล่งจุดติดไฟ การระบายอากาศ และความเหมาะสมของอุปกรณ์ในพื้นที่','Assess ignition sources, ventilation and the suitability of equipment in the area.'],
      ['กำหนดพื้นที่และปริมาณจัดเก็บ การแยกสารที่เข้ากันไม่ได้ และการควบคุมผู้เข้าถึง','Define storage areas and quantities, incompatible-material segregation and access control.'],
      ['ให้ผู้ผ่านการฝึกอบรมรับผิดชอบการเคลื่อนย้ายและถ่ายเท ตามขั้นตอนที่หน้างานอนุมัติ','Assign trained personnel to movement and transfer under approved site procedures.'],
      ['เตรียมแผนฉุกเฉิน ผู้รับผิดชอบ และช่องทางติดต่อ ให้สัมพันธ์กับสินค้าและขนาดสต็อก','Prepare emergency arrangements, responsible persons and contact channels for the product and inventory scale.']
    ])+
    P('ไม่ใช้บทความทั่วไปกำหนดอัตราระบายอากาศ ชนิดอุปกรณ์ไฟฟ้า ระบบป้องกันไฟฟ้าสถิต หรือปริมาณที่เก็บได้แทนการประเมินเฉพาะหน้างาน ถ้าพื้นที่รับยังไม่พร้อม ให้ปรับขนาดล็อตหรือรอบส่งก่อนเพิ่มสต็อก','A general article cannot specify your ventilation rate, electrical equipment, static-control system or allowable storage quantity. These require a site-specific assessment. If the receiving area is not ready, revise the batch size or delivery cycle before increasing stock.')+
    note('แหล่งอ้างอิงต่างประเทศในบทความใช้ประกอบความเข้าใจด้านเทคนิค ไม่ใช่การนำกฎหมายของประเทศนั้นมาใช้แทนข้อกำหนดไทย','International references in this article provide technical context. They do not substitute another country’s law for Thai requirements.')],

   ['receiving-control',t('ตรวจรับให้ได้ทั้งสินค้าที่ถูกต้องและข้อมูลย้อนกลับ','Receive the correct material with traceable records'),
    P('เตรียมผู้รับสินค้าและเอกสารล่วงหน้า เพื่อตรวจชื่อสูตร ล็อต จำนวน สภาพภาชนะ และข้อมูลส่งมอบตามขั้นตอนของหน้างาน บันทึกผลรับเข้าให้ค้นกลับได้ทั้งผู้ส่ง วันที่ และล็อต โดยให้ฝ่ายคุณภาพพิจารณาการปล่อยใช้งานตามเกณฑ์ของธุรกิจ','Prepare receiving personnel and documents in advance to check formulation, batch, quantity, package condition and delivery information under site procedures. Keep records traceable to the sender, date and batch, with quality release handled against your business criteria.')+
    P('หากพบภาชนะผิดรูป ชำรุด มีร่องรอยรั่ว หรือสงสัยความผิดปกติ ให้หยุดขั้นตอนรับหรือเคลื่อนย้ายที่เกี่ยวข้อง และแจ้งผู้รับผิดชอบความปลอดภัยกับผู้ส่งตามแผนหน้างาน ไม่ให้ผู้ที่ไม่ผ่านการฝึกอบรมเปิดถัง ย้ายของรั่ว หรือจัดการเหตุด้วยตนเอง','If a package is deformed, damaged, leaking or otherwise suspect, stop the affected receiving or handling operation and notify the site safety lead and sender under the site plan. Untrained personnel should not open the container, move leaking goods or attempt their own response.')+
    P('กรณีฉลากหรือเอกสารไม่ตรง ให้แยกสถานะในระบบว่า “รอตรวจสอบ” โดยไม่อนุมัติใช้จนได้รับคำตอบที่บันทึกได้ การจัดการสถานะเอกสารเป็นคนละเรื่องกับการเคลื่อนย้ายทางกายภาพ ซึ่งต้องทำตามการประเมินความปลอดภัย','When labels or documents do not match, record the material as pending review and withhold use until a documented resolution is available. Administrative status control is separate from physical movement, which must follow the safety assessment.')],

   ['delivery-and-stock-example',t('ตัวอย่าง: แบ่งรอบส่งให้เหมาะกับกำลังใช้และพื้นที่','Example: align deliveries with usage and available storage'),
    P('สมมุติธุรกิจใช้เอทานอลประมาณ 800 ลิตรต่อเดือน และหน้างานได้รับการประเมินให้เก็บสินค้ารายการนั้นได้ครั้งละ 400 ลิตร การซื้อครั้งเดียวสี่ถัง 200 ลิตรจึงไม่ใช่ทางเลือกที่พร้อมรับ แม้ราคาเฉลี่ยต่อหน่วยอาจดูน่าสนใจ','Suppose a business uses about 800 L a month and its site assessment allows only 400 L of that product to be stored at one time. A single delivery of four 200 L drums would therefore exceed receiving readiness, even if its average unit price looks attractive.')+
    P('ฝ่ายจัดซื้ออาจขอเทียบแผนส่งสองถังต่อรอบ กับแผนอื่นที่ผู้ขนส่งรองรับ แต่ต้องคำนวณของคงเหลือ ณ วันรับด้วย หากยังเหลือ 100 ลิตร การรับเพิ่ม 400 ลิตรจะทำให้ยอดรวมเป็น 500 ลิตร จึงต้องลดปริมาณหรือเลื่อนรอบให้เหมาะสม ตัวเลขนี้เป็นตัวอย่างการวางแผน ไม่ใช่เกณฑ์อนุญาตจัดเก็บ','Purchasing could compare two drums per delivery with other carrier-supported plans, while accounting for stock remaining on arrival. If 100 L remains, receiving another 400 L would create 500 L on site. The quantity or schedule must therefore change. These numbers illustrate planning; they are not storage authorization limits.')+
    UL([
      ['ใช้ยอดใช้จริงและความผันผวน วางจุดสั่งเติมและช่วงเวลาที่ทีมงานยืนยันได้','Use actual consumption and variation to plan replenishment points and a confirmed supply window.'],
      ['เทียบต้นทุนสินค้า ค่าขนส่ง และค่าใช้จ่ายการรับของของแต่ละแผน','Compare product, freight and receiving costs for each plan.'],
      ['ตกลงวิธีติดตามคงเหลือ ผู้อนุมัติปล่อยสินค้า และรอบรายงาน หากใช้บริการบริหารสต็อก','When using stock support, agree balance monitoring, dispatch approval and reporting cycles.']
    ])+
    P('Etohcols มีบริการวางแผนสต็อก ติดตามยอด และเติมสินค้าตามรอบ รวมถึงการเก็บและทยอยส่งตามข้อตกลงของโครงการ ให้ทีมงานประเมินสินค้า พื้นที่ ระยะเวลา และค่าใช้จ่ายก่อนเริ่มบริการ','Etohcols offers stock planning, balance monitoring and scheduled replenishment, plus storage and scheduled release under project-specific terms. Have the team assess the product, location, duration and costs before the service starts.')+
    links([
      ['ดูบริการบริหารสต็อก','Explore stock support','/stock-management/'],
      ['คำนวณต้นทุนถึงปลายทางให้ครบ','Compare total delivered cost','/ethanol-total-delivered-cost/'],
      ['ปรึกษาแผนจัดซื้อและส่งมอบ','Discuss purchasing and delivery','/quote/?intent=advice']
    ])]
  ]
 }
];
