import React, { useEffect, useRef, useState } from "react";
import { startCall, endCall } from "./callService";

export function CallScreen({ roomId }: { roomId: string }) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    if (inCall) {
      startCall(roomId, localVideoRef.current!, remoteVideoRef.current!);
    }
    return () => {
      if (inCall) endCall(roomId);
    };
  }, [inCall, roomId]);

  return (
    <div style={{
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2>Chamada em Curso</h2>
      <video ref={localVideoRef} autoPlay muted style={{ width: "200px", borderRadius: "12px" }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: "200px", borderRadius: "12px" }} />
      <div style={{ marginTop: "20px" }}>
        {!inCall && <button onClick={() => setInCall(true)}>Iniciar</button>}
        {inCall && <button onClick={() => setInCall(false)}>Encerrar</button>}
      </div>
    </div>
  );
}
