// src/chat/chat.tsx
import React, { useState } from "react";
import { useChat } from "./useChat";
import MessageBuble from "./MessageBuble";
import ImageUploader from "./ImageUploader";
import AudioRecorder from "./AudioRecorder";

interface Props {
  roomId: string;
  currentUserId: string;
  receiverId: string;
  currentUserPhoto: string; // URL da foto do usuário
  currentUserName: string;  // Nome do usuário
}

export default function Chat({ roomId, currentUserId, receiverId, currentUserPhoto, currentUserName }: Props) {
  const { messages, send } = useChat(roomId);
  const [text, setText] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);

  const handleSend = async () => {
    if (text.trim() === "") return;
    await send(currentUserId, receiverId, text, "text");
    setText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Cabeçalho com foto e nome */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <img src={currentUserPhoto} alt="foto" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }} />
        <span style={{ fontWeight: "bold" }}>{currentUserName}</span>
      </div>

      {/* Lista de mensagens */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((msg) => (
          <MessageBuble key={msg.id} message={msg} currentUserId={currentUserId} />
        ))}
      </div>

      {/* Campo de envio */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px", borderTop: "1px solid #ccc" }}>
        {/* Ícone + abre uploader */}
        <button onClick={() => setShowUploader(!showUploader)} style={{ marginRight: 8 }}>+</button>
        
        {/* Ícone áudio abre gravador */}
        <button onClick={() => setShowRecorder(!showRecorder)} style={{ marginRight: 8 }}>🎤</button>
        
        {/* Campo de texto */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Sua vibe..."
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        
        {/* Botão enviar */}
        <button onClick={handleSend} style={{ marginLeft: 8, padding: "10px 20px", borderRadius: "8px", background: "#4a90e2", color: "#fff", border: "none" }}>
          ➤
        </button>
      </div>

      {/* Uploader de imagem */}
      {showUploader && <ImageUploader roomId={roomId} senderId={currentUserId} receiverId={receiverId} />}
      
      {/* Gravador de áudio */}
      {showRecorder && <AudioRecorder roomId={roomId} senderId={currentUserId} receiverId={receiverId} />}
    </div>
  );
}