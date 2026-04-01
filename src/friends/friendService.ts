import { supabase } from "../lib/supabaseClient";

/**
 * Busca lista de amigos
 */
export async function getFriends(userId: string) {
  const { data, error } = await supabase
    .from("friends")
    .select("id, username")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}

/**
 * Adiciona novo amigo
 */
export async function addFriend(userId: string, friendId: string) {
  const { data, error } = await supabase
    .from("friends")
    .insert({ user_id: userId, friend_id: friendId });
  if (error) throw error;
  return data;
}

/**
 * Remove amigo
 */
export async function removeFriend(userId: string, friendId: string) {
  const { data, error } = await supabase
    .from("friends")
    .delete()
    .eq("user_id", userId)
    .eq("friend_id", friendId);
  if (error) throw error;
  return data;
}
