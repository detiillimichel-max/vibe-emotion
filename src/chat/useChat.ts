import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  type: "text" | "audio" | "image";
  created_at: string;
}

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };

    fetchMessages();

    const channel = supabase
      .channel("room-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const sendMessage = async (
    senderId: string,
    receiverId: string,
    content: string,
    type: "text" | "audio" | "image" = "text"
  ) => {
    await supabase.from("messages").insert({
      sender_id: senderId,
      receiver_id: receiverId,
      room_id: roomId,
      content,
      type,
    });
  };

  return { messages, sendMessage };
}
