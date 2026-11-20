const quoteURL='/quote/?intent=stock';
const button=(label,href=quoteURL,outline=false)=>`<a class="s27-button${outline?' s27-outline':''}" href="${href}">${label}</a>`;
const kicker=text=>`<p class="s27-kicker">${text}</p>`;

export function stockHomeSection(){
  return `<section class="s27-home" aria-labelledby="s27-home-title"><div class="s27-wrap s27-home-band"><div class="s27-home-intro">${kicker('ETOHCOLS & MUKU · STOCK SUPPORT')}<h2 id="s27-home-title">บริหารสต็อกและรอบส่งสินค้า</h2><p>บริการสนับสนุนสำหรับสินค้ากลุ่ม Etohcols และ MUKU วางแผนตามรายการสินค้า ปริมาณ และการใช้งานจริง</p></div><div class="s27-home-options"><div><p><strong>ฝากเก็บและทยอยจัดส่ง</strong><span>ดูแลสินค้าของลูกค้าและเบิกส่งตามรอบที่ตกลง</span></p></div><div><p><strong>วางแผนและติดตามสต็อก</strong><span>ทบทวนยอดคงเหลือและประสานเติมสินค้าตามรอบ</span></p></div><a class="s27-text-link" href="/stock-management/">ดูบริการบริหารสต็อก</a></div></div></section>`;
}

const models=[
  {tag:'STORAGE & SCHEDULED RELEASE',title:'ฝากเก็บสินค้า แล้วทยอยเบิกส่ง',lead:'สำหรับลูกค้าที่ต้องการวางแผนรับและเก็บสินค้า พร้อมทยอยส่งออกตามการใช้งานหรือจุดส่งที่กำหนด',items:['ตรวจรับและบันทึกรายการ จำนวน และข้อมูลล็อตที่เกี่ยวข้องตามขอบเขตที่ตกลง','กำหนดระยะเวลาเก็บ รอบเบิก และผู้มีสิทธิอนุมัติการปล่อยสินค้า','ประสานจัดส่งตามคำสั่งเบิก พร้อมทบทวนยอดเข้า ออก และคงเหลือ'],note:'ประเมินการรับฝากตามชนิดสินค้า ปริมาณ ระยะเวลา และข้อกำหนดการจัดเก็บก่อนยืนยันบริการ'},
  {tag:'STOCK PLANNING & REPLENISHMENT',title:'วางแผนสต็อก และรอบเติมสินค้า',lead:'สำหรับธุรกิจที่ต้องการใช้ข้อมูลยอดคงเหลือและปริมาณใช้ มาช่วยวางแผนจัดซื้อและเติมสินค้าอย่างต่อเนื่อง',items:['ทบทวนยอดตั้งต้น ปริมาณใช้ และรายการที่ต้องติดตามร่วมกัน','ตกลงรูปแบบและความถี่รายงานยอด รวมถึงเกณฑ์ที่ใช้พิจารณาเติมสินค้า','เสนอรอบและปริมาณเติมให้ผู้รับผิดชอบยืนยัน พร้อมประสานราคา ความพร้อม และแผนส่ง'],note:'การเติมสินค้าเป็นไปตามขั้นตอนอนุมัติและเงื่อนไขที่ตกลง โดยยืนยันคำสั่งซื้อก่อนดำเนินการ'}
];

