export class ContentEditor {
  static STORAGE_KEY_PREFIX = "editable_content_";

  static init() {
    const editableElements = document.querySelectorAll("[data-editable]");

    editableElements.forEach((element) => {
      ContentEditor.restoreContent(element);

      element.addEventListener("click", () => {
        if (!element.hasAttribute("contenteditable")) {
          element.classList.add("editing");
          element.setAttribute("contenteditable", "true");
          element.focus();

          const range = document.createRange();
          range.selectNodeContents(element);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      });

      element.addEventListener("blur", () => {
        element.classList.remove("editing");
        element.removeAttribute("contenteditable");
        ContentEditor.saveContent(element);
      });

      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          element.blur();
        } else if (event.key === "Escape") {
          event.preventDefault();
          ContentEditor.restoreContent(element);
          element.blur();
        }
      });
    });
  }

  static generateStorageKey(element) {
    if (element.id) {
      return `${ContentEditor.STORAGE_KEY_PREFIX}${element.id}`;
    }
    let path = "";
    let current = element;
    while (current && current !== document.body) {
      const parent = current.parentElement;
      if (parent) {
        const index = Array.from(parent.children).indexOf(current);
        path = `_${index}${path}`;
      }
      current = parent;
    }
    return `${ContentEditor.STORAGE_KEY_PREFIX}path${path}`;
  }

  static saveContent(element) {
    const key = ContentEditor.generateStorageKey(element);
    const content = element.innerHTML;
    try {
      localStorage.setItem(key, content);
      console.log(
        `Содержимое элемента сохранено в localStorage по ключу: ${key}`
      );
    } catch (e) {
      console.error("Ошибка при сохранении содержимого в localStorage:", e);
      alert(
        "Не удалось сохранить изменения. Возможно, localStorage переполнен."
      );
    }
  }

  static restoreContent(element) {
    const key = ContentEditor.generateStorageKey(element);
    try {
      const savedContent = localStorage.getItem(key);
      if (savedContent !== null) {
        element.innerHTML = savedContent;
        console.log(
          `Содержимое элемента восстановлено из localStorage по ключу: ${key}`
        );
      }
    } catch (e) {
      console.error(
        "Ошибка при восстановлении содержимого из localStorage:",
        e
      );
    }
  }

  static clearAllSavedContent() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(ContentEditor.STORAGE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    console.log("Все сохраненные данные редактора удалены из localStorage.");
    location.reload();
  }
}
