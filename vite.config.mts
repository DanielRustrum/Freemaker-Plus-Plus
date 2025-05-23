import { resolve } from 'node:path'
import { transformerDirectives } from 'unocss'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    unocss({
      transformers: [transformerDirectives()],
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, './src/extension.ts'),
      name: 'extension',
      fileName: 'extension',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['vscode'],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
