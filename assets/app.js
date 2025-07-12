function showMenu(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideMenu(id) {
  document.getElementById(id).classList.add('hidden');
}

function loadAccounts() {
  const data = localStorage.getItem('accounts');
  return data ? JSON.parse(data) : {};
}

function saveAccounts(accts) {
  localStorage.setItem('accounts', JSON.stringify(accts));
}

function currentUser() {
  return localStorage.getItem('currentUser');
}

function isSignedIn() {
  return !!currentUser();
}

function signInUser(email, password) {
  const accts = loadAccounts();
  if (accts[email] && accts[email].password === password) {
    localStorage.setItem('currentUser', email);
    return true;
  }
  return false;
}

function createAccount(email, password) {
  const accts = loadAccounts();
  if (accts[email]) return false;
  accts[email] = {
    password: password,
    profile: { shipping: '', billing: '', payment: '', cart: [], orders: [] }
  };
  saveAccounts(accts);
  localStorage.setItem('currentUser', email);
  return true;
}

function signOut() {
  localStorage.removeItem('currentUser');
  renderProfileMenu();
  updateCartMenu();
}

function loadProfile() {
  const email = currentUser();
  const accts = loadAccounts();
  if (email && accts[email]) {
    if (!accts[email].profile) {
      accts[email].profile = { shipping: '', billing: '', payment: '', cart: [], orders: [] };
      saveAccounts(accts);
    }
    return accts[email].profile;
  }
  return { shipping: '', billing: '', payment: '', cart: [], orders: [] };
}

function saveProfile(profile) {
  const email = currentUser();
  if (!email) return;
  const accts = loadAccounts();
  accts[email].profile = profile;
  saveAccounts(accts);
}

function updateCartMenu() {
  const p = loadProfile();
  const cartList = document.getElementById('cartItems');
  if (!cartList) return;
  cartList.innerHTML = '';
  p.cart.forEach(item => {
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
}

function renderProfileMenu() {
  const signed = isSignedIn();
  const signedDiv = document.getElementById('profileSigned');
  const unsignedDiv = document.getElementById('profileUnsigned');
  if (signedDiv && unsignedDiv) {
    signedDiv.classList.toggle('hidden', !signed);
    unsignedDiv.classList.toggle('hidden', signed);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProfileMenu();
  updateCartMenu();
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      signOut();
      window.location.href = 'home.html';
    });
  }
});
