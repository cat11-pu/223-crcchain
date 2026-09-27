// crc8.js：一帧的八位校验（多项式 0x07，种子接续）
export function crc8(frame, seed) {
  let crc = (seed || 0) & 0xff;
  for (const byte of frame) {
    if (typeof byte !== "number" || !Number.isInteger(byte) || byte < 0 || byte > 255) {
      const error = new Error("字节必须是 0 到 255 之间的整数");
      error.code = "E_BAD_BYTE";
      throw error;
    }
    crc = (crc ^ byte) & 0xff;
    for (let bit = 0; bit < 8; bit += 1) {
      if (crc & 0x80) {
        crc = ((crc << 1) ^ 7) & 0xff;
      } else {
        crc = (crc << 1) & 0xff;
      }
    }
  }
  return crc;
}
