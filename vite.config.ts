import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error There is no @types/vite-plugin-sass
import sass from 'vite-plugin-sass';

// https://vite.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [react(), sass()],
})
