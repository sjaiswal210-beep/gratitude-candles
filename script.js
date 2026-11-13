const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with your WhatsApp number, digits only.
const CURRENCY = "₹";
let products = [], cart = [], activeCategory = "All";
const grid = document.getElementById("productGrid");
const money = n => n === null || n === undefined ? "Price on request" : CURRENCY + Number(n).toLocaleString("en-IN");
const waLink = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

async function init(){
  const res = await fetch("products.json");
  products = await res.json();
  renderProducts();
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("whatsappCta").href = waLink("Hi! I'd love to know more about your handmade collection.");
}
function renderProducts(){
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const shown = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && p.name.toLowerCase().includes(q));
  grid.innerHTML = shown.length ? shown.map(p => `
    <article class="product-card">
      <div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-number">NO. ${String(p.id).padStart(2,"0")}</span>
      <button class="add-btn" aria-label="Add ${p.name} to bag" onclick="addToCart(${p.id})">+</button></div>
      <div class="product-info"><div><h3>${p.name}</h3><small>${p.category}</small></div><span class="price">${money(p.price)}</span></div>
    </article>`).join("") : `<div class="no-results">No pieces found. Try another search ✳</div>`;
}
function addToCart(id){
  const item = cart.find(x=>x.id===id);
  item ? item.qty++ : cart.push({id,qty:1});
  updateCart(); toast("Added to your bag ✳");
}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=delta; if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  updateCart();
}
function updateCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  const total=cart.reduce((s,x)=>s+x.qty*(products.find(p=>p.id===x.id).price||0),0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("drawerCount").textContent=`(${count})`;
  document.getElementById("subtotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{
    const p=products.find(p=>p.id===x.id);
    return `<div class="cart-row"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><span class="line-price">${p.price==null?"Quote":money(p.price*x.qty)}</span></div>`;
  }).join(""):`<div class="empty-cart">Your bag is waiting for something lovely ✳</div>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("backdrop").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("backdrop").addEventListener("click",closeCart);
document.getElementById("checkout").addEventListener("click",()=>{
  if(!cart.length){toast("Add a piece to your bag first");return}
  const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `• ${p.name} (No. ${p.id}) × ${x.qty} — ${p.price==null?"Please confirm price":money(p.price*x.qty)}`});
  const total=cart.reduce((s,x)=>s+x.qty*(products.find(p=>p.id===x.id).price||0),0);
  const hasQuote=cart.some(x=>products.find(p=>p.id===x.id).price==null);
  const message=`Hello! I'd like to enquire/order:\n\n${lines.join("\n")}\n\n${hasQuote?"Please confirm the prices for items marked as quote. ":"Subtotal: "+money(total)+"\n\n"}Please confirm availability and delivery details.`;
  if(WHATSAPP_NUMBER.includes("X")){toast("Please add your WhatsApp number in script.js");return}
  window.open(waLink(message),"_blank","noopener");
});
init();