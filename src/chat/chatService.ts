// src/chat/chatService.ts
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

// Enviar mensagens (texto, imagem ou áudio)
export async function sendMessage(
  roomId: string,
  senderId: string,
  receiverId: string,
  content: string,
  type: "text" | "audio" | "image" = "text"
) {
  const { error } = await supabase.from("messages").insert({
    room_id: roomId,
    sender_id: senderId,
    receiver_id: receiverId,
    content,
    type,
  });

  if (error) throw error;
}