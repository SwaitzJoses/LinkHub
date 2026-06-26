import { supabase } from './supabase.js';

let createdLink = '';

// Hide buttons initially
document.getElementById('copy').style.display = 'none';
document.getElementById('open').style.display = 'none';

// Auto slug
document.getElementById('name').addEventListener('input', () => {
  document.getElementById('slug').value =
    document.getElementById('name').value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');
});

// Logo preview
document.getElementById('logo').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById('logoPreview');
  preview.src = URL.createObjectURL(file);
  preview.style.display = 'block';
};

// Upload logo to Supabase Storage
async function uploadLogo(file) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from('logos')
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert('Logo upload failed');
    return null;
  }

  const { data } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// Create Business
document.getElementById('save').onclick = async () => {
  const name = document.getElementById('name').value;
  const slug = document.getElementById('slug').value;
  const phone = document.getElementById('phone').value;
  const description = document.getElementById('description').value;
  const maps = document.getElementById('maps').value;
  const instagram = document.getElementById('instagram').value;
  const gallery = document.getElementById('gallery').value;
 const theme_color =
  document.getElementById('theme').value;
  const whatsapp =
    document.getElementById('whatsapp')?.value || '';

  let logo = '';

  const logoFile =
    document.getElementById('logo').files[0];

  if (logoFile) {
    logo = await uploadLogo(logoFile);
  }
const themeInput =
  document.getElementById('theme');

const colorValue =
  document.getElementById('colorValue');

themeInput.addEventListener('input', () => {
  colorValue.textContent =
    themeInput.value;
});
  const { data, error } = await supabase
    .from('businesses')
    .insert([
      {
        name,
        slug,
        phone,
        description,
        logo,
        maps,
        instagram,
        gallery,
        theme_color,
        whatsapp
      }
    ]);

  console.log(data);
  console.log(error);

  if (error) {
    alert(error.message);
    return;
  }

  createdLink =
    `http://127.0.0.1:5500/index.html?business=${slug}`;

  alert(`Business Created!\n\n${createdLink}`);

  document.getElementById('copy').style.display =
    'inline-block';

  document.getElementById('open').style.display =
    'inline-block';
};

// Copy link
document.getElementById('copy').onclick = () => {
  navigator.clipboard.writeText(createdLink);
  alert('Link copied!');
};

// Open website
document.getElementById('open').onclick = () => {
  window.open(createdLink, '_blank');
};