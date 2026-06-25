import { supabase }
from './supabase.js'

export async function
getBusiness(slug) {

  const { data, error } =
    await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .single()

  if (error) {
    console.log(error)
    return null
  }

  return data
}