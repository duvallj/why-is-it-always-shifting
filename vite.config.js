import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: "index.html",
        "content-script": "src/content_scripts/analyze.ts",
        background: "src/service_worker/background.ts",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content-script") {
            return "content_scripts/analyze.js";
          }
          if (chunkInfo.name === "background") {
            return "service_worker/background.js";
          }
          return "[name].js";
        },
      },
    },
  },
});
