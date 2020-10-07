import { resolve, join } from 'path';

const rootDir = resolve(__dirname);

module.exports = {
  alias: {
    '/@vue-query/*/': join(rootDir, 'src'),
    '/@app/*/': join(rootDir, 'app')
  },
  root: join(rootDir, 'example'),
  base: ''
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
};
