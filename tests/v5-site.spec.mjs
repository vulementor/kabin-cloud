import {test,expect} from "@playwright/test";
const base=process.env.QA_BASE_URL || "http://127.0.0.1:8765/";
const routes=["","platform/","solutions/","marketplace/","builders/","providers/","developers/","company/"];
const navEn=["Platform","Solutions","Marketplace","Builders","Developers","Company"];
const navVi=["Nền tảng","Giải pháp","Marketplace","Builder","Nhà phát triển","Công ty"];
test.describe("Kabin V5 experience",()=>{
 test("all 16 routes, bilingual header and counterpart",async({page})=>{
  for(const lang of ["en","vi"])for(const route of routes){
   const target="v5/"+(lang==="vi"?"vi/":"")+route;
   const res=await page.goto(base+target,{waitUntil:"domcontentloaded"});
   expect(res?.status(),target).toBe(200);
   await expect(page.locator("html")).toHaveAttribute("lang",lang);
   await expect(page.locator("h1")).toBeVisible();
   const nav=page.locator(".nav a");await expect(nav).toHaveCount(6);
   expect(await nav.allTextContents()).toEqual(lang==="vi"?navVi:navEn);
   const counterpart=await page.locator(".lang-switch a[lang="+(lang==="vi"?"en":"vi")+"]").getAttribute("href");
   const expected="/v5/"+(lang==="vi"?"":"vi/")+route;
   expect(new URL(counterpart,page.url()).pathname,target).toBe(expected);
  }
 });
 test("marketplace browsing is interactive, not backend stock",async({page})=>{
  await page.goto(base+"v5/vi/marketplace/");
  await expect(page.locator(".market-tile:visible")).toHaveCount(6);
  await page.locator('button[data-category="creative"]').click();
  await expect(page.locator(".market-tile:visible")).toHaveCount(1);
  await page.locator('button[data-category="all"]').click();
  await page.locator("#market-query").fill("browser");
  await expect(page.locator(".market-tile:visible")).toHaveCount(1);
  await page.locator("#market-clear").click();
  await expect(page.locator(".market-tile:visible")).toHaveCount(6);
 });
 test("solutions change recipe diagrams",async({page})=>{
  await page.goto(base+"v5/solutions/");
  await page.locator('button[data-solution="research"]').click();
  await expect(page.locator("#solution-task")).toContainText("market brief");
  await expect(page.locator("#solution-capacities .solution-cap")).toHaveCount(3);
  await page.locator('button[data-solution="browser"]').click();
  await expect(page.locator("#solution-outcome")).toContainText("UNKNOWN");
 });
 test("homepage demonstration stays clearly a preview",async({page})=>{
  await page.goto(base+"v5/vi/");
  await page.locator('[data-preset="research"]').click();
  await page.locator("#ask-run").click();
  await expect(page.locator("#ask-result")).toBeVisible();
  await expect(page.locator("#ask-result .preview-steps span")).toHaveCount(4);
  await expect(page.locator("#ask-result")).toContainText("minh họa");
 });
 test("Provider proposal uses real mailto without fake backend",async({page})=>{
  await page.goto(base+"v5/vi/providers/");
  await expect(page.locator("#provider-form")).toBeVisible();
  await expect(page.locator("#provider-form input[name=url]")).toHaveAttribute("type","url");
  await expect(page.locator("#provider-form input[name=name]")).toHaveAttribute("required","");
 });
 for(const width of [1440,768,390,320]){
  test("responsive "+width+"px has no horizontal overflow and navigation works",async({page},info)=>{
   await page.setViewportSize({width,height:860});
   for(const route of ["v5/","v5/vi/solutions/","v5/vi/marketplace/","v5/vi/providers/"]){
    await page.goto(base+route,{waitUntil:"domcontentloaded"});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow,route+" at "+width).toBeLessThanOrEqual(2);
    if(width<960){const menu=page.locator(".hamburger");await expect(menu).toBeVisible();await menu.click();await expect(page.locator(".mobile-nav a")).toHaveCount(7);await expect(menu).toHaveAttribute("aria-expanded","true");await menu.click()}
    if(width===390)await page.screenshot({path:info.outputPath("kabin-v5-"+route.replaceAll("/","-")+".png"),fullPage:true,animations:"disabled"});
   }
  });
 }
});


test.describe("V5.1 distinct hero art direction",()=>{
 const inner=["platform","solutions","marketplace","builders","providers","developers","company"];
 for(const lang of ["en","vi"]){
  test("Seven differentiated "+lang+" hero illustrations",async({page},info)=>{
   await page.setViewportSize({width:1440,height:900});
   for(const slug of inner){
    const location=base+"v5/"+(lang==="vi"?"vi/":"")+slug+"/";
    const res=await page.goto(location,{waitUntil:"domcontentloaded"});
    expect(res?.status()).toBe(200);
    const hero=page.locator(".hero");
    await expect(hero).toHaveClass(new RegExp("hero-variant-"+slug));
    await expect(page.locator(".hv-"+slug)).toBeVisible();
    await expect(page.locator(".engine-visual")).toHaveCount(0);
    const bounds=await page.evaluate(()=>{
     const text=document.querySelector(".hero-copy").getBoundingClientRect();
     const art=document.querySelector(".hero .hv").getBoundingClientRect();
     return {gap:art.left-text.right,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,artHeight:art.height};
    });
    expect(bounds.gap,lang+"/"+slug+" copy must not overlap hero art").toBeGreaterThanOrEqual(-1);
    expect(bounds.overflow,lang+"/"+slug+" overflow").toBeLessThanOrEqual(2);
    expect(bounds.artHeight).toBeGreaterThan(250);
    await page.screenshot({path:info.outputPath("hero-"+lang+"-"+slug+"-desktop.png"),animations:"disabled"});
   }
  });
  test("Seven differentiated "+lang+" mobile hero layouts",async({page},info)=>{
   await page.setViewportSize({width:390,height:844});
   for(const slug of inner){
    const location=base+"v5/"+(lang==="vi"?"vi/":"")+slug+"/";
    const res=await page.goto(location,{waitUntil:"domcontentloaded"});
    expect(res?.status()).toBe(200);
    await expect(page.locator(".hv-"+slug)).toBeVisible();
    const bounds=await page.evaluate(()=>{
      const text=document.querySelector(".hero-copy").getBoundingClientRect();
      const art=document.querySelector(".hero .hv").getBoundingClientRect();
      return {verticalGap:art.top-text.bottom,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
    });
    expect(bounds.verticalGap,lang+"/"+slug+" hero must stack copy before art").toBeGreaterThanOrEqual(-1);
    expect(bounds.overflow,lang+"/"+slug+" mobile overflow").toBeLessThanOrEqual(2);
    await page.screenshot({path:info.outputPath("hero-"+lang+"-"+slug+"-mobile.png"),animations:"disabled"});
   }
  });
 }
 test("Homepage retains the sole Kabin Core orbital hero",async({page})=>{
  await page.goto(base+"v5/vi/");
  await expect(page.locator(".homehero .engine-visual")).toBeVisible();
  await expect(page.locator(".homehero .hv")).toHaveCount(0);
 });
});
