import fs from "node:fs";
import path from "node:path";
const base="v5/",host="https://vulementor.github.io/kabin-cloud/v5/";
const routes=["","platform/","solutions/","marketplace/","builders/","providers/","developers/","company/"];
const failures=[];
const exists=p=>fs.existsSync(p);
const attr=(x,k)=>x.match(new RegExp('\\b'+k+'="([^"]*)"'))?.[1];
let checked=0;
for(const route of routes)for(const lang of ["en","vi"]){
 const pre=lang==="vi"?"vi/":"",p=base+pre+route+"index.html";
 if(!exists(p)){failures.push("Missing "+p);continue}
 const html=fs.readFileSync(p,"utf8");
 if(!html.includes('<html lang="'+lang+'">'))failures.push(p+" bad lang");
 const url=host+pre+route,en=host+route,vi=host+"vi/"+route;
 for(const expected of ['<link rel="canonical" href="'+url+'">','hreflang="en" href="'+en+'"','hreflang="vi" href="'+vi+'"','data-lang="'+lang+'"','id="header"','id="footer"','id="main"','<h1','data-root='])
  if(!html.includes(expected))failures.push(p+" missing "+expected);
 const doc=base+"docs/content/"+(route.replace(/\/$/,"")||"home")+"."+lang+".md";
 if(!exists(doc))failures.push(p+" missing docs source "+doc);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=m[1];
  if(/^(https?:|mailto:|tel:|data:)/i.test(href)||href.startsWith("#"))continue;
  const f=href.split("#")[0].split("?")[0];
  if(!f)continue;
  let candidate=path.posix.normalize(path.posix.join(path.posix.dirname(p),f));
  if(f.endsWith("/"))candidate=path.posix.join(candidate,"index.html");
  if(!exists(candidate))failures.push(p+" broken "+href+" ⇒ "+candidate);
  if(!candidate.startsWith("v5/"))failures.push(p+" escapes v5: "+href);
 }
 checked++;
}
const script=fs.readFileSync(base+"assets/v5.js","utf8");
for(const s of ["market-query","ask-run","solution-task","provider-form","lang-switch","mobile-nav"])if(!script.includes(s))failures.push("Missing interaction "+s);
const css=fs.readFileSync(base+"assets/v5.css","utf8");
for(const s of ["prefers-reduced-motion","@media(max-width:480px)","engine-visual","market-grid"])if(!css.includes(s))failures.push("Missing visual "+s);
if(checked!==16)failures.push("Expected 16 pages, got "+checked);
if(failures.length){console.error("FAIL V5: "+failures.length+" violations\n"+failures.slice(0,100).join("\n"));process.exit(1)}
console.log("PASS V5: "+checked+" HTML routes (8 English, 8 Vietnamese), local paths, canonical/hreflang, bilingual copy, assets and interactive contract.");
