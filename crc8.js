// crc8.js：一帧的八位校验（多项式 0x07，逐字节先异或再移位八次）
export function crc8(frame, seed) {
  let value = (seed | 0) & 0xff;
  for (const byte of frame) {
    if (typeof byte !== "number" || !Number.isInteger(byte) || byte < 0 || byte > 255) {
      const error = new Error("帧里的字节必须是 0 到 255 之间的整数");
      error.code = "E_BAD_BYTE";
      throw error;
    }
    value ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      value = (value & 0x80) ? ((value << 1) ^ 0x07) & 0xff : (value << 1) & 0xff;
    }
  }
  return value;
}
