const services=[
  {
    label:'OEM',
    title:'OEM สำหรับแบรนด์ของคุณ',
    description:'บริการ OEM สำหรับสูตรที่ใช้เอทิลแอลกอฮอล์แปลงสภาพเท่านั้น ครอบคลุมการหารือสูตรและสเปก การแบ่งบรรจุ ออกแบบฉลาก และติดแบรนด์ลูกค้า โดยประเมินปริมาณขั้นต่ำ เอกสาร และความพร้อมเป็นรายโครงการ',
    cta:'หารืองาน OEM',
    href:'/muku/contact/?intent=oem'
  },
  {
    label:'STORAGE',
    title:'ฝากเก็บและทยอยรับสินค้า',
    description:'รับฝากเก็บสินค้า พร้อมทยอยเบิกหรือจัดส่งตามรอบที่ตกลง โดยกำหนดรายการ ปริมาณ วิธีรับเข้า และปลายทางร่วมกันก่อนเริ่มบริการ',
    cta:'หารือการฝากเก็บและจัดส่ง',
    href:'/muku/contact/?intent=stock&amp;service=storage'
  },
  {
    label:'REPLENISHMENT',
    title:'วางแผนสต็อกและเติมสินค้า',
    description:'ช่วยวางแผนจากปริมาณใช้และรอบจัดซื้อ ติดตามยอดคงเหลือตามข้อมูลและวิธีที่ตกลงร่วมกัน แล้วประสานแผนเติมสินค้าให้สอดคล้องกับการใช้งาน',
    cta:'ปรึกษาแผนสต็อก',
    href:'/muku/contact/?intent=stock&amp;service=planning'
  }
];

export function mukuServicesSection(){
  return `<section class="section muku-services-v27" id="muku-services" aria-labelledby="muku-services-title"><div class="wrap">
    <div class="section-head"><div><div class="eyebrow">MUKU BUSINESS SUPPORT</div><h2 id="muku-services-title">บริการเสริม<br>สำหรับแผนธุรกิจของคุณ</h2></div><p>จากผลิตภัณฑ์ภายใต้แบรนด์คุณ<br>ถึงการจัดการสต็อกและรอบส่งมอบ</p></div>
    <div class="application-grid">${services.map(service=>`<article class="application-card"><div class="eyebrow">${service.label}</div><h3>${service.title}</h3><p>${service.description}</p><a class="text-link" href="${service.href}">${service.cta}</a></article>`).join('')}</div>
    <p class="muku-services-terms">ขอบเขตบริการ รายการสินค้า ขนาดบรรจุ ปริมาณ รอบรับและส่ง วิธีติดตามยอด ค่าใช้จ่าย และความรับผิดชอบ ตกลงเป็นรายโครงการก่อนเริ่มงาน</p>
  </div></section>`;
}
