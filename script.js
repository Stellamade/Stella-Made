const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const subject = encodeURIComponent(`Custom Order Request from ${data.get('name')}`);
  const body = encodeURIComponent(
`Hi Stella Made!

I'd like to place a custom order.

Name: ${data.get('name')}
Email: ${data.get('email')}
Item: ${data.get('item')}
Need it by: ${data.get('date') || 'Not specified'}
Font / lettering: ${data.get('font') || 'Open to suggestions'}
Preferred colors: ${data.get('colors') || 'Open to suggestions'}

Personalization / details:
${data.get('details')}

Thank you!`
  );

  // Replace this address with your final Stella Made business email.
  window.location.href = `mailto:hello@stellamade.com?subject=${subject}&body=${body}`;
});
