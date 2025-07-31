import { StyleChanger } from "./scripts/StyleChanger";
import { PdfExporter } from "./scripts/PdfExporter";
import { ContentEditor } from "./scripts/ContentEditor";

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
  ContentEditor.init();

  const resetButton = document.createElement("button");
  resetButton.textContent = "Сбросить изменения";
  resetButton.id = "reset-content-btn";
  resetButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
  `;
  resetButton.addEventListener("click", () => {
    if (confirm("Вы уверены, что хотите сбросить все сохраненные изменения?")) {
      ContentEditor.clearAllSavedContent();
    }
  });
  document.body.appendChild(resetButton);
});
