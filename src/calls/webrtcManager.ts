/**
 * Gerencia conexões WebRTC
 * - Cria RTCPeerConnection
 * - Configura ICE servers
 * - Adiciona tracks de áudio/vídeo
 */

export function createPeerConnection(
  localStream: MediaStream,
  onRemoteStream: (stream: MediaStream) => void
): RTCPeerConnection {
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "turn:turn.myserver.com:3478", username: "user", credential: "pass" }
    ]
  });

  // Adiciona tracks locais
  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

  // Recebe tracks remotas
  pc.ontrack = (event) => {
    onRemoteStream(event.streams[0]);
  };

  // ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Novo ICE candidate:", event.candidate);
      // Aqui você enviaria para o servidor de sinalização
    }
  };

  return pc;
}
