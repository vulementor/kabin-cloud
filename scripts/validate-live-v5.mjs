import fs from "node:fs";
import path from "node:path";
const HOST="https://kabin.cloud/";
const ROUTES=["","platform/","solutions/","marketplace/","builders/","providers/","developers/","company/"];
const failures=[],exists=x=>fs.existsSync(x);
const canonicals=new Set();
for(const route of ROUTES)for(const lang of ["en","vi"]){
 const prefix=lang==="vi"?"vi/":"",p=prefix+route+"index.html",expected=HOST+prefix+route;
 if(!exists(p)){failures.push("Missing "+p);continue}
 const html=fs.readFileSync(p,"utf8");
 for(const value of ['<html lang="'+lang+'">','data-page="'+(route.replace(/\/$/,"")||"home")+'"','id="header"','id="footer"','id="main"','<h1','<link rel="canonical" href="'+expected+'"','hreflang="en" href="'+HOST+route+'"','hreflang="vi" href="'+HOST+"vi/"+route+'"']){
  if(!html.includes(value))failures.push(p+" missing "+value);
 }
 if(html.includes('name="robots" content="noindex'))failures.push(p+" production is noindex");
 if(html.includes("https://vulementor.github.io/kabin-cloud/v5/"))failures.push(p+" preview canonical");
 canonicals.add(expected);
 const home=route==="";const heroId=route.replace(/\/$/,"");
 if(home&&!html.includes('class="engine-visual"'))failures.push(p+" missing approved homepage identity");
 if(!home&&(!html.includes('hero-variant-'+heroId)||!html.includes('class="hv hv-'+heroId+'"')||html.includes('class="engine-visual"')))failures.push(p+" incorrect unique hero");
 const folder=path.posix.dirname(p);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(href)||href.startsWith("#"))continue;
  const clean=href.split("#")[0].split("?")[0];
  if(!clean)continue;
  if(clean.startsWith("/")){failures.push(p+" unexpected absolute local URL "+clean);continue}
  const absolute=path.posix.normalize(path.posix.join(folder,clean));
  const dest=clean.endsWith("/")?path.posix.join(absolute,"index.html"):absolute;
  if(!exists(dest))failures.push(p+" broken "+href+" -> "+dest);
 }
 const slug=route.replace(/\/$/,"")||"home",doc="docs/content/"+slug+"."+lang+".md";
 if(!exists(doc))failures.push(p+" missing editorial source "+doc);
 else if(!fs.readFileSync(doc,"utf8").includes("status: public-website"))failures.push(doc+" stale status");
}
for(const route of ["use-kabin","build-solutions","provide-capacity"])for(const lang of ["en","vi"]){
 const pre=lang==="vi"?"vi/":"",p=pre+route+"/index.html";
 if(!exists(p))failures.push("Missing legacy entry "+p);
 else {
  const s=fs.readFileSync(p,"utf8");
  const destination=route==="use-kabin"?"../#demo":route==="build-solutions"?"../builders/":"../providers/";
  if(!s.includes('http-equiv="refresh" content="0;url='+destination+'"'))failures.push(p+" unsafe legacy link");
  if(!s.includes('name="robots" content="noindex,follow"'))failures.push(p+" should not be indexed");
 }
}
if(!exists("CNAME")||fs.readFileSync("CNAME","utf8").trim()!=="kabin.cloud")failures.push("CNAME must stay kabin.cloud");
const sitemap=fs.readFileSync("sitemap.xml","utf8");
for(const url of canonicals)if(!sitemap.includes("<loc>"+url+"</loc>"))failures.push("Sitemap missing "+url);
if(sitemap.includes("vulementor.github.io/kabin-cloud"))failures.push("Sitemap still uses GitHub preview hostname");
if(!fs.readFileSync("robots.txt","utf8").includes("https://kabin.cloud/sitemap.xml"))failures.push("robots sitemap wrong domain");
const js=fs.readFileSync("assets/v5.js","utf8"),css=fs.readFileSync("assets/v5.css","utf8");
for(const marker of ["mobile-nav","lang-switch","market-query","solution-task","provider-form","ask-run"])if(!js.includes(marker))failures.push("Missing interactive script feature "+marker);
if(!css.includes("hero-variant-company")||!css.includes("prefers-reduced-motion"))failures.push("Missing responsive hero/motion design");
for(const lang of ["en","vi"])for(const route of ROUTES){
 const p="v5/"+(lang==="vi"?"vi/":"")+route+"index.html";
 if(!fs.readFileSync(p,"utf8").includes('<meta name="robots" content="noindex,follow">'))failures.push("Old V5 duplicate indexed "+p);
}
if(failures.length){console.error("FAIL root launch: "+failures.length+"\n"+failures.slice(0,80).join("\n"));process.exit(1)}
console.log("PASS: 16 promoted EN/VI routes, 7 distinct inner hero concepts, aliases, assets, CNAME, sitemap, archive noindex");
