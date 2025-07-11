const modal = document.getElementById('orderModal');
const modalInfo = document.getElementById('modalInfo');
const orderForm = document.getElementById('orderForm');
const designCodeInput = document.getElementById('designCode');

function openOrderModal(code) {
  designCodeInput.value = code || '';
  modal.classList.remove('hidden');
  modalInfo.classList.remove('hidden');
  orderForm.classList.add('hidden');
}

document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openOrderModal(btn.dataset.code);
  });
});

document.getElementById('acknowledgeBtn').addEventListener('click', () => {
  modalInfo.classList.add('hidden');
  orderForm.classList.remove('hidden');
});

orderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(orderForm);
  const body =
    `Name: ${formData.get('name')}` + '\n' +
    `Email: ${formData.get('email')}` + '\n' +
    `Address: ${formData.get('address')}` + '\n' +
    `Design Code: ${formData.get('design')}` + '\n' +
    `Notes: ${formData.get('notes')}`;
  window.location.href = `mailto:orders@schwarzusa.us?subject=Card%20Order&body=${encodeURIComponent(body)}`;
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
