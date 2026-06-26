import { supabase }
from './supabase.js'
let createdLink = ''
document
  .getElementById('save')
  .onclick =
async () => {

  const name =
    document.getElementById('name').value

  const slug =
    document.getElementById('slug').value

  const phone =
    document.getElementById('phone').value
const description =
  document.getElementById('description').value

  const logo =
  document.getElementById('logo').value

  const maps =
  document.getElementById('maps').value

  const instagram =
  document.getElementById('instagram').value

  const gallery =
  document.getElementById('gallery').value

  const theme_color =
  document.getElementById('theme').value

  const { data, error } =
    await supabase
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
           theme_color
        }
      ])

  console.log(data)
  console.log(error)

 createdLink =
  `http://127.0.0.1:5500/index.html?business=${slug}`

alert(
  `Business Created!

${createdLink}`
)



document
  .getElementById('copy')
  .style.display = 'inline-block'

document
  .getElementById('open')
  .style.display = 'inline-block'
}

document
  .getElementById('copy')
  .onclick = () => {

  navigator.clipboard
    .writeText(createdLink)

  alert('Link copied!')
}

document
  .getElementById('open')
  .onclick = () => {

  window.open(
    createdLink,
    '_blank'
  )
}
