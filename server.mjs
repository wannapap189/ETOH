import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPage} from './etoh.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
const types={'.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8','.pdf':'application/pdf'};
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const pathname=decodeURIComponent(url.pathname);
    res.setHeader('X-Robots-Tag','noindex, nofollow');
    res.setHeader('Cache-Control','no-store');
    if(pathname==='/robots.txt'){res.writeHead(200,{'Content-Type':'text/plain'});return res.end('User-agent: *\nDisallow: /\n');}
    if(pathname==='/favicon.ico'){res.writeHead(204);return res.end();}
    if(pathname.startsWith('/assets/')||pathname==='/style.css'||pathname==='/app.js'){
      const file=path.resolve(dist,'.'+pathname);
      if(!file.startsWith(dist+path.sep)){res.writeHead(403);return res.end();}
      if(file.startsWith(path.join(dist,'assets','documents')+path.sep)){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('กรุณาติดต่อทีมงานเพื่อขอเอกสาร');}
      const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});return res.end(data);
    }
    if(/^\/(?:en\/)?(?:seo(?:-audit|\/|$)|seo-inventory\.csv|content(?:\/|$)|scripts(?:\/|$)|locales(?:\/|$))/.test(pathname)){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
    const result=await renderPage(pathname.endsWith('/')?pathname:pathname+'/');
    res.writeHead(result.status||200,{'Content-Type':'text/html; charset=utf-8',...(result.redirect?{Location:result.redirect}:{})});res.end(result.html);
  }catch(e){res.writeHead(e.code==='ENOENT'?404:500,{'Content-Type':'text/plain; charset=utf-8'});res.end(e.code==='ENOENT'?'ไม่พบไฟล์':'เกิดข้อผิดพลาดในตัวอย่างเว็บไซต์');console.error(e.message);}
});
const port=Number(process.env.PORT||4186);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Invalid PORT');
server.listen(port,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:'+port));
