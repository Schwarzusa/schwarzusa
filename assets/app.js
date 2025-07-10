function toggleMenu(menuId) {
  const menu = document.getElementById(menuId);
  const isHidden = menu.classList.contains('hidden');
  document.getElementById('profileMenu').classList.add('hidden');
  document.getElementById('cartMenu').classList.add('hidden');
  if (isHidden) menu.classList.remove('hidden');
}

function loadProfile() {
  const data = localStorage.getItem('profile');
  return data ? JSON.parse(data) : { shipping: '', billing: '', payment: '', cart: [], orders: [] };
}

function saveProfile(profile) {
  localStorage.setItem('profile', JSON.stringify(profile));
}

function updateProfileInfo() {
  const p = loadProfile();
  document.getElementById('displayShipping').textContent = p.shipping || 'N/A';
  document.getElementById('displayBilling').textContent = p.billing || 'N/A';
  document.getElementById('displayPayment').textContent = p.payment || 'N/A';
  const ordersList = document.getElementById('ordersList');
  ordersList.innerHTML = '';
  p.orders.forEach((o, i) => {
    const li = document.createElement('li');
    li.textContent = `Order ${i + 1} - ${o.date} (${o.items.length} items)`;
    ordersList.appendChild(li);
  });
}

function editProfile() {
  const p = loadProfile();
  document.getElementById('shipping').value = p.shipping;
  document.getElementById('billing').value = p.billing;
  document.getElementById('payment').value = p.payment;
  document.getElementById('profileForm').classList.remove('hidden');
  document.getElementById('profileInfo').classList.add('hidden');
}

function handleProfileSubmit(e) {
  e.preventDefault();
  const p = loadProfile();
  p.shipping = document.getElementById('shipping').value;
  p.billing = document.getElementById('billing').value;
  p.payment = document.getElementById('payment').value;
  saveProfile(p);
  document.getElementById('profileForm').classList.add('hidden');
  document.getElementById('profileInfo').classList.remove('hidden');
  updateProfileInfo();
}

function updateCartMenu() {
  const p = loadProfile();
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = '';
  p.cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = item;
    cartList.appendChild(li);
  });
}

function addToCart(item) {
  const p = loadProfile();
  p.cart.push(item);
  saveProfile(p);
  updateCartMenu();
}

function checkout() {
  const p = loadProfile();
  if (p.cart.length === 0) return;
  p.orders.push({ date: new Date().toLocaleString(), items: p.cart });
  p.cart = [];
  saveProfile(p);
  updateCartMenu();
  updateProfileInfo();
}

document.addEventListener('DOMContentLoaded', () => {
  updateProfileInfo();
  updateCartMenu();
  document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
});
