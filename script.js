const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link =>
  link.addEventListener('click', () => nav.classList.remove('open'))
);

document.getElementById('year').textContent = new Date().getFullYear();

const orderForm = document.getElementById('orderForm');
const submitButton = document.getElementById('submitOrderBtn');
const formStatus = document.getElementById('formStatus');

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status full show ${type}`;
}

orderForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formStatus.className = 'form-status full';
  formStatus.textContent = '';

  const formData = new FormData(orderForm);
  formData.append('_subject', `New Stella Made Order Request — ${formData.get('name')}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');

  try {
    const response = await fetch('https://formsubmit.co/ajax/stellamadeorders@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    const result = await response.json();

    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error('Submission failed');
    }

    orderForm.reset();
    showStatus(
      'Thank you! We received your request. Stella Made will get back to you soon. ♡',
      'success'
    );
  } catch (error) {
    showStatus(
      'We couldn’t send your request just now. Please try again or message @shop.stellamade on Instagram.',
      'error'
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Order Request';
  }
});
