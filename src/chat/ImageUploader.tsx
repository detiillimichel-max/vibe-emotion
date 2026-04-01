import React from "react";
import { uploadImage } from "./chatService";

export function ImageUploader({ onSend }: { onSend: (url: string) => void }) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = await uploadImage(e.target.files[0]);
    onSend(url);
  };

  return <input type="file" accept="image/*" onChange={handleFile} />;
}
