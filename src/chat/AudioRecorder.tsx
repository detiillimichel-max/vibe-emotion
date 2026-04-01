import React, { useState } from "react";
import { uploadAudio } from "./chatService";

export function AudioRecorder({ onSend }: { onSend: (url: string) => void }) {
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    // Aqui você integraria MediaRecorder API
    setRecording(true);
  };

  const stopRecording = async () => {
    setRecording(false);
    // Simulação: enviar arquivo de áudio
    const fakeFile = new File(["audio"], "voice.mp3", { type: "audio/mp3" });
    const url = await uploadAudio(fakeFile);
    onSend(url);
  };

  return (
    <button onClick={recording ? stopRecording : startRecording}>
      {recording ? "⏹️" : "🎤"}
    </button>
  );
}
