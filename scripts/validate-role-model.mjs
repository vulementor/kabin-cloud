import fs from "node:fs";
const paths=["use-kabin","build-solutions","provide-capacity"];
let checked=0;
for(const slug of paths)for(const vi of [false,true]){
 const page=(vi?"vi/":"")+slug+"/index.html",md="docs/content/"+slug+"."+(vi?"vi":"en")+".md";
 const html=fs.readFileSync(page,"utf8"),source=fs.readFileSync(md,"utf8");
 const want=["class=\"role-page role-", "id=\"journey\"","role-problem","role-steps","role-case","role-control","role-cta","mailto:info@kabin.cloud"];
 for(const needle of want)if(!html.includes(needle))throw Error(page+" missing "+needle);
 if(!html.includes('href="'+(vi?"../../vi/":"../")+'"'))throw Error(page+" missing own-locale home");
 if(!html.includes('hreflang="en"')||!html.includes('hreflang="vi"'))throw Error(page+" missing locale metadata");
 if(!source.includes("status: editorial-review")||!source.includes("Kabin"))throw Error(md+" missing complete source");
 if((source.match(/[\p{L}\p{N}]+/gu)||[]).length<260)throw Error(md+" too thin");
 checked++;
}
for(const p of ["index.html","vi/index.html"]){const html=fs.readFileSync(p,"utf8");if(!html.includes('id="audiences"'))throw Error(p+" missing three-sided gateway");for(const slug of paths)if(!html.includes('href="'+slug+'/\"'))throw Error(p+" missing link "+slug);}
console.log("PASS: "+checked+" role-specific HTML pages, paired docs, all three homepage gateways");
