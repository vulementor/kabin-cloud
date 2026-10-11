import fs from "node:fs";
const issues=[];
for(const lang of ["en","vi"]){
 const prefix=lang==="vi"?"vi/":"";
 const homepage=fs.readFileSync(prefix+"index.html","utf8");
 for(const m of ['class="role-grid"','id="demo"','class="ask-compose"',"builders/","providers/"])if(!homepage.includes(m))issues.push(prefix+"homepage missing "+m);
 for(const role of ["builders","providers"]){
  const p=prefix+role+"/index.html",html=fs.readFileSync(p,"utf8"),doc=fs.readFileSync("docs/content/"+role+"."+lang+".md","utf8");
  if(!html.includes('data-page="'+role+'"')||!html.includes("hero-variant-"+role))issues.push(p+" invalid role visual");
  if(!doc.includes("status: public-website"))issues.push(p+" missing public editorial source");
 }
}
const js=fs.readFileSync("assets/v5.js","utf8");
for(const tag of ["provider-form","mailto:info@kabin.cloud","ask-run","market-grid"])if(!js.includes(tag))issues.push("Missing script "+tag);
if(issues.length){console.error(issues.join("\n"));process.exit(1)}
console.log("PASS: role-led main homepage and Builder/Provider journeys in both languages");
