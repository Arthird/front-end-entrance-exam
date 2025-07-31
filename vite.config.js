import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync } from "fs";

const stylesDir = resolve(__dirname, "src/styles");
const styleFiles = readdirSync(stylesDir).filter(
  (file) => file.endsWith(".scss") && !file.includes("index")
);

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
        entryFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "styles/[name].css";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },

  server: {
    hmr: true,
  },
});
