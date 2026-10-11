import {test,expect} from "@playwright/test";
const ROOT=process.env.QA_BASE_URL||"http://127.0.0.1:8765/";
const ROUTES=["","platform/","solutions/","marketplace/","builders/","providers/","developers/","company/"];
const NAV={en:["Platform","Solutions","Marketplace","Builders","Developers","Company"],vi:["Nền tảng","Giải pháp","Marketplace","Builder","Nhà phát triển","Công ty"]};
const DEST=["platform","solutions","marketplace","builders","developers","company"];
test.describe("Kabin V5 root release",()=>{
 test.use({viewport:{width:1440,height:900}});
 for(const lang of ["en","vi"])test("main site "+lang+" pages and locale navigation",async({page})=>{
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  for(const route of ROUTES){
   const full=ROOT+(lang==="vi"?"vi/":"")+route,res=await page.goto(full,{waitUntil:"domcontentloaded"});
   expect(res?.status(),full).toBe(200);
   await expect(page.locator("html")).toHaveAttribute("lang",lang);
   await expect(page.locator("h1")).toBeVisible();
   expect(await page.locator(".nav a").allTextContents()).toEqual(NAV[lang]);
   for(let i=0;i<DEST.length;i++){
    const href=await page.locator(".nav a").nth(i).getAttribute("href");
    expect(new URL(href,page.url()).pathname).toBe("/"+(lang==="vi"?"vi/":"")+DEST[i]+"/");
   }
   const other=lang==="vi"?"en":"vi",href=await page.locator(".lang-switch a[lang="+other+"]").getAttribute("href");
   expect(new URL(href,page.url()).pathname).toBe("/"+(lang==="vi"?"":"vi/")+route);
   const name=route.replace(/\/$/,"");
   if(name){await expect(page.locator(".hv-"+name)).toBeVisible();await expect(page.locator(".engine-visual")).toHaveCount(0)}
   else await expect(page.locator(".homehero .engine-visual")).toBeVisible();
  }
  expect(errors).toEqual([]);
 });
 test("Marketplace supports filtering and searching",async({page})=>{
  await page.goto(ROOT+"vi/marketplace/");
  await expect(page.locator(".market-tile:visible")).toHaveCount(6);
  await page.locator('button[data-category="creative"]').click();
  await expect(page.locator(".market-tile:visible")).toHaveCount(1);
  await page.locator('button[data-category="all"]').click();
  await page.locator("#market-query").fill("browser");
  await expect(page.locator(".market-tile:visible")).toHaveCount(1);
  await page.locator("#market-clear").click();
  await expect(page.locator(".market-tile:visible")).toHaveCount(6);
 });
 test("Solutions and input demo remain interactive and honestly labeled",async({page})=>{
  await page.goto(ROOT+"solutions/");
  await page.locator('[data-solution="research"]').click();
  await expect(page.locator("#solution-task")).toContainText("market brief");
  await page.goto(ROOT+"vi/");
  await page.locator('[data-preset="research"]').click();
  await page.locator("#ask-run").click();
  await expect(page.locator("#ask-result .preview-steps span")).toHaveCount(4);
  await expect(page.locator("#ask-result")).toContainText("minh họa");
 });
 test("Provider form and legacy URLs",async({page})=>{
  await page.goto(ROOT+"vi/providers/");
  await expect(page.locator("#provider-form")).toBeVisible();
  await expect(page.locator('#provider-form input[name="url"]')).toHaveAttribute("type","url");
  for(const old of ["vi/marketplace/agents/","solutions/media-production/","vi/developers/manifest/","vi/legal/privacy/"]){
   const res=await page.goto(ROOT+old);expect(res?.status(),old).toBe(200);
   await expect(page.locator("h1")).toBeVisible();
  }
  for(const [alias,dest] of [["build-solutions/","builders/"],["provide-capacity/","providers/"],["vi/use-kabin/","vi/#demo"]]){
   await page.goto(ROOT+alias,{waitUntil:"domcontentloaded"});
   await expect(page).toHaveURL(ROOT+dest);
  }
 });
 for(const width of [1440,768,390,320])test("mobile and desktop responsive "+width,async({page},info)=>{
  await page.setViewportSize({width,height:840});
  for(const route of ["","vi/solutions/","vi/marketplace/","vi/providers/","vi/company/"]){
   await page.goto(ROOT+route);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   expect(overflow,route+" width "+width).toBeLessThanOrEqual(2);
   if(width<960){
    const b=page.locator(".hamburger");await expect(b).toBeVisible();await b.click();
    await expect(b).toHaveAttribute("aria-expanded","true");
    await expect(page.locator(".mobile-nav a")).toHaveCount(7);
    await b.click();await expect(b).toHaveAttribute("aria-expanded","false");
   }
   if(width===390)await page.screenshot({path:info.outputPath("root-"+(route.replaceAll("/","-")||"home")+".png"),fullPage:true,animations:"disabled"});
  }
 });
});
