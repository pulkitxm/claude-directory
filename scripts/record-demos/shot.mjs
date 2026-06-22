import { chromium } from 'playwright';
const [url,out,dark]=process.argv.slice(2);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto(url,{waitUntil:'networkidle',timeout:30000});
if(dark==='dark')await p.evaluate(()=>document.documentElement.classList.add('dark'));
// slow scroll so IntersectionObserver fires for every reveal
await p.evaluate(async()=>{
  const step=window.innerHeight*0.6;
  for(let y=0;y<document.body.scrollHeight;y+=step){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,180));}
  await new Promise(r=>setTimeout(r,300));
});
await p.waitForTimeout(400);
await p.screenshot({path:out,fullPage:true});
await b.close();console.log('shot',out);