const terms=[
  ['รายการที่รับดูแล','ระบุชนิดสินค้า สูตร เกรด ขนาดบรรจุ สภาพภาชนะ และข้อกำหนดการจัดเก็บหรือขนส่ง เพื่อประเมินว่ารายการใดอยู่ในขอบเขตบริการ'],
  ['ปริมาณและระยะเวลาเก็บ','กำหนดยอดตั้งต้น ปริมาณที่คาดว่าจะเข้าและออก ระยะเวลาเก็บ และรอบทบทวนแผนให้ตรงกับความต้องการจริง'],
  ['ข้อมูลสต็อกและกติกาเติมสินค้า','ตกลงแหล่งข้อมูล รูปแบบรายงาน ความถี่ ผู้ตรวจยืนยันยอด และเกณฑ์เสนอเติมสินค้า รวมถึงวิธีจัดการเมื่อข้อมูลไม่ตรงกัน'],
  ['เงื่อนไขรับเข้าและเบิกออก','ระบุเจ้าของสินค้า ผู้มีสิทธิอนุมัติ เอกสารรับเข้าและปล่อยสินค้า ข้อมูลล็อต และวิธีตรวจรับปลายทางให้ชัดเจน'],
  ['รอบส่งและปลายทาง','แจ้งจังหวัด จุดรับของ อุปกรณ์ยก และข้อจำกัดหน้างาน เพื่อประเมินรถ เส้นทาง ช่วงส่งมอบ และเงื่อนไขรับสินค้า'],
  ['ค่าใช้จ่ายและความรับผิดชอบ','ยืนยันขอบเขตงาน ค่าจัดเก็บหรือบริหารสต็อก ค่าดำเนินการ ค่าขนส่ง และความรับผิดชอบของแต่ละฝ่ายก่อนเริ่มบริการ']
];

const steps=[
  ['แจ้งสินค้าและแผนใช้','ส่งรายการ ขนาดบรรจุ ยอดที่ต้องการดูแล ปริมาณใช้ และปลายทางที่เกี่ยวข้อง'],
  ['ประเมินรูปแบบบริการ','เลือกรับฝากและเบิกส่ง วางแผนและเติมสต็อก หรือประสานสองส่วนตามความเหมาะสม'],
  ['ตกลงเงื่อนไขร่วมกัน','ยืนยันระยะเวลา รายงานยอด ผู้อนุมัติ รอบส่ง ค่าใช้จ่าย และรายละเอียดสินค้า'],
  ['เริ่มงานและทบทวนตามรอบ','ตรวจยอดตั้งต้น ดำเนินการตามเงื่อนไข และทบทวนข้อมูลกับแผนใช้จริง']
];

