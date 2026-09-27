// chain.js：校验链（上一帧摘要作为下一帧种子）
import { crc8 } from "./crc8.js";

export function crcChain(frames) {
  const digests = [];
  let seed = 0;
  let total = 0;
  let biggest = 0;
  let biggest_at = 0;
  frames.forEach(function (frame, spot) {
    const digest = crc8(frame, seed);
    digests.push(digest);
    total += digest;
    if (digest > biggest) {
      biggest = digest;
      biggest_at = spot + 1;
    }
    seed = digest;
  });
  return { digests, total, biggest, biggest_at };
}
