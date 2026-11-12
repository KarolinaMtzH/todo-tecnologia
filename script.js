const cart = [];
const count = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'),2400);
}
document.querySelectorAll('.add-button').forEach(button=>{
  button.addEventListener('click',()=>{
    cart.push(button.dataset.product);
    count.textContent = cart.length;
    showToast(`${button.dataset.product} se agregó a tu carrito.`);
  });
});
document.getElementById('cartButton').addEventListener('click',()=>{
  if(!cart.length){showToast('Tu carrito todavía está vacío.');return;}
  const summary = cart.reduce((acc,item)=>(acc[item]=(acc[item]||0)+1,acc),{});
  showToast('Carrito: '+Object.entries(summary).map(([name,n])=>`${name} (${n})`).join(', '));
});
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.getElementById('productSearch');
let activeFilter = 'todos';
function updateProducts(){
  const term = searchInput.value.toLowerCase().trim();
  document.querySelectorAll('.product-card').forEach(card=>{
    const categoryMatch = activeFilter==='todos' || card.dataset.category===activeFilter;
    const textMatch = card.dataset.name.includes(term) || card.textContent.toLowerCase().includes(term);
    card.style.display = categoryMatch && textMatch ? '' : 'none';
  });
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  updateProducts();
}));
searchInput.addEventListener('input',updateProducts);
document.getElementById('contactForm').addEventListener('submit',event=>{
  event.preventDefault();
  document.getElementById('formSuccess').classList.add('show');
  event.target.reset();
});
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('mainNav').classList.toggle('open');
});
document.querySelectorAll('#mainNav a').forEach(link=>link.addEventListener('click',()=>{
  document.getElementById('mainNav').classList.remove('open');
}));
