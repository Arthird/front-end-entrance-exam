import { StyleChanger } from "./scripts/StyleChanger";
import { PdfExporter } from "./scripts/PdfExporter"; // Импорт нового класса

StyleChanger.updateView();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    StyleChanger.updateView();
  }, 80);
});

// Инициализируем PdfExporter после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  PdfExporter.init();
});
