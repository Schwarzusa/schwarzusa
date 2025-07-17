const modal = document.getElementById('orderModal');
const modalInfo = document.getElementById('modalInfo');
const paymentInfo = document.getElementById('paymentInfo');
const authorizeBtn = document.getElementById('authorizeBtn');

function openOrderModal() {
  modal.classList.remove('hidden');
  modalInfo.classList.remove('hidden');
  paymentInfo.classList.add('hidden');
}

document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', openOrderModal);
});

document.getElementById('acknowledgeBtn').addEventListener('click', () => {
  modalInfo.classList.add('hidden');
  paymentInfo.classList.remove('hidden');
});
authorizeBtn.addEventListener('click', () => {
  const signature = document.getElementById('signature').value.trim();
  if (!signature) {
    alert('Please type your name to authorize.');
    return;
  }
  window.location.href = 'https://square.link/u/uDJCvlMf';
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
