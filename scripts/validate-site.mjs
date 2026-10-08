import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HOST = "https://vulementor.github.io/kabin-cloud/";
const EN = ["Platform", "Solutions", "Marketplace", "Developers", "Resources", "Company"];
const VI = ["Nền tảng", "Giải pháp", "Marketplace", "Nhà phát triển", "Tài nguyên", "Công ty"];
const TARGETS = ["platform", "solutions", "marketplace", "developers", "resources", "company"];
const failures = [];
const fileExists = x => fs.existsSync(path.resolve(ROOT,x));
const walk = (directory=".") => fs.readdirSync(path.resolve(ROOT,directory), {withFileTypes:true}).flatMap(item => {
  const target = path.posix.join(directory,item.name);
  if (item.isDirectory()) return [".git","node_modules"].includes(item.name)?[]:walk(target);
  return item.isFile()?[target.replace(/^\.\//,"")]:[];
});
const all = walk();
const pages = all.filter(x=>x==="index.html"||x.endsWith("/index.html"));
const strip = x => x.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
const attr = (tag,name) => tag.match(new RegExp('\\b'+name+'="([^"]*)"'))?.[1]??"";
const extract = (html,cl) => {
 const r = new RegExp('<nav\\b[^>]*class="'+cl+'"[^>]*>([\\s\\S]*?)<\\/nav>','i');
 return html.match(r)?.[1]??null;
};
for(const source of pages) {
 const html = fs.readFileSync(path.resolve(ROOT,source),"utf8");
 const vi = source.startsWith("vi/");
 const display = vi?VI:EN;
 const depth = source.split("/").length-1;
 const prefix = "../".repeat(depth)+(vi?"vi/":"");
 const lang = vi?"vi":"en";
 if(!html.includes('<html lang="'+lang+'">'))failures.push(source+": incorrect document language");
 const nav = [];
 for(const name of ["desktop-nav","mobile-nav"]) {
  const content=extract(html,name);
  if(!content){failures.push(source+": missing "+name);continue;}
  const links=[...content.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(m=>({href:attr(m[1],"href"),label:strip(m[2])}));
  if(links.length!==6)failures.push(source+": "+name+" has "+links.length+" links, expected 6");
  links.forEach((link,i)=>{
   if(link.label!==display[i])failures.push(source+": "+name+" label "+i+" = "+link.label);
   if(link.href!==prefix+TARGETS[i]+"/")failures.push(source+": "+name+" link "+i+" = "+link.href+" expected "+prefix+TARGETS[i]+"/");
  });
  nav.push(JSON.stringify(links));
 }
 if(nav.length===2&&nav[0]!==nav[1])failures.push(source+": desktop/mobile mismatch");
 const relative = source==="index.html"?"":source.slice(0,-"index.html".length);
 const expectedCanon=HOST+relative;
 if(!html.includes('<link rel="canonical" href="'+expectedCanon+'">'))failures.push(source+": incorrect canonical");
 const partner=vi?relative.slice(3):"vi/"+relative;
 if(!fileExists(partner+"index.html"))failures.push(source+": missing partner "+partner);
 for(const loc of ["en","vi"])if(!html.includes('hreflang="'+loc+'"'))failures.push(source+": missing "+loc+" hreflang");
 const slug=relative.replace(/^vi\//,"").replace(/\/$/,"").replaceAll("/","--")||"home";
 for(const edition of ["en","vi"])if(!fileExists("docs/content/"+slug+"."+edition+".md"))failures.push(source+": missing editorial doc "+slug+"."+edition);
 // Keep navigation, company terminology and every CTA in its selected locale.
 const footer = html.slice(html.indexOf("<footer"));
 const expectedLegalBase = "../".repeat(depth)+(vi?"vi/":"");
 for(const destination of ["privacy","terms","cookies"]) {
  const match=footer.match(new RegExp('<a href="([^"]*legal/'+destination+'/)"'));
  if(!match)failures.push(source+": missing footer legal "+destination);
  else {
   const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(source),match[1]));
   if(resolved!==(vi?"vi/":"")+"legal/"+destination)failures.push(source+": legal footer escapes locale "+destination);
  }
 }
 if(vi && source!=="vi/index.html" && source!=="vi/platform/index.html") {
  for(const [selector,target] of [
   ['class="header-cta"','vi/contact'],
   ['class="directory-back"','vi'],
   ['class="button button-outline-light"','vi']
  ]) {
   const position=html.indexOf(selector);
   const anchor=position===-1?"":html.slice(position,position+180);
   const href=anchor.match(/href="([^"]+)"/)?.[1];
   const resolved=href?path.posix.normalize(path.posix.join(path.posix.dirname(source),href)):"";
   if(resolved!==target)failures.push(source+": localized CTA "+selector+" resolves "+resolved+" expected "+target);
  }
  if(!footer.includes('>Công ty</a>')||footer.includes('>Doanh nghiệp</a>'))failures.push(source+": inconsistent company footer label");
 }
 const hrefs=[...html.matchAll(/\bhref="([^"]+)"/g)].map(x=>x[1]);
 const scripts=[...html.matchAll(/\bsrc="([^"]+)"/g)].map(x=>x[1]);
 for(const href of [...hrefs,...scripts]){
  if(/^(https?:|mailto:|tel:|data:|javascript:)/i.test(href))continue;
  if(href.startsWith("#")){
   const id=href.slice(1);
   if(id&&!html.includes('id="'+id+'"'))failures.push(source+": broken anchor "+href);
   continue;
  }
  let clean=href.split("#")[0].split("?")[0];
  if(!clean)continue;
  let file;
  if(clean.startsWith("/kabin-cloud/"))file=clean.slice("/kabin-cloud/".length);
  else if(clean.startsWith("/")){failures.push(source+": unexpected root-absolute "+href);continue;}
  else file=path.posix.normalize(path.posix.join(path.posix.dirname(source),clean));
  if(clean.endsWith("/"))file=path.posix.join(file,"index.html");
  if(!fileExists(file))failures.push(source+": broken local link "+href+" => "+file);
 }
 if(!html.includes('mailto:info@kabin.cloud')||!html.includes("974"))failures.push(source+": missing contact");
}
if(pages.length!==108)failures.push("Expected 108 HTML pages, found "+pages.length);
const sitemap=fs.readFileSync("sitemap.xml","utf8");
if((sitemap.match(/<url>/g)||[]).length!==108)failures.push("Sitemap entry count mismatch");
if(failures.length){console.error("FAIL: "+failures.length+" website contract violations\n"+failures.slice(0,80).join("\n"));process.exit(1);}
console.log("PASS: "+pages.length+" bilingual HTML pages, "+(pages.length/2)+" route pairs, consistent 6-item header on desktop/mobile, links, docs and sitemap");
