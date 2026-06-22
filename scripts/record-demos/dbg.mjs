import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:8799/index.html',{waitUntil:'networkidle'});
await p.evaluate(async()=>{const d=document.body.scrollHeight;for(let y=0;y<d;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}window.scrollTo(0,0);});
await p.waitForTimeout(800);
const data=await p.$$eval('.section .reveal, .reveal', els=>els.slice(0,40).map(e=>({c:e.className.split(' ').slice(-1)[0],op:getComputedStyle(e).opacity})));
const hidden=data.filter(d=>d.op!=='1');
console.log('hidden after scroll:',hidden.length, JSON.stringify(hidden.slice(0,8)));
await b.close();
