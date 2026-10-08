import fs from "node:fs";
const groups=["agents","workflows","creative","automation","tools","data","providers","publish","capacity/sample"];
let checked=0;
const titles=[];
for(const group of groups)for(const lang of ["en","vi"]){
 const prefix=lang==="vi"?"vi/":"",route=prefix+"marketplace/"+group+"/",page=route+"index.html",doc="docs/content/marketplace--"+group.replaceAll("/","--")+"."+lang+".md";
 const s=fs.readFileSync(page,"utf8"),d=fs.readFileSync(doc,"utf8");
 for(const marker of ['cl-market-detail','class="cl-flow"','id="contract"','class="cl-main-steps','class="cl-next','class="button button-outline-light"'])
  if(!s.includes(marker))throw Error(page+": missing "+marker);
 if((s.match(/class="cl-step"/g)||[]).length!==3)throw Error(page+": input/output/check contract must have 3 parts");
 if(!d.includes("## Contract overview")||!d.includes("- Input:")||!d.includes("- Output:")||!d.includes("- Validation:"))throw Error(doc+": not an inspectable Capacity contract");
 if(d.includes("## Content pillars")||s.includes("art-ring ring-one"))throw Error(page+": generic scaffold remains");
 titles.push(s.match(/<h1>(.*?)<\/h1>/)?.[1]);checked++;
}
if(new Set(titles.slice(0,18).filter((x,i)=>i%2===0)).size!==groups.length)throw Error("Capability titles overlap");
console.log("PASS: "+checked+" localized contract-led Marketplace category pages");
