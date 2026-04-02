import React from "react";
import ReactDOM from "react-dom/client";
import { supabase } from "./lib/supabaseClient";

function App() {
  return <h1>Correio Eletrônico rodando 🚀</h1>;
}

// Teste de conexão com Supabase
supabase.from("profiles").select("*").then((res) => {
  console.log("Teste Supabase:", res);
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
