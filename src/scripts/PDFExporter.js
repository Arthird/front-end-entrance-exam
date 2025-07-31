import html2pdf from "html2pdf.js";

export class PdfExporter {
  static init() {
    const button = document.getElementById("download-pdf-btn");
    if (button) {
      button.addEventListener("click", () => {
        PdfExporter.generatePdf();
      });
    } else {
      console.warn("Кнопка для скачивания PDF не найдена.");
    }
  }

  static generatePdf() {
    const element = document.querySelector("main");

    if (!element) {
      console.error("Элемент <main> не найден для генерации PDF.");
      alert("Ошибка: Не удалось найти содержимое страницы для PDF.");
      return;
    }

    // Добавляем временный класс
    document.body.classList.add("pdf-export");

    const options = {
      margin: [0, -5, 0, 0],
      filename: "Karthik_SR_Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    const button = document.getElementById("download-pdf-btn");
    const originalText = button ? button.textContent : "";

    if (button) {
      button.disabled = true;
      button.textContent = "Генерация...";
    }

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        document.body.classList.remove("pdf-export"); // Удаляем класс
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
        console.log("PDF успешно сгенерирован.");
      })
      .catch((err) => {
        document.body.classList.remove("pdf-export");
        console.error("Ошибка при генерации PDF:", err);
        alert("Произошла ошибка при создании PDF.");
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      });
  }
}
