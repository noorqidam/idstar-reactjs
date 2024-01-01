import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: "/src",
      },
    },
    define: {
      "process.env": JSON.stringify(
        dotenv.config({ path: `./.env.${mode}` }).parsed
      ),
    },
  };
});
