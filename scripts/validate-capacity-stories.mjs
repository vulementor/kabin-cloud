import fs from "node:fs";
const subjects=["agents","workflows","creative","automation"];
const locale=["en","vi"];
const evidence=[];
for(const type of subjects){
 for(const lang of locale){
  const path=(lang==="vi"?"vi/":"")+"marketplace/"+type+"/index.html";
  const src=fs.readFileSync(path,"utf8");
  const doc=fs.readFileSync("docs/content/marketplace--"+type+"."+lang+".md","utf8");
  const expected=[
   '<main id="main" class="cap-study cap-study-'+type+'">',
   'cap-visual-'+type, // rewritten check replaced below for visual mapping
   'id="story"','class="cap-case"','class="cap-questions',
   'mailto:info@kabin.cloud','class="button button-outline-light"',
  ];
  const visual={"agents":"cap-visual-agents","workflows":"cap-visual-workflows","creative":"cap-visual-creative","automation":"cap-visual-automation"}[type];
  expected[1]=visual;
  for(const x of expected)if(!src.includes(x))throw new Error(path+" missing "+x);
  if(src.includes('art-ring ring-one')||src.includes('Explore the approach'))throw new Error(path+" generic template remains");
  if(doc.includes('## Content pillars')||doc.includes('## Các điểm nội dung'))throw new Error(path+" generic content scaffold remains");
  const primary=doc.split("## Editorial disclaimer")[0];
  const words=(primary.match(/[\p{L}\p{N}]+/gu)||[]).length;
  if(words<300)throw new Error(path+" too brief: "+words);
  if(!doc.includes("status: rewritten-review-pending"))throw new Error(path+" missing editorial status");
  const goal=(lang==="vi"?"vi/":"")+"marketplace/";
  if(!src.includes('href="../../../'+goal+'"') && lang==="vi")throw new Error(path+" lacks locale-safe marketplace link");
  evidence.push({path,words,visual});
 }
}
if(new Set(evidence.map(x=>x.visual)).size!==4)throw new Error("All capacity visuals must differ");
console.log("PASS: "+evidence.length+" bilingual capability stories, 4 distinct diagram types, copy and locale boundary checks");
