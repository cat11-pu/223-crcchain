import assert from "node:assert";
import { crc8 } from "../crc8.js";
import { crcChain } from "../chain.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("crc8 returns a number", () => {
  assert.strictEqual(typeof crc8([1, 2], 0), "number");
});

check("crcChain returns digests", () => {
  assert.ok(Array.isArray(crcChain([[1]]).digests));
});

check("crcChain returns biggest", () => {
  assert.strictEqual(typeof crcChain([[1]]).biggest, "number");
});

check("render counts frames", () => {
  assert.strictEqual(typeof render({ frames: [[1]] }).count, "number");
});

check("render exposes chain flag", () => {
  assert.strictEqual(typeof render({ frames: [[1]] }).chain_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
