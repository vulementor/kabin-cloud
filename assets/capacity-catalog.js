/* Static category browser. Not a live supplier inventory. */
document.addEventListener("DOMContentLoaded",()=>{
 const container=document.querySelector(".cl-shelf"),input=document.getElementById("capacity-search");
 if(!container||!input)return;
 const cards=[...container.querySelectorAll(".cl-capacity")],buttons=[...document.querySelectorAll(".cl-filter")];
 const status=document.querySelector(".cl-result"),empty=document.querySelector(".cl-empty");
 let chosen="all";
 function apply(){
  const q=input.value.trim().toLocaleLowerCase();let visible=0;
  for(const card of cards){
   const text=((card.dataset.keywords||"")+" "+card.textContent).toLocaleLowerCase();
   const show=(chosen==="all"||card.dataset.category===chosen)&&(!q||text.includes(q));
   card.hidden=!show;if(show)visible++;
  }
  if(status)status.textContent=visible+" / "+cards.length+" capacity categories";
  if(empty)empty.hidden=visible>0;
 }
 for(const b of buttons)b.addEventListener("click",()=>{
  chosen=b.dataset.filter||"all";
  for(const x of buttons){const active=x===b;x.classList.toggle("is-active",active);x.setAttribute("aria-pressed",String(active));}
  apply();
 });
 input.addEventListener("input",apply);apply();
});