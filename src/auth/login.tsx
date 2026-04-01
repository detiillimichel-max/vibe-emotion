import React, { useState } from "react";
import { signInWithEmail } from "./authService";

export function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmail(email);
      alert("Verifique seu e-mail para o link mágico!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
