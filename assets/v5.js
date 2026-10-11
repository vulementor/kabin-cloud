(function browserApp(){
"use strict";
const body=document.body,vi=body.dataset.lang==="vi",slug=body.dataset.page==="home"?"":body.dataset.page,root=body.dataset.root||"./";
const t={
en:{nav:["Platform","Solutions","Marketplace","Builders","Developers","Company"],provide:"Provide Capacity",description:"An open AI Agent ecosystem: users request outcomes, builders shape solutions and providers contribute execution capacities.",legal:"Operated by K’UNITY Green Technology Investment Company Limited (English display translation pending certificate confirmation).",open:"Open menu",close:"Close menu",demo:"Example plan preview",notLive:"Demonstration only. No AI model, execution or billing is involved.",ideas:{video:"Create a 30-second product review video with captions and approval before publishing.",research:"Prepare a daily market brief with dated sources and human review.",browser:"Complete an authorized browser task and retain evidence."},plan:{video:["Source brief","Script + voice","Video render","Human approval"],research:["Gather sources","Verify dates","Synthesize report","Reviewer sign-off"],browser:["Check permissions","Inspect exact target","One bounded action","Verify receipt"]},sol:{video:["30-second product review",["SCRIPT","VOICE","RENDER"],"MP4 + SRT"],research:["Source-backed market brief",["COLLECT","EXTRACT","SYNTHESIZE"],"BRIEF + CITATIONS"],browser:["Authorized browser operation",["TARGET","ACTION","RECONCILE"],"RECEIPT / UNKNOWN"]}},
vi:{nav:["Nền tảng","Giải pháp","Marketplace","Builder","Nhà phát triển","Công ty"],provide:"Cung cấp Capacity",description:"Hệ sinh thái AI Agent mở: User cần kết quả, Builder thiết kế giải pháp, Provider đóng góp năng lực.",legal:"Vận hành bởi CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY.",open:"Mở menu",close:"Đóng menu",demo:"Kế hoạch minh họa",notLive:"Chỉ là minh họa. Không chạy AI, thực thi tác vụ hay tính phí.",ideas:{video:"Làm video sản phẩm 30 giây có phụ đề, duyệt rồi mới đăng.",research:"Tạo bản tin thị trường từ nguồn có ngày tháng, cần người duyệt.",browser:"Thực hiện tác vụ browser có quyền và lưu bằng chứng."},plan:{video:["Chốt brief","Kịch bản + giọng","Dựng video","Người duyệt"],research:["Thu thập nguồn","Kiểm tra ngày","Tổng hợp báo cáo","Biên tập duyệt"],browser:["Kiểm tra quyền","Xác định đúng đích","Một thao tác","Đối soát receipt"]},sol:{video:["Video review 30 giây",["SCRIPT","VOICE","RENDER"],"MP4 + SRT"],research:["Bản tin có nguồn",["COLLECT","EXTRACT","SYNTHESIZE"],"BẢN TIN + NGUỒN"],browser:["Tác vụ browser có quyền",["TARGET","ACTION","RECONCILE"],"RECEIPT / UNKNOWN"]}}
};
const x=vi?t.vi:t.en,url=path=>root+(vi?"vi/":"")+(path?path+"/":"");
const logo=`<span class="logo-mark" aria-hidden="true">✳</span><span>KABIN<span class="logo-dot">.</span><small>AGENT</small></span>`;
const links=["platform","solutions","marketplace","builders","developers","company"];
const navLinks=links.map((path,i)=>`<a href="${url(path)}"${slug===path?' aria-current="page"':""}>${x.nav[i]}</a>`).join("");
const switchLink=(lang,label)=>`<a href="${root+(lang==="vi"?"vi/":"")+(slug?slug+"/":"")}" lang="${lang}" hreflang="${lang}" ${lang===(vi?"vi":"en")?'aria-current="page"':''}>${label}</a>`;
document.getElementById("header").innerHTML=`<header class="site-header" id="top"><div class="shell header-inner"><a class="logo" href="${url("")}" aria-label="Kabin Agent home">${logo}</a><nav class="nav" aria-label="${vi?"Điều hướng chính":"Main navigation"}">${navLinks}</nav><div class="header-actions"><div class="lang-switch" aria-label="Language">${switchLink("en","EN")}${switchLink("vi","VI")}</div><a class="header-cta" href="${url("providers")}">${x.provide} ↗</a><button class="hamburger" type="button" aria-controls="mobile-nav" aria-expanded="false" aria-label="${x.open}">☰</button></div></div><nav class="mobile-nav" id="mobile-nav" hidden>${navLinks}<a href="${url("providers")}">${x.provide} ↗</a></nav></header>`;
document.getElementById("footer").innerHTML=`<footer class="site-footer"><div class="shell"><div class="footer-main"><div class="footer-about"><a href="${url("")}" class="logo">${logo}</a><p>${x.description}</p><a href="mailto:info@kabin.cloud">info@kabin.cloud</a></div><div class="footer-links"><div><strong>${vi?"KHÁM PHÁ":"EXPLORE"}</strong><a href="${url("platform")}">${x.nav[0]}</a><a href="${url("solutions")}">${x.nav[1]}</a><a href="${url("marketplace")}">${x.nav[2]}</a></div><div><strong>${vi?"THAM GIA":"PARTICIPATE"}</strong><a href="${url("builders")}">${x.nav[3]}</a><a href="${url("providers")}">${x.provide}</a><a href="${url("developers")}">${x.nav[4]}</a></div><div><strong>${vi?"LIÊN HỆ":"CONTACT"}</strong><a href="${url("company")}">${x.nav[5]}</a><a href="mailto:info@kabin.cloud">info@kabin.cloud</a><a href="tel:+84974744299">+84 974 744 299</a></div></div></div><div class="footer-bottom"><span>${x.legal}</span><span>© 2026 Kabin Agent · V5 / <a href="#top">${vi?"Về đầu trang":"Back to top"} ↑</a></span></div></div></footer>`;
const menu=document.querySelector(".hamburger"),mobile=document.querySelector(".mobile-nav");
const closeMenu=()=>{menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label",x.open);mobile.hidden=true;menu.textContent="☰"};
menu.addEventListener("click",()=>{const opened=menu.getAttribute("aria-expanded")==="true";if(opened)closeMenu();else{menu.setAttribute("aria-expanded","true");menu.setAttribute("aria-label",x.close);mobile.hidden=false;menu.textContent="×"}});
mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
window.addEventListener("resize",()=>{if(window.innerWidth>960)closeMenu()});
const ask=document.getElementById("ask-text"),askRun=document.getElementById("ask-run"),result=document.getElementById("ask-result");
if(ask&&askRun&&result){
 let selection="video";
 document.querySelectorAll("[data-preset]").forEach(b=>b.addEventListener("click",()=>{selection=b.dataset.preset;ask.value=x.ideas[selection];ask.focus()}));
 askRun.addEventListener("click",()=>{
  const prompt=ask.value.trim();if(!prompt){ask.focus();return}
  const lower=prompt.toLocaleLowerCase();
  const mode=/(report|brief|research|market|bản tin|nghiên cứu|thị trường)/i.test(lower)?"research":/(browser|web|website|trình duyệt|đăng nhập|submit)/i.test(lower)?"browser":selection;
  const title=document.createElement("strong");title.textContent=x.demo+": "+prompt;
  const plan=document.createElement("div");plan.className="preview-steps";
  x.plan[mode].forEach(s=>{const p=document.createElement("span");p.textContent=s;plan.append(p)});
  const note=document.createElement("p");note.textContent=x.notLive;note.className="small-note";
  result.replaceChildren(title,plan,note);result.hidden=false;
 });
}
const market=document.getElementById("market-grid"),marketQuery=document.getElementById("market-query");
if(market&&marketQuery){
 const cards=[...market.querySelectorAll(".market-tile")],tabs=[...document.querySelectorAll(".market-tabs button")],empty=document.getElementById("market-empty");
 let category="all";
 const apply=()=>{
  const q=marketQuery.value.trim().toLocaleLowerCase();let shown=0;
  cards.forEach(card=>{const match=(category==="all"||category===card.dataset.category)&&(!q||(card.dataset.search+" "+card.textContent).toLocaleLowerCase().includes(q));card.hidden=!match;if(match)shown++});empty.hidden=shown!==0;
 };
 tabs.forEach(b=>b.addEventListener("click",()=>{category=b.dataset.category;tabs.forEach(t=>{const on=t===b;t.classList.toggle("active",on);t.setAttribute("aria-pressed",String(on))});apply()}));
 marketQuery.addEventListener("input",apply);
 document.getElementById("market-clear")?.addEventListener("click",()=>{marketQuery.value="";marketQuery.focus();apply()});apply();
}
const solutionTabs=[...document.querySelectorAll("[data-solution]")];
if(solutionTabs.length){
 const task=document.getElementById("solution-task"),caps=document.getElementById("solution-capacities"),out=document.getElementById("solution-outcome");
 const choose=mode=>{solutionTabs.forEach(b=>b.setAttribute("aria-selected",String(b.dataset.solution===mode)));const [title,stages,output]=x.sol[mode];task.textContent=title;caps.replaceChildren(...stages.map(s=>{const d=document.createElement("div");d.className="solution-cap";d.textContent=s;return d}));out.textContent=output};
 solutionTabs.forEach(b=>{b.addEventListener("click",()=>choose(b.dataset.solution));b.addEventListener("keydown",e=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();const i=solutionTabs.indexOf(b),idx=e.key==="Home"?0:e.key==="End"?solutionTabs.length-1:(i+(e.key==="ArrowRight"?1:-1)+solutionTabs.length)%solutionTabs.length;solutionTabs[idx].focus();choose(solutionTabs[idx].dataset.solution)})});
}
const provider=document.getElementById("provider-form");
if(provider)provider.addEventListener("submit",event=>{
 event.preventDefault();if(!provider.reportValidity())return;
 const f=new FormData(provider),name=(f.get("name")||"").toString().trim(),repo=(f.get("url")||"").toString().trim(),purpose=(f.get("purpose")||"").toString().trim();
 const subject=encodeURIComponent("Kabin Capacity Provider proposal: "+name),msg=encodeURIComponent("Name/organization: "+name+"\nRepository or service: "+repo+"\nProblem it solves: "+purpose+"\n\nPlease review this candidate for the Kabin Capacity ecosystem.");
 window.location.href="mailto:info@kabin.cloud?subject="+subject+"&body="+msg;
});
})();