export function stockPage(){
  return `<div class="s27-page"><nav class="s27-wrap s27-breadcrumb" aria-label="เส้นทางหน้า"><a href="/">หน้าแรก</a><span aria-hidden="true">/</span><span aria-current="page">บริหารสต็อก</span></nav>
  <section class="s27-wrap s27-hero" aria-labelledby="s27-title"><div>${kicker('ETOHCOLS & MUKU · STOCK SUPPORT')}<h1 id="s27-title">บริหารสต็อกและการจัดส่ง<br><em>ให้สอดคล้องกับแผนธุรกิจ</em></h1><p class="s27-lead">รับฝากและทยอยเบิกส่ง<br>พร้อมทางเลือกวางแผนและเติมสต็อก</p><p>บริการสนับสนุนจาก Etohcols สำหรับสินค้ากลุ่ม Etohcols และ MUKU เลือกรูปแบบที่เหมาะกับธุรกิจ แล้วประเมินชนิดสินค้า ปริมาณ ข้อมูลสต็อก และเงื่อนไขส่งมอบร่วมกันก่อนเริ่มงาน</p><div class="s27-actions">${button('หารือแผนบริหารสต็อก')}${button('ดูสองรูปแบบบริการ','#stock-models',true)}</div></div><figure class="s27-hero-photo"><img src="/assets/business-v9/warehouse-studio-v7.webp" alt="พื้นที่จัดเก็บถังพลาสติกและ IBC พร้อมทางเดินสำหรับเคลื่อนย้ายสินค้า" width="1000" height="1250" fetchpriority="high" decoding="async"><figcaption>ประเมินรายการสินค้าและความต้องการ ก่อนกำหนดแผนจัดเก็บและส่งมอบ</figcaption></figure></section>

  <section class="s27-models-section" id="stock-models" aria-labelledby="s27-models-title"><div class="s27-wrap"><div class="s27-section-head"><div>${kicker('TWO WAYS TO SUPPORT YOUR STOCK')}<h2 id="s27-models-title">สองรูปแบบที่เลือกวางแผนได้</h2></div><p>เลือกรูปแบบเดียว หรือหารือการทำงานร่วมกันทั้งสองส่วน ตามลักษณะสินค้าและความต้องการของโครงการ</p></div><div class="s27-model-grid">${models.map(model=>`<article class="s27-model"><div class="s27-model-top"><p class="s27-kicker">${model.tag}</p></div><h3>${model.title}</h3><p>${model.lead}</p><ul>${model.items.map(item=>`<li>${item}</li>`).join('')}</ul><p class="s27-model-note">${model.note}</p></article>`).join('')}</div></div></section>

  <section class="s27-wrap s27-terms-section" aria-labelledby="s27-terms-title"><div class="s27-section-head"><div>${kicker('AGREE THE DETAILS FIRST')}<h2 id="s27-terms-title">ตกลงข้อมูลให้ครบ<br>ก่อนเริ่มดูแลสต็อก</h2></div><p>กำหนดรายการที่รับดูแล วิธีติดตาม และเงื่อนไขที่แต่ละฝ่ายใช้ร่วมกัน เพื่อให้การเก็บ การเบิก และการเติมสินค้ามีข้อมูลอ้างอิงชัดเจน</p></div><dl class="s27-terms">${terms.map(([title,description])=>`<div><dt>${title}</dt><dd>${description}</dd></div>`).join('')}</dl><aside class="s27-qualification"><strong>พิจารณาตามสินค้าและข้อกำหนดจริง</strong><p>เอทานอลแต่ละสูตรและผลิตภัณฑ์พร้อมใช้มีเงื่อนไขที่ต่างกัน ทีมงานจะประเมินข้อมูลสินค้า เอกสารที่เกี่ยวข้อง และความพร้อมก่อนยืนยันรับดูแล เอกสารฉบับจริงขอรับผ่านทีมงานเท่านั้น</p><a class="s27-text-link" href="/quality/">ดูประเภทเอกสารสินค้า</a></aside></section>

  <section class="s27-process" aria-labelledby="s27-process-title"><div class="s27-wrap"><div class="s27-section-head"><div>${kicker('FROM STOCK BRIEF TO DELIVERY PLAN')}<h2 id="s27-process-title">เริ่มจากข้อมูลที่ธุรกิจมีอยู่</h2></div><p>ใช้รายการสินค้าและแผนใช้งานเป็นจุดตั้งต้น แล้วร่วมกันกำหนดบริการและขั้นตอนที่ทำได้จริง</p></div><ol class="s27-steps">${steps.map(([title,description],i)=>`<li><span aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol></div></section>

  <section class="s27-wrap s27-start" aria-labelledby="s27-start-title"><div>${kicker('PLAN YOUR STOCK WITH ETOHCOLS')}<h2 id="s27-start-title">บอกสิ่งที่ต้องการให้เราดูแล</h2><p>แจ้งสินค้า ปริมาณโดยประมาณ และรูปแบบบริการที่สนใจ พร้อมรอบใช้หรือรอบส่งที่ต้องการ เพื่อให้ทีมประเมินขอบเขตและจัดเตรียมข้อเสนอเป็นรายโครงการ</p><div class="s27-actions">${button('ส่งข้อมูลประเมินบริการสต็อก')}${button('ดูแนวทางการจัดส่ง','/logistics/',true)}</div><p class="s27-note">เข้าสู่หน้าจัดเตรียมคำขอ เพื่อเพิ่มรายละเอียดและตรวจสอบก่อนติดต่อทีมงาน</p></div><div class="s27-brief"><h3>ข้อมูลที่ช่วยให้เริ่มคุยได้ชัด</h3><ul><li>สินค้าในกลุ่ม Etohcols หรือ MUKU และขนาดบรรจุ</li><li>ยอดสินค้า ระยะเวลาที่ต้องการดูแล และปริมาณใช้ต่อรอบ</li><li>ข้อมูลยอดคงเหลือที่มี และผู้ประสานงานของลูกค้า</li><li>จังหวัดปลายทาง รอบเบิกหรือเติม และเงื่อนไขรับของ</li></ul><p>ขอบเขตบริการและค่าใช้จ่ายยืนยันหลังประเมินข้อมูลร่วมกัน</p></div></section>
  </div>`;
}
