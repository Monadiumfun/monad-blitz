import { chromium } from 'playwright'
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:780},deviceScaleFactor:2})
await p.goto('http://localhost:5185/',{waitUntil:'networkidle',timeout:30000}); await p.waitForTimeout(1500)
await p.screenshot({path:'/tmp/full1.png'})
