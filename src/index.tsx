import React from "react";
import ReactDOM from "react-dom/client";
import { initApp } from "./core/init";
import { Login } from "./auth/login";
import { Register } from "./auth/register";
import { ResetPassword } from "./auth/resetPassword";
import { ChatDrawer } from "./chat/ChatDrawer";
import { CallScreen } from "./calls/CallScreen";
import { ProfileDrawer } from "./profile/ProfileDrawer";
import { FriendList } from "./friends/FriendList";
import { GeminiInput } from "./ui/GeminiInput";
import "./ui/global.css";
import "./ui/animations.css";

function App() {
  // Inicializa o app
  React.useEffect(() => {
    initApp();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>OIO ONE</h1>

      {/* Autenticação */}
      <Login />
      <Register />
      <ResetPassword />

      {/* Chat */}
      <ChatDrawer />

      {/* Chamadas */}
      <CallScreen roomId="room1" />

      {/* Perfil */}
      <ProfileDrawer userId="user1" />

      {/* Amigos */}
      <FriendList userId="user1" />

      {/* Input estilizado */}
      <GeminiInput onSend={(msg) => console.log("Mensagem enviada:", msg)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
