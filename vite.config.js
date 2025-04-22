// * eslint - disable import /no-extraneous-dependencies */
/* eslint-disable consistent-return */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     port: 3000
//   },
//   plugins: [react()],
//   esbuild: {
//     jsxFactory: 'h',
//     jsxFragment: 'Fragment',
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         quietDeps: true
//       }
//     }
//   }
// })
dotenv.config();
const port = process.env.VITE_APP_PORT
	? parseInt(process.env.VITE_APP_PORT, 10)
	: 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port,
    allowedHosts: ["bo-dev.orionstarsweeps.com","http://65.0.72.144:3001","http://65.0.72.144:3000"],
  },
  preview: {
    port,
  },
  build: {
    minify: 'terser', // Use Terser for smaller builds
    sourcemap: false, // Disable source maps in production
    assetsInlineLimit: 4096, // Inline assets below this size
    cssCodeSplit: true, // Enable CSS code splitting
    cssMinify: true,
  },
});
