// chain.js：校验链（基线：一律给空表）
import { crc8 } from "./crc8.js";

export function crcChain(frames) {
  return { digests: [], total: 0, biggest: 0, biggest_at: 0 };
}
