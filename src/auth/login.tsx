import React, { useState } from "react";
import { signUp, signIn } from "./authService";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await signUp(email, password, username, avatarUrl);
        alert("Usuário registrado com sucesso!");
      } else {
        await signIn(email, password);
        alert("Login realizado com sucesso!");
      }
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isRegister ? "Registrar" : "Login"}</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {isRegister && (
        <>
          <input placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="URL da foto de perfil" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        </>
      )}
      <button onClick={handleSubmit}>{isRegister ? "Registrar" : "Entrar"}</button>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister ? "Já tem conta? Faça login" : "Não tem conta? Registre-se"}
      </p>
    </div>
  );
}
