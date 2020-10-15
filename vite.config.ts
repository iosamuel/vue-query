import { resolve } from 'path'

module.exports = {
  alias: {
    '/@vue-query/': resolve(__dirname, 'src'),
    '/@app/': resolve(__dirname, 'app'),
  },
  root: resolve(__dirname, 'example'),
  base: '',
  /*assetsDir: '',
  emitAssets: true,
  emitIndex: false,
  rollupInputOptions: {
    external: ['vue'],
    // or whatever your entry file is
    input: {
      'alert/index': resolve(rootDir, 'packages/alert/index.ts'),
      'button/index': resolve(rootDir, 'packages/button/index.ts')
    }
  },
  rollupOutputOptions: {
    chunkFileNames: `[name].js`,
    dir: join(rootDir, 'dist'),
    entryFileNames: `[name].js`,
    exports: "named",
    file: null,
    format: "es",
    sourcemap: true
  },
  write: true*/
}
