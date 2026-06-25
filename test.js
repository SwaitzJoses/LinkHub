import { supabase } from './supabase.js'

async function loadBusiness() {
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('business')

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single()

  console.log(data)

  if (error) {
    console.log(error)
    return
  }

  document.getElementById('name').textContent = data.name
  document.getElementById('description').textContent = data.description
  document.getElementById('logo').src = data.logo

  document.getElementById('call').href =
    `tel:${data.phone}`

  document.getElementById('maps').href =
    data.maps

  document.getElementById('instagram').href =
    data.instagram

  document
    .querySelectorAll('a')
    .forEach(button => {
      button.style.background =
        data.theme_color
    })
}

loadBusiness()