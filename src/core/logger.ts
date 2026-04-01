/**
 * Logger simples para monitorar eventos
 * - info: mensagens informativas
 * - warn: alertas
 * - error: erros críticos
 */

export const logger = {
  info: (msg: string, data?: any) => {
    console.log(`[INFO] ${msg}`, data || "");
  },
  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${msg}`, data || "");
  },
  error: (msg: string, err?: any) => {
    console.error(`[ERROR] ${msg}`, err || "");
  },
};
