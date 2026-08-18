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


const itemSelect = orderForm.querySelector('select[name="item"]');
const livePriceValue = document.getElementById('livePriceValue');
const livePriceNote = document.getElementById('livePriceNote');
const productPricing = {
  'Blush Tote': ['$20.00','Personalized tote price.'],
  'Black Trim Tote': ['$20.00','Personalized tote price.'],
  'Ivory Tote': ['$20.00','Personalized tote price.'],
  'Natural Tote': ['$20.00','Personalized tote price.'],
  '4-Pack Mini Canvas Bags': ['$40.00','Price for a pack of 4 mini canvas bags.'],
  '6-Pack Mini Canvas Bags': ['$55.00','Price for a pack of 6 mini canvas bags.'],
  'Custom Banner': ['Starting at $50','Final price depends on customization.'],
  'Party Décor': ['Starting at $50','Final price depends on customization.'],
  'Personalized Gift': ['Starting at $50','Final price depends on customization.'],
  'Something Else': ['Custom pricing','Tell us what you have in mind and we’ll follow up.']
};
function updateLivePrice(){
  const p=productPricing[itemSelect.value]||productPricing['Something Else'];
  livePriceValue.textContent=p[0]; livePriceNote.textContent=p[1];
}
itemSelect.addEventListener('change',updateLivePrice); updateLivePrice();
document.querySelectorAll('.customize-link').forEach(link=>{
  link.addEventListener('click',()=>{itemSelect.value=link.dataset.product;updateLivePrice();});
});

orderForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formStatus.className = 'form-status full';
  formStatus.textContent = '';

  const formData = new FormData(orderForm);
  const shownPrice=(productPricing[formData.get('item')]||productPricing['Something Else']);
  formData.append('displayed_price',shownPrice[0]);
  formData.append('pricing_note',shownPrice[1]);
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


const carouselCards = Array.from(document.querySelectorAll('.carousel-card'));
const carouselDots = Array.from(document.querySelectorAll('.carousel-dot'));
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
let carouselPage = 0;

function showCarouselPage(page){
  carouselPage = (page + 2) % 2;
  carouselCards.forEach(card => {
    card.classList.toggle('active', Number(card.dataset.slide) === carouselPage);
  });
  carouselDots.forEach(dot => {
    dot.classList.toggle('active', Number(dot.dataset.page) === carouselPage);
  });
}

if (carouselPrev && carouselNext){
  carouselPrev.addEventListener('click', () => showCarouselPage(carouselPage - 1));
  carouselNext.addEventListener('click', () => showCarouselPage(carouselPage + 1));
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => showCarouselPage(Number(dot.dataset.page)));
  });
}
