// chain.js：校验链（上一帧摘要当下一帧种子，一次扫描）
import { crc8 } from "./crc8.js";

export function crcChain(frames) {
  const digests = [];
  let total = 0;
  let biggest = 0;
  let biggest_at = 0;
  let seed = 0;
  frames.forEach(function (frame, spot) {
    const digest = crc8(frame, seed);
    digests.push(digest);
    total += digest;
    if (spot === 0 || digest > biggest) {
      biggest = digest;
      biggest_at = spot + 1;
    }
    seed = digest;
  });
  return { digests, total, biggest, biggest_at };
}
