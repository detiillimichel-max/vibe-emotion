import { supabase } from "../lib/supabaseClient";

// Upload de imagens
export async function uploadImage(file: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`chat/${Date.now()}-${file.name}`, file);

  if (error) throw error;
  return data.path;
}

// Upload de áudios
export async function uploadAudio(file: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from("voices")
    .upload(`chat/${Date.now()}-${file.name}`, file);

  if (error) throw error;
  return data.path;
}
