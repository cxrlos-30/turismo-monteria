const supabaseUrl = "https://jpodasszxzymikhwjfnp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwb2Rhc3N6eHp5bWlraHdqZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1Njg4NTMsImV4cCI6MjA5MjE0NDg1M30.k3ib4INFgGYuoXg6ZcbO8plkX02xN3wLC3zKgVuI0N4";

window._supabase = supabase.createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);