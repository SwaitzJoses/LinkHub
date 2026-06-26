import { supabase } from './supabase.js';

let business;

async function load() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('business');

  if (!slug) {
    document.body.innerHTML = '<h1>Business not found</h1>';
    return;
  }

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.log(error);
    document.body.innerHTML = '<h1>Business not found</h1>';
    return;
  }

  business = data;

  // Logo
  if (business.logo) {
    document.getElementById('logo').src = business.logo;
  }

  // Name
  document.getElementById('name').textContent =
    business.name || '';

  // Description
  const desc = document.getElementById('description');
  if (desc) {
    desc.textContent =
      business.description || '';
  }

  // Phone
  document.getElementById('call').href =
    `tel:${business.phone}`;

  // WhatsApp
  document.getElementById('whatsapp').href =
    `https://wa.me/${business.whatsapp || business.phone}`;

  // Maps
  document.getElementById('maps').href =
    business.maps || '#';

  // Instagram
  document.getElementById('instagram').href =
    business.instagram || '#';

  // Theme color
document
  .querySelectorAll('.color-option')
  .forEach(circle => {
    circle.style.background =
      circle.dataset.color;

    circle.onclick = () => {
      document.getElementById('theme').value =
        circle.dataset.color;
    };
  });

    ['call', 'whatsapp', 'maps', 'instagram']
  .forEach(id => {
    document.getElementById(id).style.background =
      business.theme_color;
  });
  }

  // Share Button
  const shareBtn =
    document.getElementById('share');

  if (shareBtn) {
    shareBtn.onclick = async (e) => {
      e.preventDefault();

      const url = window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({
            title: business.name,
            text: `Check out ${business.name}`,
            url
          });
        } catch (err) {
  if (err.name !== 'AbortError') {
    console.error(err);
  }
}
      } else {
        await navigator.clipboard.writeText(
          url
        );
        alert('Link copied!');
      }
    };
  }



// new QRCode(
//   document.getElementById('qrcode'),
//   {
//     text: window.location.href,
//     width: 150,
//     height: 150
//   }
// );
load();