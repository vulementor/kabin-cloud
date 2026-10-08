import {test,expect} from "@playwright/test";
const ROOT=process.env.QA_BASE_URL || "http://127.0.0.1:8765/";
const TITLES={en:["Platform","Solutions","Marketplace","Developers","Resources","Company"],vi:["Nền tảng","Giải pháp","Marketplace","Nhà phát triển","Tài nguyên","Công ty"]};
const TOP=["platform","solutions","marketplace","developers","resources","company"];
const CHOICES=["use-kabin","build-solutions","provide-capacity"];
const CHECK_ROUTES=["","platform/","solutions/","marketplace/","developers/","build-solutions/","provide-capacity/","resources/","company/","solutions/marketing/","marketplace/agents/","developers/manifest/","platform/governance/"];
const makeUrl=(route,lang)=>ROOT+(lang==="vi"?"vi/":"")+route;
const checkNav=async(page,lang)=>{
 for(const selector of [".desktop-nav a",".mobile-nav a"]){
  const nav=page.locator(selector);await expect(nav).toHaveCount(6);
  expect(await nav.allTextContents()).toEqual(TITLES[lang]);
  for(let i=0;i<TOP.length;i++){
   const href=await nav.nth(i).getAttribute("href");
   expect(new URL(href,page.url()).pathname).toBe("/"+(lang==="vi"?"vi/":"")+TOP[i]+"/");
  }
 }
};
test.describe("Content-led website release",()=>{
 test.use({viewport:{width:1440,height:900}});
 for(const lang of ["en","vi"]){
  test("six-item global header across "+lang+" representative routes",async({page})=>{
   for(const route of CHECK_ROUTES){
    const res=await page.goto(makeUrl(route,lang),{waitUntil:"domcontentloaded"});
    expect(res?.status(),lang+" "+route).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang",lang);
    await checkNav(page,lang);
    await expect(page.locator("h1").first()).toBeVisible();
   }
  });
 }
 test("Marketplace is a functional category shop, not a fabricated provider store",async({page})=>{
  await page.goto(ROOT+"vi/marketplace/");
  await expect(page.locator(".cl-capacity")).toHaveCount(6);
  await page.locator('button[data-filter="creative"]').click();
  await expect(page.locator(".cl-capacity:visible")).toHaveCount(1);
  await page.locator('button[data-filter="all"]').click();
  await page.locator("#capacity-search").fill("browser");
  await expect(page.locator(".cl-capacity:visible")).toHaveCount(1);
  await page.locator("#capacity-search").fill("");
  await expect(page.locator(".cl-capacity:visible")).toHaveCount(6);
  const providerLinks=await page.locator(".cl-next-list a").evaluateAll(anchors=>anchors.map(a=>new URL(a.href).pathname));
  expect(providerLinks).toContain("/vi/provide-capacity/");
 });
 test("Three role entry points work and preserve locale",async({page})=>{
  for(const role of CHOICES){
   await page.goto(makeUrl(role,"vi"));
   await expect(page.locator(".cl-main-steps .cl-step")).toHaveCount(4);
   const href=await page.locator(".language-switch a[lang=en]").getAttribute("href");
   expect(new URL(href,page.url()).pathname).toBe("/"+role+"/");
  }
 });
 test("Desktop screenshots for review",async({page},info)=>{
  for(const route of ["","solutions/","marketplace/","developers/","build-solutions/","provide-capacity/"]){
   await page.goto(ROOT+"vi/"+route);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   expect(overflow,route+" overflow").toBeLessThanOrEqual(2);
   await page.screenshot({path:info.outputPath("desktop-"+(route.replaceAll("/","-")||"home")+".png"),fullPage:true,animations:"disabled"});
  }
 });
});
test.describe("Mobile navigation and layout",()=>{
 test.use({viewport:{width:390,height:844},isMobile:true});
 for(const route of ["","solutions/","marketplace/","developers/","provide-capacity/","solutions/media-production/","marketplace/creative/","company/"]){
  test("mobile "+(route||"home"),async({page},info)=>{
   const response=await page.goto(ROOT+"vi/"+route);
   expect(response?.status()).toBe(200);
   const toggle=page.locator(".menu-toggle"),nav=page.locator("#mobile-menu");
   await expect(toggle).toBeVisible();
   await toggle.click();
   await expect(toggle).toHaveAttribute("aria-expanded","true");
   await expect(nav.locator("a")).toHaveCount(6);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   expect(overflow,route+" horizontal overflow").toBeLessThanOrEqual(2);
   await page.screenshot({path:info.outputPath("mobile-"+(route.replaceAll("/","-")||"home")+".png"),fullPage:true,animations:"disabled"});
   await nav.locator("a").first().click();
   await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded","false");
  });
 }
 test("tight 320px Marketplace and Provider do not overflow",async({page})=>{
  await page.setViewportSize({width:320,height:720});
  for(const route of ["vi/marketplace/","vi/provide-capacity/","vi/solutions/"]){
   await page.goto(ROOT+route);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   expect(overflow,route+" 320px overflow").toBeLessThanOrEqual(2);
  }
 });
});
