// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "帧 " + (spec.frames || []).length + " 条，点按钮算校验链。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.frames || []).forEach(function (frame, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "帧 " + (spot + 1) + "（" + frame.length + " 字节）";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.round(view.digests[spot] * 100 / 255)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + ((spot + 1 === view.biggest_at) ? " ok" : "");
      mark.textContent = "摘要 " + view.digests[spot];
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "摘要合计 " + view.total + "，最大 " + view.biggest + " 在第 " + view.biggest_at + " 帧";
    parts.log.textContent = view.count + " 帧，" + (view.chain_ok ? "链路一致" : "链路不一致");
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算校验链";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一帧";
  addButton.addEventListener("click", function () {
    spec.frames = (spec.frames || []).concat([[1, 2, 3]]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const emptyButton = document.createElement("button");
  emptyButton.textContent = "追加空帧";
  emptyButton.addEventListener("click", function () {
    spec.frames = (spec.frames || []).concat([[]]);
    draw();
  });
  parts.controls.appendChild(emptyButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "删最后一帧";
  dropButton.addEventListener("click", function () {
    spec.frames = (spec.frames || []).slice(0, Math.max(0, (spec.frames || []).length - 1));
    draw();
  });
  parts.controls.appendChild(dropButton);

  draw();
}
