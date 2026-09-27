// app.js：渲染结果
import { crc8 } from "./crc8.js";
import { crcChain } from "./chain.js";

export function render(spec) {
  const frames = spec.frames || [];
  const view = crcChain(frames);
  const digests = view.digests || [];
  const chainOk = digests.every(function (value, spot) {
    const seed = spot === 0 ? 0 : digests[spot - 1];
    return value === crc8(frames[spot], seed);
  });
  return { digests: digests, total: view.total || 0, biggest: view.biggest || 0,
           biggest_at: view.biggest_at || 0, count: digests.length,
           chain_ok: chainOk, tail: crc8([], 7) };
}
