const PHONE="254700720388"; // replace with the restaurant’s WhatsApp number, digits only, with country code
const MENU=[
 ["Seafood",[["Fish & chips","Fresh catch, crisp chips",1200],["Grilled whole snapper","Lemon and garlic butter",1800],["Prawns in coconut","Coastal coconut sauce",2000],["Fried calamari","Lime and tartare",1100],["Octopus curry","Slow-cooked, with rice",1400],["Grilled lobster","Catch of the day",3200]]],
 ["Sides",[["Chips","",400],["Kachumbari","",300],["Coconut rice","",450]]],
 ["Drinks",[["Fresh passion juice","",350],["Dawa","",600],["Tusker","",400]]]
];
const q={},money=n=>"Ksh "+n.toLocaleString("en-KE"),$=id=>document.getElementById(id);
const items=[];MENU.forEach(c=>c[1].forEach(i=>items.push(i)));
function render(){
  let h="",k=0;
  MENU.forEach(c=>{h+=`<div class="cat">${c[0]}</div>`;c[1].forEach(i=>{const id=k++,n=q[id]||0;
    h+=`<div class="item"><div class="t"><b>${i[0]}</b>${i[1]?`<small>${i[1]}</small><br>`:""}<span class="price">${money(i[2])}</span></div>`+
    (n?`<div class="qty"><button data-d="-1" data-i="${id}" aria-label="Remove one ${i[0]}">−</button><span>${n}</span><button data-d="1" data-i="${id}" aria-label="Add one ${i[0]}">+</button></div>`:`<button class="add" data-d="1" data-i="${id}">Add</button>`)+`</div>`});});
  $("list").innerHTML=h;
  let cnt=0,tot=0;items.forEach((i,x)=>{const n=q[x]||0;cnt+=n;tot+=n*i[2]});
  $("fab").classList.toggle("has",cnt>0);$("fabn").textContent=cnt;
  $("fabtxt").textContent=cnt?"View order · "+money(tot):"Order on WhatsApp";
  return [cnt,tot];
}
$("list").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=b.dataset.i;q[i]=Math.max(0,(q[i]||0)+ +b.dataset.d);render()});
$("fab").onclick=()=>{const [cnt,tot]=render();
  if(!cnt){$("menu").scrollIntoView();return}
  let l="";items.forEach((i,x)=>{if(q[x])l+=`<div class="line"><span>${q[x]} × ${i[0]}</span><span>${money(q[x]*i[2])}</span></div>`});
  $("lines").innerHTML=l;$("total").textContent=money(tot);$("sheet").classList.add("on")};
$("close").onclick=()=>$("sheet").classList.remove("on");
$("sheet").onclick=e=>{if(e.target.id==="sheet")$("sheet").classList.remove("on")};
$("send").onclick=()=>{
  let m="Hello The Moorings, I’d like to order:\n";
  items.forEach((i,x)=>{if(q[x])m+=`• ${q[x]} × ${i[0]} (${money(q[x]*i[2])})\n`});
  const [,tot]=render();
  m+=`\nTotal: ${money(tot)}\nName: ${$("nm").value||"-"}\nType: ${$("mode").value}`;
  if($("note").value.trim())m+=`\nNotes: ${$("note").value.trim()}`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`,"_blank");
};
$("tourlink").href=`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello The Moorings, I’d like to ask about the sunset boat tour.")}`;
render();
