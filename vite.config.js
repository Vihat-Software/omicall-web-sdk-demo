import { renameSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const OUTPUT_HTML_NAME = 'demo_v2.html';

// Build output is a single self-contained file, openable via file:// with no server:
//   dist/demo_v2.html  (JS/CSS/assets all inlined)
function renameOutputHtml() {
    return {
        name: 'rename-output-html',
        closeBundle() {
            renameSync('dist/index.html', `dist/${OUTPUT_HTML_NAME}`);
        },
    };
}

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteSingleFile(),
        renameOutputHtml(),
    ],
    base: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: 'dist',
    },
});
