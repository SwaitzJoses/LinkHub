import { createClient }
from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl =
'https://kfljpjdtvtespczktdoc.supabase.co'

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbGpwamR0dnRlc3Bjemt0ZG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTIyMjgsImV4cCI6MjA5Nzk2ODIyOH0.S4bqlfor-ob-sZep-yuCCSjYWQIgkjxQWodWeAbxqR8'

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  )