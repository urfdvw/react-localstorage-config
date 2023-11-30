import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve("src", "react-user-config/index.jsx"),
            name: "react-user-config",
            fileName: (format) => `react-user-config.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
        outDir: "./release",
    },
    plugins: [react()],
});
