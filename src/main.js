import { StyleChanger } from "./scripts/StyleChanger";
import { PdfExporter } from "./scripts/PdfExporter";

StyleChanger.updateView();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    StyleChanger.updateView();
  }, 80);
});

document.addEventListener("DOMContentLoaded", () => {
  PdfExporter.init();
});
