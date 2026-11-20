// Buying guidance extends the existing article renderer without changing its routes or layout.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const normalize = s => String(s).replace(/\s+/g, ' ').trim();
export const buyingTranslationsV37 = {};
function t(th, en) {
  const key = normalize(th);
  if (buyingTranslationsV37[key] && buyingTranslationsV37[key] !== en) throw new Error(`Conflicting buying translation: ${key}`);
  buyingTranslationsV37[key] = en;
  return th;
}
const P = s => `<p>${s}</p>`;
const UL = items => `<ul>${items.map(s => `<li>${s}</li>`).join('')}</ul>`;
const note = s => `<aside class="k16-note">${s}</aside>`;
function A(th, en, url) {
  t(th, en);
  return `<a href="${esc(url)}">${esc(t(`${th} ↗`, `${en} ↗`))}</a>`;
}
function table(heads, rows) {
  const label = t('ตารางเปรียบเทียบ เลื่อนแนวนอนเพื่ออ่านทุกคอลัมน์', 'Comparison table. Scroll horizontally to read all columns.');
  const hint = t('เลื่อนตารางด้านข้างเพื่ออ่านครบทุกคอลัมน์ ↔', 'Scroll horizontally to read all columns ↔');
  return `<div class="k16-table" role="region" aria-label="${esc(label)}" tabindex="0"><span class="k16-table-hint">${esc(hint)}</span><table><thead><tr>${heads.map(s => `<th scope="col">${s}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((s, i) => i ? `<td>${s}</td>` : `<th scope="row">${s}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function source(th, en, url) {
  t(th, en);
  t(`${th} ↗`, `${en} ↗`);
  return [th, url];
}
export const buyingSourcesV37 = {
  buyingSds: source('OSHA · หัวข้อข้อมูลในเอกสาร SDS', 'OSHA · Information included in a safety data sheet', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200AppD'),
  buyingEthanol: source('CDC / NIOSH · ข้อมูลอันตรายของเอทิลแอลกอฮอล์', 'CDC / NIOSH · Ethyl alcohol hazard information', 'https://www.cdc.gov/niosh/npg/npgd0262.html'),
  buyingStorage: source('HSE · การจัดเก็บของเหลวไวไฟในภาชนะ', 'HSE · The storage of flammable liquids in containers', 'https://www.hse.gov.uk/pubns/books/hsg51.htm'),
  buyingHandling: source('HSE · การใช้และจัดการของเหลวไวไฟ', 'HSE · Safe use and handling of flammable liquids', 'https://www.hse.gov.uk/pubns/books/hsg140.htm')
};
const dates = {
  dateModified: '2026-11-20',
  dateLabelThai: t('ตรวจเนื้อหาและแหล่งอ้างอิง · 20 พฤศจิกายน 2569', 'Content and sources reviewed · 20 November 2026')
};

export const buyingArticlesV37 = [
  {
    path: '/ethanol-total-delivered-cost/',
    ...dates,
    tag: t('จัดซื้อและต้นทุนรวม', 'Procurement and delivered cost'),
    title: t('เทียบต้นทุนเอทานอลรวมค่าขนส่ง', 'Compare the total delivered cost of ethanol'),
    sub: t('เทียบให้ครบทั้งสเปก ปริมาณที่ใช้ได้ และรอบซื้อ', 'Compare specifications, usable quantity and buying cycles'),
    intro: t('ราคาต่อถังยังไม่บอกต้นทุนทั้งหมด การเปรียบเทียบเอทานอลควรเริ่มจากสินค้าที่ผ่านข้อกำหนดเดียวกัน แล้วรวมค่าจัดส่ง เงื่อนไขรับสินค้า และเงินที่ต้องใช้ในแต่ละรอบ เพื่อเลือกข้อเสนอที่เหมาะกับธุรกิจจริง', 'A price per drum does not tell the whole story. Start with ethanol that meets the same requirements, then compare freight, receiving conditions and the cash needed for each purchase cycle to choose an offer that fits your business.'),
    image: 'tank-truck-v10', imageFit: 'contain',
    alt: t('รถหัวลากพร้อมตู้ Tank สำหรับแผนส่งมอบเอทานอลปริมาณมาก', 'Tractor unit with a tank container for bulk ethanol delivery planning'),
    sources: ['buyingSds', 'buyingHandling'],
    sections: [
      ['same-basis', t('เริ่มจากสเปกเดียวกัน ก่อนเทียบราคา', 'Match the specification before comparing prices'),
        P(t('ส่งข้อกำหนดชุดเดียวกันให้ผู้ขายแต่ละราย ระบุชนิดเอทานอล ความเข้มข้น หน่วยการวัด เกณฑ์คุณภาพ และการใช้งานที่ต้องการ หากเป็นเอทานอลแปลงสภาพ ให้ตรวจชนิดและปริมาณสารแปลงสภาพด้วย เปอร์เซ็นต์เอทานอลเท่ากันไม่ได้หมายความว่าสูตรหรือผลการใช้งานจะเท่ากัน', 'Send each supplier the same requirements: ethanol type, concentration, measurement basis, quality criteria and intended application. For denatured ethanol, also check the denaturant type and amount. The same ethanol percentage does not mean the same formulation or performance.')) +
        UL([
          t('ระบุ % โดยปริมาตรหรือโดยน้ำหนัก และอุณหภูมิอ้างอิงเมื่อมีผลต่อการเปรียบเทียบ', 'Specify whether the percentage is by volume or by mass, and the reference temperature where relevant to the comparison.'),
          t('ยืนยันเกณฑ์ที่กระทบงานจริง เช่น ปริมาณน้ำ กลิ่น หรือสิ่งเจือปน ตามสูตรและวิธีทดสอบของธุรกิจ', 'Confirm the criteria that matter to the work, such as water content, odour or impurities, using the business’s formulation and test methods.'),
          t('เทียบเงื่อนไขตรวจรับและเอกสารที่ตรงสินค้า ไม่ใช้ชื่อแบรนด์หรือคำว่าเกรดสูงแทนผลการประเมิน', 'Compare acceptance conditions and documents for the actual product. A brand name or a “high grade” description is not a substitute for assessment.')
        ]) +
        P(t('หากเปลี่ยนผู้ขาย ให้ผ่านขั้นตอนประเมินวัตถุดิบและทดลองกับสูตรจริงก่อนตัดสินจากราคา เอกสาร SPEC ใช้ตั้งข้อกำหนด ส่วน COA ใช้ประกอบการตรวจล็อตที่ระบุ และ SDS ใช้ดูข้อมูลความปลอดภัย ไม่ใช่เอกสารที่ใช้แทนกันได้', 'When changing suppliers, assess the material and test it in the actual formulation before deciding on price. A specification sets requirements, a COA supports assessment of the identified batch, and an SDS provides safety information. These documents serve different purposes.'))
      ],
      ['cost-components', t('แยกรายการค่าใช้จ่ายให้เห็นต้นทุนถึงจุดรับสินค้า', 'Separate the costs of getting goods to your receiving point'),
        P(t('ขอใบเสนอราคาที่ระบุว่าค่าใดรวมแล้วและค่าใดยังต้องประเมิน โดยใช้ปลายทางและเงื่อนไขรับสินค้าชุดเดียวกัน อย่าเติมค่าที่รวมอยู่ในราคาสินค้าแล้วซ้ำอีกครั้ง และอย่าเทียบข้อเสนอรวมภาษีกับข้อเสนอไม่รวมภาษีโดยตรง', 'Ask for a quotation that identifies included charges and any items still to be assessed, using the same destination and receiving conditions. Do not count charges already included in the product price twice, or directly compare a tax-inclusive offer with a tax-exclusive one.')) +
        table(
          [t('รายการที่เทียบ', 'Cost item'), t('สิ่งที่ต้องยืนยัน', 'What to confirm')],
          [
            [t('สินค้าและปริมาณสุทธิ', 'Product and net quantity'), t('สเปก หน่วยราคา ปริมาณบรรจุจริง และส่วนลดที่มีเงื่อนไข', 'Specification, price unit, actual fill quantity and any conditional discounts.')],
            [t('บรรจุภัณฑ์และพาเลต', 'Packaging and pallets'), t('รวมในราคาหรือแยกคิด มีมัดจำหรือเงื่อนไขคืนภาชนะหรือไม่', 'Whether included or charged separately, and whether deposits or container-return conditions apply.')],
            [t('ขนส่งและรับสินค้า', 'Transport and receiving'), t('ค่าขนส่งถึงจุดใด ใครรับผิดชอบการลงสินค้า และมีค่าใช้จ่ายหน้างานใดเพิ่มเติม', 'The delivery point covered, who unloads, and any additional site charges.')],
            [t('การทดสอบและเอกสาร', 'Testing and documentation'), t('รายการปกติที่จัดให้และรายการเพิ่มเติมที่ต้องประเมินค่าใช้จ่าย', 'What is routinely supplied and whether additional requirements need a separate cost assessment.')],
            [t('เงื่อนไขทางการค้า', 'Commercial terms'), t('ภาษี เงื่อนไขชำระเงิน อายุข้อเสนอ และค่าใช้จ่ายกรณีเปลี่ยนแผน', 'Tax basis, payment terms, quotation validity and charges if plans change.')]
          ]
        ) +
        note(t('ต้นทุนจัดซื้อถึงจุดรับสินค้า = ค่าสินค้า + ค่าบรรจุและบริการที่คิดเพิ่ม + ค่าขนส่งและรับสินค้าที่ผู้ซื้อต้องรับผิดชอบ โดยใช้ฐานภาษีเดียวกัน', 'Cost to the receiving point = product cost + separately charged packaging and services + transport and receiving costs payable by the buyer, using the same tax basis.')) +
        P(t('เงินมัดจำที่คืนได้ควรแยกออกจากต้นทุนที่จ่ายขาด แต่ยังต้องรวมไว้ในแผนเงินสดจนกว่าจะได้รับคืน การระบุสองส่วนนี้ช่วยให้เห็นทั้งความคุ้มค่าและเงินที่ต้องเตรียม โดยไม่ถือว่าค่าใช้จ่ายทุกประเภทจะเกิดกับทุกคำสั่งซื้อ', 'Track refundable deposits separately from non-refundable costs, while keeping them in the cash plan until refunded. This shows both the cost comparison and the cash required; it does not assume every charge applies to every purchase.'))
      ],
      ['usable-quantity', t('ใช้ปริมาณที่ตรวจรับและนำไปใช้ได้เป็นฐาน', 'Use accepted, usable quantity as the basis'),
        P(t('ก่อนหารต้นทุนต่อหน่วย ให้ยืนยันว่าหน่วยตรงกัน ใบเสนอราคาต่อกิโลกรัมไม่ใช่ราคาเดียวกับต่อลิตร และขนาดภาชนะไม่จำเป็นต้องเท่ากับปริมาณบรรจุสุทธิที่ตกลงซื้อ หากต้องแปลงหน่วย ให้ใช้ข้อมูลความหนาแน่นและอุณหภูมิอ้างอิงของสินค้านั้นที่ยืนยันแล้ว', 'Before calculating a unit cost, align the units. A quote per kilogram is not the same as a quote per litre, and a container’s capacity is not necessarily the agreed net fill. If conversion is needed, use confirmed density and reference-temperature information for that product.')) +
        note(t('ต้นทุนต่อหน่วยที่ใช้ได้ = ต้นทุนในขอบเขตที่ตกลงเปรียบเทียบ ÷ ปริมาณที่ผ่านการตรวจรับและใช้ได้ตามข้อกำหนด โดยใช้หน่วยเดียวกัน', 'Cost per usable unit = cost within the agreed comparison scope ÷ quantity accepted and usable to the requirements, expressed in the same unit.')) +
        P(t('หากธุรกิจมีบันทึกการสูญเสียหรือสินค้าที่ต้องกักรอตรวจ ให้แสดงข้อมูลนั้นแยกจากปริมาณซื้อ และใช้ประวัติจริงในการวางแผน ไม่กำหนดเปอร์เซ็นต์สูญเสียขึ้นเอง สินค้าที่ไม่ผ่านเกณฑ์ต้องดำเนินการตามเงื่อนไขตรวจรับ ไม่รวมเป็นปริมาณที่พร้อมใช้', 'If the business records losses or stock awaiting release, distinguish those quantities from purchases and plan from actual records. Do not invent a loss percentage. Material that fails acceptance criteria must be handled under the agreed terms and excluded from available usable quantity.')) +
        P(t('ไม่ควรหารราคาด้วยเปอร์เซ็นต์แอลกอฮอล์แล้วสรุปว่าความเข้มข้นสูงกว่าคุ้มกว่าเสมอ หากสูตรต้องปรับเพิ่ม มีข้อจำกัดสารแปลงสภาพ หรือยังไม่ผ่านการทดสอบ ต้นทุนและความเหมาะสมยังเปรียบเทียบกันไม่ได้ครบ', 'Dividing price by alcohol concentration does not establish that the stronger option is always better value. If formulation changes are needed, denaturant restrictions apply or testing is incomplete, the cost and suitability comparison is not yet complete.'))
      ],
      ['purchase-cycle', t('ซื้อครั้งละเท่าไร ให้ดูทั้งการใช้และเงินทุน', 'Size each purchase around usage and cash needs'),
        P(t('การซื้อจำนวนมากอาจเปลี่ยนราคาหรือค่าขนส่งต่อหน่วย แต่ก็เพิ่มสินค้าที่ต้องจัดเก็บและเงินที่ผูกอยู่กับสต็อก ให้เปรียบเทียบหลายรอบซื้อจากการใช้จริง ความผันผวนของคำสั่งผลิต พื้นที่จัดเก็บที่รองรับ และช่วงเวลาที่ผู้ขายยืนยันได้', 'Buying more may change the unit price or freight cost, but also increases storage needs and cash tied up in stock. Compare buying cycles against actual consumption, production variability, assessed storage capacity and the delivery window the supplier can confirm.')) +
        note(t('ปริมาณใช้ตามแผนในหนึ่งรอบ = อัตราการใช้เฉลี่ยต่อช่วงเวลา × ระยะเวลาระหว่างรอบรับสินค้า โดยประเมินสต็อกสำรองแยกตามความไม่แน่นอนจริง', 'Planned consumption per cycle = average consumption per time period × time between receipts, with buffer stock assessed separately against actual uncertainty.')) +
        P(t('ตัวอย่าง: ธุรกิจใช้วัตถุดิบสเปกเดิม 50 ลิตรต่อสัปดาห์ ถังที่ตกลงบรรจุสุทธิ 200 ลิตรจะครอบคลุมการใช้ประมาณ 4 สัปดาห์ หากอัตราการใช้คงที่และยังไม่รวมสต็อกสำรอง การรับ 2 ถังพร้อมกันจึงต้องประเมินการใช้ประมาณ 8 สัปดาห์ พร้อมพื้นที่และเงินทุนเพิ่ม ไม่ใช่ดูเพียงราคาต่อถัง', 'Example: a business uses 50 L per week of the same specified material. A drum with an agreed net fill of 200 L covers about 4 weeks at steady consumption, before buffer stock. Receiving 2 drums together therefore means assessing about 8 weeks of usage, plus the extra space and cash required, rather than comparing drum prices alone.')) +
        P(t('หากต้องการผลิตหรือซื้อเป็นรอบแล้วทยอยรับ ให้แยกเงื่อนไขเก็บสินค้า การรายงานยอด การเบิกส่ง และค่าใช้จ่ายออกจากราคาวัตถุดิบ บริการบริหารสต็อกต้องประเมินและตกลงเป็นรายโครงการ', 'If buying or producing in batches with staged delivery, separate storage, stock reporting, release rules and service charges from the material price. Stock-management services require a project-specific assessment and agreement.')) +
        P(A('ดูบริการบริหารสต็อกและเติมสินค้า', 'Explore stock management and replenishment', '/stock-management/'))
      ],
      ['receiving-terms', t('ค่าขนส่งที่เทียบได้ ต้องเริ่มจากข้อมูลปลายทางเดียวกัน', 'Comparable freight quotes need the same destination details'),
        P(t('จังหวัดเดียวกันไม่ได้แปลว่าเงื่อนไขส่งเหมือนกัน แจ้งรหัสไปรษณีย์ จุดรับจริง ข้อจำกัดถนน เวลารับของ และผู้รับผิดชอบลงสินค้า ถ้ามีจุดส่งหลายแห่งหรือทยอยส่ง ต้องระบุในคำขอตั้งแต่แรก เพื่อให้ข้อเสนอรวมงานที่ต้องทำจริง', 'The same province does not mean the same delivery conditions. Provide the postcode, actual receiving point, access restrictions, receiving hours and unloading responsibility. State multiple destinations or staged deliveries at the outset so the quotation covers the work required.')) +
        UL([
          t('ถัง 200 ลิตรและ IBC: แจ้งจำนวน ภาชนะหรือพาเลต และอุปกรณ์ยกที่ปลายทางมีให้', 'For 200 L drums and IBCs, state the quantity, container or pallet arrangement and lifting equipment available at the destination.'),
          t('ตู้ Tank 20,000 ลิตร: ประสานทางเข้า จุดจอด จุดรับถ่าย ระบบที่เข้ากันได้ และความพร้อมของผู้รับสินค้า', 'For 20,000 L tank-container supply, coordinate access, parking, the transfer point, compatible receiving systems and receiving-team readiness.'),
          t('ทุกขนาด: ให้ทีมงานยืนยันผู้ขนส่งที่รับสินค้าจริง เงื่อนไขบริการ และค่าใช้จ่ายก่อนยืนยันงาน', 'For every size, have the team confirm a carrier that accepts the actual goods, the service conditions and the cost before confirming the arrangement.')
        ]) +
        P(t('SDS ของสินค้าจริงช่วยระบุเงื่อนไขการจัดการและจัดเก็บ ส่วนข้อมูลการขนส่งต้องตรวจร่วมกับผู้ขนส่ง อย่าถือว่าส่งได้ด้วยบริการทั่วไปเพียงเพราะภาชนะเล็ก แหล่งข้อมูล OSHA อธิบายหัวข้อใน SDS ส่วนข้อกำหนดที่ใช้ในไทยต้องตรวจตามสินค้าและเส้นทางจริง', 'The actual product’s SDS helps identify handling and storage conditions; transport information must also be checked with the carrier. Small packaging does not by itself establish acceptance by a general delivery service. OSHA explains SDS headings; applicable Thai requirements must be checked for the goods and route.')) +
        P(A('เตรียมข้อมูลให้ทีมวางแผนจัดส่ง', 'Prepare a delivery-planning brief', '/logistics/'))
      ],
      ['comparison-brief', t('เตรียมคำขอราคาให้เทียบข้อเสนอได้ทันที', 'Prepare a request that makes quotations comparable'),
        P(t('ใช้คำขอหนึ่งชุดระบุข้อมูลด้านล่าง แล้วให้ผู้ขายตอบในขอบเขตเดียวกัน หากข้อมูลใดยังไม่พร้อม ให้แยกเป็นรายการรอยืนยัน แทนการถือว่าไม่มีค่าใช้จ่ายหรือไม่มีข้อจำกัด', 'Use one brief covering the information below and ask suppliers to respond on the same basis. Mark unresolved items as awaiting confirmation instead of assuming they carry no cost or restrictions.')) +
        UL([
          t('สินค้า ชนิด ความเข้มข้น หน่วย สเปกเดิม และผลการประเมินที่ต้องผ่าน', 'Product, ethanol type, concentration, units, existing specification and acceptance requirements.'),
          t('ขนาดบรรจุ ปริมาณต่อครั้ง การใช้ต่อเดือน และแผนรอบรับสินค้า', 'Pack size, quantity per purchase, monthly consumption and planned receiving cycles.'),
          t('จุดส่ง ข้อจำกัดรับสินค้า ผู้ลงสินค้า และช่วงเวลาที่ต้องการ', 'Delivery point, receiving restrictions, unloading responsibility and requested timing.'),
          t('เอกสารที่ต้องการ เงื่อนไขชำระเงิน ค่าใช้จ่ายที่รวมแล้ว และรายการที่ต้องยืนยันเพิ่มเติม', 'Required documents, payment terms, included charges and items needing further confirmation.')
        ]) +
        P(t('Etohcols ไม่แสดงราคาสาธารณะ ข้อเสนอขึ้นกับสินค้า ปริมาณ และปลายทาง การกดขอราคาเป็นการเตรียมคำขอให้ทีมงานพิจารณา ไม่ใช่การชำระเงินหรือยืนยันคำสั่งซื้อ ตัวอย่างทดสอบฟรี โดยพิจารณาค่าจัดส่งตามพื้นที่และแจ้งก่อนส่ง', 'Etohcols does not publish prices. Quotations depend on the product, quantity and destination. Requesting a quote prepares an enquiry for the team to assess; it does not take payment or confirm an order. Test samples are free, with freight assessed by destination and confirmed before dispatch.')) +
        P(A('เลือกสินค้าเพื่อขอราคา', 'Select products for a quotation', '/shop/')) +
        P(A('ขอราคาพร้อมค่าจัดส่งเพื่อเทียบต้นทุน', 'Request a quotation including freight', '/quote/?intent=compare')) +
        P(A('อ่านคู่มือเลือกขนาดบรรจุ', 'Read the packaging guide', '/ethanol-packaging-guide/'))
      ]
    ]
  },
  {
    path: '/ethanol-packaging-guide/',
    ...dates,
    tag: t('ขนาดบรรจุและการส่งมอบ', 'Packaging and delivery'),
    title: t('เลือกขนาดบรรจุเอทานอลให้ตรงการใช้งาน', 'Choose ethanol packaging that fits your operation'),
    sub: t('แยกแกลลอน ถัง 200 ลิตร IBC และตู้ Tank ให้ชัด', 'Understand jerrycans, 200 L drums, IBCs and tank containers'),
    intro: t('ขนาดที่เหมาะต้องสัมพันธ์กับปริมาณใช้ รอบซื้อ และความพร้อมรับสินค้า ไม่ใช่เลือกภาชนะที่ใหญ่ที่สุดเสมอไป คู่มือนี้ช่วยแยกรูปแบบบรรจุของ Etohcols พร้อมข้อมูลที่ต้องยืนยันก่อนขอราคาและวางแผนส่งมอบ', 'The right pack size depends on consumption, purchase cycles and receiving capability—not simply the largest container. This guide explains Etohcols packaging formats and the details to confirm before requesting a quote and planning delivery.'),
    image: 'ibc1000-branded-v6',
    imageFit: 'contain',
    alt: t('ถังพลาสติก IBC 1,000 ลิตรพร้อมโครงเหล็กและป้าย Etohcols', '1,000 L plastic IBC with a metal cage and Etohcols label'),
    sources: ['buyingSds', 'buyingEthanol', 'buyingStorage', 'buyingHandling'],
    sections: [
      ['formats', t('รู้จักรูปแบบบรรจุและข้อมูลก่อนขอราคา', 'Understand packaging formats and what to confirm before a quotation'),
        P(t('ขนาดที่แสดงเป็นทางเลือกในการจัดซื้อ ต้องยืนยันสูตร ปริมาณบรรจุสุทธิ และเงื่อนไขจัดส่งเป็นรายคำขอ รูปลักษณ์ภาชนะเพียงอย่างเดียวไม่ได้ยืนยันว่ารองรับสินค้าหรือวิธีขนส่งทุกประเภท', 'The listed sizes are purchasing options. Confirm the formulation, net fill and delivery terms for each enquiry. A container’s appearance alone does not establish compatibility with every product or transport method.')) +
        table(
          [t('ขนาดและรูปแบบ', 'Size and format'), t('จุดที่ใช้ประเมิน', 'What to assess'), t('ข้อมูลที่ยืนยันก่อนจัดซื้อ', 'Details to confirm before purchasing')],
          [
            [t('1 ลิตร · แกลลอนใสขุ่นมีหูจับ', '1 L · translucent white jerrycan with handle'), t('ปริมาณใช้ต่อจุดและจำนวนหน่วยที่ต้องจัดการ', 'Consumption at each point of use and the number of units to handle.'), t('ยืนยันสูตร ขนาดบรรจุ จำนวน และเงื่อนไขจัดส่งกับทีมงาน', 'Confirm the formulation, packaging, quantity and delivery terms with the team.')],
            [t('5 ลิตร · แกลลอนใสขุ่นมีหูจับ', '5 L · translucent white jerrycan with handle'), t('รอบใช้ต่อหน่วย พื้นที่เก็บ และการกระจายไปแต่ละจุด', 'Consumption per unit, storage space and distribution to points of use.'), t('ยืนยันสูตร ขนาดบรรจุ จำนวน และเงื่อนไขจัดส่งกับทีมงาน', 'Confirm the formulation, packaging, quantity and delivery terms with the team.')],
            [t('20 ลิตร · แกลลอนสีขาวหรือสีดำ', '20 L · white or black jerrycan'), t('อุปกรณ์เคลื่อนย้าย จำนวนหน่วย และวิธีนำเข้าสู่กระบวนการ', 'Handling equipment, unit count and how the material enters the process.'), t('ยืนยันสูตร ขนาดบรรจุ จำนวน และเงื่อนไขจัดส่งกับทีมงาน', 'Confirm the formulation, packaging, quantity and delivery terms with the team.')],
            [t('200 ลิตร · ถังพลาสติกสีน้ำเงิน', '200 L · blue plastic drum'), t('จำนวนถังต่อรอบ จุดวาง อุปกรณ์ยก และวิธีรับสินค้า', 'Drums per delivery, storage location, lifting equipment and receiving method.'), t('ยืนยันสินค้า ปริมาณบรรจุ และกำหนดส่งเป็นรายคำขอ', 'Confirm the product, fill quantity and delivery schedule for each enquiry.')],
            [t('IBC 1,000 ลิตร · ถังพลาสติกมีโครงเหล็ก', '1,000 L IBC · plastic container in a metal cage'), t('พื้นที่วาง น้ำหนักรวม อุปกรณ์ยก และระบบรับถ่ายที่เข้ากันได้', 'Footprint, gross mass, lifting equipment and a compatible receiving system.'), t('ยืนยันสินค้า ปริมาณบรรจุ และกำหนดส่งเป็นรายคำขอ', 'Confirm the product, fill quantity and delivery schedule for each enquiry.')],
            [t('ตู้ Tank 20,000 ลิตร', '20,000 L tank-container supply'), t('ปริมาณใช้ต่อรอบ ทางเข้ารถ จุดจอด ระบบรับถ่าย และพื้นที่รองรับ', 'Consumption per cycle, vehicle access, parking, the transfer system and receiving capacity.'), t('ประเมินแผนรับสินค้าและยืนยันปริมาณส่งมอบกับทีมงาน', 'Assess the receiving plan and confirm the delivered quantity with the team.')]
          ]
        ) +
        note(t('IBC 1,000 ลิตรไม่ใช่ตู้ ISO Tank ส่วนตู้ Tank 20,000 ลิตรในแค็ตตาล็อกเป็นรูปแบบจัดส่งปริมาณมาก ต้องยืนยันข้อมูลตู้และปริมาณสุทธิของเที่ยวส่งจริง ไม่ใช้ตัวเลขนี้แทนความจุของตู้ทุกแบบ', 'A 1,000 L IBC is not an ISO tank container. The catalogued 20,000 L tank-container option is a bulk supply format: confirm the actual container and net quantity for the shipment. This figure is not a universal capacity for all tank containers.')) +
        P(A('ดูทางเลือกขนาดบรรจุในเว็บ', 'View the packaging options', '/packaging/'))
      ],
      ['usage-cycle', t('เลือกจากรอบใช้ ไม่ใช่ขนาดธุรกิจอย่างเดียว', 'Choose by consumption cycle, not business size alone'),
        P(t('เริ่มจากปริมาณใช้ต่อวันหรือสัปดาห์ จำนวนจุดใช้งาน และรอบสั่งผลิตของธุรกิจ จากนั้นเทียบกับพื้นที่จัดเก็บและจำนวนครั้งที่ต้องรับสินค้า ร้านขนาดเล็กที่ใช้วัตถุดิบต่อเนื่องอาจมีโจทย์ต่างจากโรงงานใหญ่ที่ใช้เอทานอลเป็นครั้งคราว', 'Start with daily or weekly usage, the number of points of use and the business’s production cycle. Then compare this with storage space and receiving frequency. A small business using material continuously may have different needs from a large factory using ethanol occasionally.')) +
        UL([
          t('ปริมาณต่อรอบ: ซื้อแล้วคาดว่าจะใช้หมดเมื่อใด และมีงานที่ทำให้ยอดใช้เพิ่มหรือลดหรือไม่', 'Quantity per cycle: when is the purchase expected to be consumed, and could upcoming work increase or reduce usage?'),
          t('วิธีจัดการ: ต้องเคลื่อนย้ายทั้งภาชนะหรือมีระบบรับถ่ายที่ผ่านการประเมินแล้ว', 'Handling method: will the entire container be moved, or is an assessed transfer system available?'),
          t('พื้นที่และเอกสาร: แยกล็อตได้หรือไม่ และตรวจรับก่อนนำไปใช้ได้อย่างไร', 'Space and documentation: can batches be identified separately, and how will stock be accepted before use?'),
          t('เงินทุนและรอบส่ง: เปรียบเทียบสินค้าคงคลังที่เพิ่มกับจำนวนเที่ยวขนส่งที่เปลี่ยนไป', 'Cash and delivery cycles: compare the additional inventory with the change in delivery frequency.')
        ]) +
        P(t('ขนาดใหญ่ไม่ได้หมายถึงคุ้มที่สุดทุกกรณี เปรียบเทียบขนาดบรรจุกับปริมาณใช้จริง แล้วแจ้งขนาด จำนวน และช่วงรับสินค้าที่ต้องการ เพื่อให้ทีมงานยืนยันรายละเอียดก่อนจัดซื้อ', 'Larger packs are not always the best value. Compare packaging with actual consumption, then specify the size, quantity and preferred receiving window so the team can confirm the details before purchasing.'))
      ],
      ['volume-and-mass', t('ลิตร กิโลกรัม และพิกัดบรรทุก เป็นคนละข้อมูล', 'Litres, kilograms and payload are different measures'),
        P(t('ลิตรบอกปริมาตร กิโลกรัมบอกมวล การคิดราคาและวางแผนขนส่งจึงต้องระบุทั้งปริมาณสุทธิและหน่วยให้ชัด หากใบเสนอราคาใช้กิโลกรัม แต่แผนผลิตใช้ลิตร ให้ตกลงวิธีแปลงหน่วยกับผู้ขายก่อน ไม่ใช้ค่าความหนาแน่นเดียวกับเอทานอลทุกความเข้มข้นหรือทุกสูตร', 'Litres measure volume; kilograms measure mass. Pricing and transport planning therefore need a clear net quantity and unit. If a quote uses kilograms while production planning uses litres, agree the conversion basis with the supplier first. Do not use one density value for every ethanol concentration or formulation.')) +
        note(t('มวลสุทธิ (กก.) = ปริมาตรสุทธิ (ลิตร) × ความหนาแน่น (กก./ลิตร) โดยใช้ค่าของสินค้าจริงที่อุณหภูมิอ้างอิงซึ่งตกลงกัน', 'Net mass (kg) = net volume (L) × density (kg/L), using data for the actual product at the agreed reference temperature.')) +
        P(t('SDS หมวดคุณสมบัติทางกายภาพและเคมีอาจให้ข้อมูลความหนาแน่นหรือความหนาแน่นสัมพัทธ์ แต่ค่าที่เป็นช่วงหรือค่าประมาณอาจยังไม่พอสำหรับการคำนวณซื้อขาย ให้ยืนยันหน่วย วิธีวัด และค่าที่ใช้ในเอกสารการค้ากับทีมงาน', 'The physical and chemical properties section of an SDS may provide density or relative density. A range or approximate value may not be sufficient for commercial calculations; confirm the units, measurement method and value used in the trading documents with the team.')) +
        P(t('น้ำหนักรวมที่ใช้พิจารณาขนส่งยังมีภาชนะ พาเลต และอุปกรณ์ที่บรรทุกไปด้วย จำนวนถังหรือจำนวนล้อรถจึงไม่เพียงพอที่จะสรุปพิกัดรับงาน ต้องให้ผู้ขนส่งยืนยันน้ำหนักรวม การจัดวาง และข้อจำกัดของเที่ยวส่งจริง', 'Transport planning must also account for containers, pallets and other equipment carried. Drum count or vehicle wheel count alone does not establish suitable payload. The carrier must confirm gross mass, loading arrangement and restrictions for the actual shipment.'))
      ],
      ['receiving-capability', t('ยืนยันปลายทางก่อนเลือกรูปแบบส่งมอบ', 'Confirm receiving capability before choosing the delivery format'),
        P(t('บรรจุภัณฑ์ที่เหมาะกับปริมาณใช้ยังต้องรับเข้าได้จริง ส่งภาพหรือข้อมูลจุดรับให้ทีมงานเห็นข้อจำกัดก่อนประเมินรถและค่าขนส่ง ระบุผู้ประสานงานปลายทางเพื่อยืนยันเงื่อนไขเดียวกันทั้งฝ่ายขาย ผู้ขนส่ง และฝ่ายรับสินค้า', 'Packaging that fits consumption must also work at the receiving site. Share receiving-point photos or details before the team assesses the vehicle and freight. Name a destination contact so sales, the carrier and the receiving team agree on the same conditions.')) +
        table(
          [t('รูปแบบส่งมอบ', 'Delivery format'), t('ข้อมูลปลายทางที่ควรเตรียม', 'Receiving information to prepare')],
          [
            [t('แกลลอน 1 / 5 / 20 ลิตร', '1 / 5 / 20 L jerrycans'), t('จำนวนหน่วยต่อครั้ง จุดรับ ข้อจำกัดพื้นที่ และเงื่อนไขบริการขนส่งที่รับสินค้านี้ได้', 'Units per receipt, receiving point, space restrictions and the conditions of a delivery service that accepts the goods.')],
            [t('ถังพลาสติก 200 ลิตร', '200 L plastic drums'), t('จำนวนถัง พาเลต อุปกรณ์ยก พื้นที่วาง และผู้รับผิดชอบลงสินค้า', 'Drum count, pallets, lifting equipment, storage area and unloading responsibility.')],
            [t('IBC 1,000 ลิตร', '1,000 L IBCs'), t('พื้นที่และน้ำหนักที่รองรับ อุปกรณ์ยก ช่องทางเคลื่อนย้าย และจุดรับถ่ายที่ประเมินแล้ว', 'Space and supported load, lifting equipment, movement route and an assessed transfer point.')],
            [t('ตู้ Tank 20,000 ลิตร', '20,000 L tank-container supply'), t('เส้นทางเข้า จุดจอด พื้นที่และความจุรับสินค้า ระบบถ่ายที่เข้ากันได้ และผู้ควบคุมการรับ', 'Access route, parking, receiving space and capacity, compatible transfer systems and the person supervising receipt.')]
          ]
        ) +
        P(t('รถตู้ทึบ 6 หรือ 10 ล้อพร้อมประตูสไลด์ด้านข้างเป็นทางเลือกที่ต้องประเมินตามงาน ไม่ได้หมายความว่าจะใช้ได้กับทุกสินค้าและทุกปลายทาง ส่วนงานตู้ Tank ให้ทีมงานประสานรูปแบบรถและระบบส่งมอบแยกต่างหาก', 'Enclosed 6- or 10-wheel trucks with side sliding doors are options assessed for the job, not a fit for every product and destination. Tank-container deliveries require separate coordination of the vehicle and delivery system.')) +
        P(A('แจ้งข้อมูลปลายทางเพื่อวางแผนขนส่ง', 'Share destination details for delivery planning', '/logistics/'))
      ],
      ['storage-and-documents', t('ตรวจความปลอดภัยและเอกสารก่อนเพิ่มปริมาณเก็บ', 'Check safety and documentation before increasing storage'),
        P(t('เอทิลแอลกอฮอล์เป็นสารไวไฟ การเลือกขนาดบรรจุต้องรวมการประเมินการจัดเก็บและการเคลื่อนย้ายของสินค้าจริง ขอ SDS ที่ตรงรายการสินค้าให้ผู้รับผิดชอบตรวจเงื่อนไขที่เกี่ยวข้อง ก่อนยืนยันว่าพื้นที่และอุปกรณ์พร้อมรองรับ', 'Ethyl alcohol is flammable. Packaging selection must include an assessment of storage and handling for the actual product. Obtain the matching SDS for the responsible person to review before confirming that the space and equipment are suitable.')) +
        P(t('แนวทาง HSE แยกการจัดเก็บของเหลวไวไฟในภาชนะออกจากการใช้และจัดการ เพื่อประเมินความเสี่ยงของงานแต่ละส่วน จึงไม่ควรเพิ่มจำนวนถังเพียงเพราะมีพื้นที่ว่าง แหล่งข้อมูลเหล่านี้เป็นหลักการทางเทคนิค ไม่ใช่การยืนยันข้อกฎหมายไทยหรือการอนุมัติสถานที่ใด', 'HSE guidance treats container storage separately from the use and handling of flammable liquids so the risks of each activity can be assessed. Spare floor space alone is therefore not a basis for adding more drums. These sources provide technical principles, not confirmation of Thai legal requirements or approval of a site.')) +
        UL([
          t('ตกลงข้อกำหนดสินค้าและการตรวจรับ พร้อมตรวจฉลาก ซีล สภาพภาชนะ และเลขล็อตเมื่อรับสินค้า', 'Agree product and acceptance requirements, then check the label, seal, container condition and batch identification on receipt.'),
          t('ขอ SPEC, COA ของล็อต และ SDS ที่ตรงรายการ รวมถึงเอกสารรับรองที่งานกำหนดตามขอบเขตและอายุเอกสาร', 'Request the matching specification, batch COA and SDS, plus any required certificates with the relevant scope and validity.'),
          t('ยืนยันเงื่อนไขเก็บ เคลื่อนย้าย และส่งคืนภาชนะเมื่อมีข้อตกลง ไม่ใช้ภาชนะเดิมซ้ำโดยสรุปจากรูปลักษณ์อย่างเดียว', 'Confirm storage, handling and any agreed container-return conditions. Do not assume a container can be reused from its appearance alone.')
        ]) +
        P(t('เอกสารฉบับจริงของ Etohcols ต้องขอจากทีมงานเพื่อจับคู่กับสินค้าและล็อตที่เสนอ ไม่เปิดดาวน์โหลดใบรับรองต้นฉบับบนหน้าเว็บ', 'Actual Etohcols documents must be requested from the team so they can be matched to the offered product and batch. Original certificates are not available as public website downloads.')) +
        P(A('ดูความหมายของเอกสารและขอจากทีมงาน', 'Understand the documents and request them from the team', '/quality/'))
      ],
      ['practical-choice', t('ตัวอย่างการเลือก และข้อมูลที่ส่งให้ทีมงาน', 'A practical comparison and the information to send'),
        P(t('ตัวอย่าง: โรงงานใช้วัตถุดิบสเปกเดียวกัน 200 ลิตรต่อสัปดาห์ และกำลังเทียบการรับถัง 200 ลิตรทุกสัปดาห์กับ IBC ที่บรรจุสุทธิ 1,000 ลิตร การรับ IBC จะครอบคลุมการใช้ประมาณ 5 สัปดาห์เมื่ออัตราการใช้คงที่ แต่ต้องตรวจน้ำหนักรับเข้า ระบบถ่าย พื้นที่ และเงินทุนเพิ่มก่อนตัดสินใจ', 'Example: a factory uses 200 L per week of the same specified material and is comparing weekly 200 L drums with an IBC filled to a net 1,000 L. The IBC covers about 5 weeks at steady consumption, but receiving loads, transfer systems, space and additional cash must be assessed before deciding.')) +
        P(t('หากรองรับ IBC ไม่ได้ ไม่จำเป็นต้องเปลี่ยนรูปแบบทันที อาจขอเทียบรอบส่งถัง 200 ลิตร หรือประเมินบริการเก็บและทยอยส่งภายใต้เงื่อนไขที่ตกลง ตัวอย่างนี้เปรียบเทียบปริมาณและรอบใช้เท่านั้น ไม่ได้ยืนยันราคา ความจุจัดเก็บ หรือกำหนดส่งของธุรกิจใด', 'If the site cannot receive an IBC, there is no need to change formats immediately. Compare 200 L drum delivery cycles or assess storage with staged dispatch under agreed terms. This example compares quantity and usage cycles only; it does not confirm pricing, storage capacity or a delivery schedule for any business.')) +
        UL([
          t('ระบุสินค้า ชนิด ความเข้มข้น และขนาดที่กำลังพิจารณา', 'Specify the product, ethanol type, concentration and pack sizes under consideration.'),
          t('แจ้งปริมาณใช้ต่อเดือน ปริมาณต่อครั้ง และจำนวนจุดรับสินค้า', 'Provide monthly consumption, quantity per receipt and the number of delivery points.'),
          t('แจ้งพื้นที่ อุปกรณ์รับสินค้า จังหวัด รหัสไปรษณีย์ และช่วงเวลาที่ต้องการ', 'Describe the space, receiving equipment, province, postcode and requested timing.'),
          t('ระบุเอกสาร เงื่อนไขคืนภาชนะ และบริการเก็บหรือทยอยส่งที่ต้องการให้ประเมิน', 'State document requirements, container-return conditions and any storage or staged-delivery service to assess.')
        ]) +
        P(t('ทีมงานจะประเมินสินค้า บรรจุภัณฑ์ และการส่งมอบร่วมกันก่อนจัดข้อเสนอ พร้อมยืนยันขนาด จำนวน และเงื่อนไขจัดส่ง การขอราคาไม่ใช่การจองสินค้าหรือยืนยันคำสั่งซื้อ', 'The team assesses the product, packaging and delivery together before preparing an offer, confirming the size, quantity and delivery terms. A quotation request does not reserve stock or confirm an order.')) +
        P(A('ขอคำแนะนำขนาดบรรจุและการส่งมอบ', 'Request packaging and delivery advice', '/quote/?intent=advice')) +
        P(A('เทียบต้นทุนรวมก่อนเลือกขนาด', 'Compare delivered costs before choosing a pack size', '/ethanol-total-delivered-cost/')) +
        P(A('ประเมินบริการเก็บสินค้าและทยอยส่ง', 'Assess storage and staged delivery', '/stock-management/'))
      ]
    ]
  }
];
