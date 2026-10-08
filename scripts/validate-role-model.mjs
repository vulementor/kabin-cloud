import fs from "node:fs";
const roles=["use-kabin","build-solutions","provide-capacity"];
let pairs=0;
for(const role of roles)for(const lang of ["en","vi"]){
 const vi=lang==="vi",page=(vi?"vi/":"")+role+"/index.html",doc="docs/content/"+role+"."+lang+".md";
 const html=fs.readFileSync(page,"utf8"),markdown=fs.readFileSync(doc,"utf8");
 for(const marker of ['class="cl-main cl-','class="cl-intro"','class="cl-main-steps','class="cl-next-list"','mailto:info@kabin.cloud','class="button button-outline-light"'])
  if(!html.includes(marker))throw Error(page+" missing "+marker);
 if(!html.includes('hreflang="en"')||!html.includes('hreflang="vi"'))throw Error(page+": incomplete locale switch");
 if(!markdown.includes("status: editorial-review"))throw Error(doc+": incorrect editorial source status");
 const steps=(html.match(/class="cl-step"/g)||[]).length;
 if(steps!==4)throw Error(page+": expected four concrete steps; found "+steps);
 pairs++;
}
for(const locale of ["en","vi"]){
 const p=locale==="vi"?"vi/index.html":"index.html",s=fs.readFileSync(p,"utf8");
 if(!s.includes('id="audiences"'))throw Error(p+": missing 3-way choice");
 for(const role of roles)if(!s.includes('href="'+(locale==="vi"?"../vi/":"")+role+'/\"'))throw Error(p+": missing "+role);
}
console.log("PASS: "+pairs+" role journeys and both homepage gateways");
