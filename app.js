import { getBusiness }
from './database.js'

async function load() {

  const params =
    new URLSearchParams(
      window.location.search
    )

  const slug =
    params.get('business')
    || 'audioatoms'

  const business =
    await getBusiness(slug)

  if (!business) {
    alert('Business not found')
    return
  }

  document.getElementById('logo').src =
    business.logo

  document.getElementById('name').innerText =
    business.name

  document.getElementById('description').innerText =
    business.description

  document.getElementById('call').href =
    `tel:${business.phone}`

  document.getElementById('whatsapp').href =
    `https://wa.me/91${business.phone}`

  document.getElementById('maps').href =
    business.maps

    document.getElementById('instagram').href =
  business.instagram


  const gallery =
  document.getElementById('gallery')

gallery.innerHTML = ''

if (business.gallery) {

  const images =
    business.gallery.split(',')

  images.forEach(url => {

    const img =
      document.createElement('img')

    img.src = url.trim()
    img.width = 120
    img.style.margin = '10px'
    img.style.borderRadius = '10px'

    gallery.appendChild(img)
  })
}


console.log(business.theme_color)


document
  .querySelectorAll('a')
  .forEach(button => {
    button.style.backgroundColor =
      business.theme_color.trim()
  })

  console.log(
  document.querySelector('#call').style.backgroundColor
)
}

load()