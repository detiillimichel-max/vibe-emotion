import React, { useState } from "react";
import { registerUser } from "./authService";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(email, username);
      alert("Conta criada! Verifique seu e-mail.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Criar Conta</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
