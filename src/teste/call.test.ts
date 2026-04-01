import { describe, it, expect } from "vitest";
import { startCall, endCall } from "../calls/callService";

describe("Calls Module", () => {
  it("deve iniciar chamada", async () => {
    const fakeVideo = document.createElement("video");
    const result = await startCall("room1", fakeVideo, fakeVideo);
    expect(result).toBeUndefined(); // startCall não retorna, mas deve executar sem erro
  });

  it("deve encerrar chamada", () => {
    const result = endCall("room1");
    expect(result).toBeUndefined();
  });
});
