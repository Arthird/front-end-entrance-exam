// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync } from "fs";

// Получаем список SCSS-файлов из /src/styles
const stylesDir = resolve(__dirname, "src/styles");
const styleFiles = readdirSync(stylesDir).filter(
  (file) => file.endsWith(".scss") && !file.includes("index")
);

// Генерируем объект входных точек
const input = {};
styleFiles.forEach((file) => {
  const name = file.replace(".scss", "");
  input[name] = resolve(stylesDir, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input,
      output: {
        entryFileNames: "assets/[name].js", // на всякий случай, если будут JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "styles/[name].css"; // Все CSS — в /dist/styles/
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
  // Чтобы в dev-режиме /src/styles/*.scss тоже работали
  server: {
    hmr: true,
  },
});
