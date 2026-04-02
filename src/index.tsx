import React from "react";
import ReactDOM from "react-dom/client";

function ChatBubble({ text, isSender }: { text: string; isSender: boolean }) {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg mb-2 ${
        isSender
          ? "bg-green-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {text}
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 font-bold">Correio Eletrônico</div>

      <div className="flex-1 p-4 flex flex-col space-y-2 overflow-y-auto">
        <ChatBubble text="Oi Michel!" isSender={false} />
        <ChatBubble text="Oi, tudo bem?" isSender={true} />
        <ChatBubble text="Agora está com cara de WhatsApp 😎" isSender={true} />
      </div>

      <div className="p-4 flex items-center bg-white border-t">
        <input
          type="text"
          placeholder="Sua vibe..."
          className="flex-1 border rounded-lg px-4 py-2 mr-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Enviar
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
