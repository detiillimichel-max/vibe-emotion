/**
 * Gerencia notificações push usando Service Workers
 * - Registra o service worker
 * - Solicita permissão ao usuário
 * - Envia notificações
 */

export async function registerPush() {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker não suportado.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("Service Worker registrado:", registration);

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Permissão de notificação negada.");
      return;
    }

    console.log("Permissão de notificação concedida.");
  } catch (err) {
    console.error("Erro ao registrar push:", err);
  }
}

export function sendNotification(title: string, body: string) {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/icons/icon-192.png" });
  }
}
