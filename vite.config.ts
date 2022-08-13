import { join } from "path";
import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            "@": join(__dirname, "src"),
        }
    },
   build: {
        outDir: join(__dirname, "docs")
   }
})
