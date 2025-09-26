import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cswgmnlscrusfgljbyqy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzd2dtbmxzY3J1c2ZnbGpieXF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg4NzY0NSwiZXhwIjoyMDc0NDYzNjQ1fQ.O7rIbOC4w9Z-MT2G0tfEhydqJTz_FlKPHq6QdEkMCFc";

export const supabase = createClient(supabaseUrl, supabaseKey);
