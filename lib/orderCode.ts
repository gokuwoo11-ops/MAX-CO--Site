import { randomBytes } from "crypto";

export function createOrderCode() {
  const part = randomBytes(3).toString("hex").toUpperCase();
  const time = Date.now().toString(36).toUpperCase().slice(-4);
  return `MC-${time}-${part}`;
}
