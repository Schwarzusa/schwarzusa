const modal = document.getElementById('orderModal');
const modalInfo = document.getElementById('modalInfo');
const orderForm = document.getElementById('orderForm');
const paymentInfo = document.getElementById('paymentInfo');
const designCodeInput = document.getElementById('designCode');
const authorizeBtn = document.getElementById('authorizeBtn');
let orderBody = '';

function openOrderModal(code) {
  designCodeInput.value = code || '';
  modal.classList.remove('hidden');
  modalInfo.classList.remove('hidden');
  orderForm.classList.add('hidden');
  paymentInfo.classList.add('hidden');
}

document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openOrderModal(btn.dataset.code);
  });
});

document.getElementById('acknowledgeBtn').addEventListener('click', () => {
  modalInfo.classList.add('hidden');
  orderForm.classList.remove('hidden');
  paymentInfo.classList.add('hidden');
});

orderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(orderForm);

  let address = formData.get('address');
  if (!address) {
    const addrParts = [
      formData.get('Street Address'),
      formData.get('Line 2'),
      formData.get('City'),
      formData.get('State'),
      formData.get('Zip Code')
    ].filter(Boolean);
    address = addrParts.join(', ');
  }

  orderBody =
    `Name: ${formData.get('name')}` + '\n' +
    `Email: ${formData.get('email')}` + '\n' +
    `Address: ${address}` + '\n' +
    `Design Code: ${formData.get('design')}` + '\n' +
    `Notes: ${formData.get('notes')}`;
  orderForm.classList.add('hidden');
  paymentInfo.classList.remove('hidden');
});

authorizeBtn.addEventListener('click', () => {
  const signature = document.getElementById('signature').value.trim();
  if (!signature) {
    alert('Please type your name to authorize.');
    return;
  }
  const mailtoLink =
    `mailto:orders@schwarzusa.us?subject=Card%20Order&body=${encodeURIComponent(orderBody + '\nSignature: ' + signature)}`;
  window.open(mailtoLink);
  window.location.href = 'https://square.link/u/uDJCvlMf';
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
