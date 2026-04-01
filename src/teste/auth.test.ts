import { describe, it, expect } from "vitest";
import { signInWithEmail, registerUser, resetPassword } from "../auth/authService";

describe("Auth Module", () => {
  it("deve registrar novo usuário", async () => {
    const result = await registerUser("teste@exemplo.com", "testeUser");
    expect(result).toBeDefined();
  });

  it("deve enviar link mágico de login", async () => {
    const result = await signInWithEmail("teste@exemplo.com");
    expect(result).toBeDefined();
  });

  it("deve enviar link de reset de senha", async () => {
    const result = await resetPassword("teste@exemplo.com");
    expect(result).toBeDefined();
  });
});
