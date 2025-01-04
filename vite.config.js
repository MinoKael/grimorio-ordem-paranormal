import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
const isProduction = process.env.NODE_ENV === 'production';
// https://vite.dev/config/
export default defineConfig({
    base: isProduction ? '/grimorio-ordem-paranormal/' : '',
    rollupOptions: {
        input: "src/main.js",
        format: "system",
        preserveEntrySignatures: true,
    },
    plugins: [
        vue({
            template: { transformAssetUrls},
        }),
        vuetify({
            autoImport: true,
        }),
    ],
})
