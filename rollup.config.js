import path from 'path';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import size from 'rollup-plugin-size';

const configs = [
  {
    input: 'src/index.ts',
    file: 'dist/vue-query.esm-development.js',
    format: 'es',
    browser: true,
    env: 'development',
    sourcemap: true,
  },
  {
    input: 'src/index.ts',
    file: 'dist/vue-query.esm-production.min.js',
    format: 'es',
    browser: true,
    env: 'production',
    minify: true,
    sourcemap: true,
  },
  {
    input: 'src/index.ts',
    file: 'dist/vue-query.umd-development.js',
    format: 'umd',
    env: 'development',
    sourcemap: true,
    browser: true,
  },
  {
    input: 'src/index.ts',
    file: 'dist/vue-query.umd-production.min.js',
    format: 'umd',
    env: 'production',
    sourcemap: true,
    minify: true,
    browser: true,
  },
];

function createEntries() {
  return configs.map((c) => createEntry(c));
}

function createEntry(config) {
  const rollup = {
    input: config.input,
    plugins: [],
    output: {
      file: config.file,
      format: config.format,
      globals: {
        vue: 'Vue',
      },
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };

  if (config.format === 'iife' || config.format === 'umd') {
    rollup.output.name = 'VueQuery';
  }

  rollup.plugins.push(
    replace({
      __DEV__:
        config.format === 'es' && !config.browser
          ? `(process.env.NODE_ENV !== 'production')`
          : config.env !== 'production',
    }),
  );

  rollup.plugins.push(resolve({ browser: true }));
  rollup.plugins.push(commonjs());

  rollup.plugins.push(
    ts({
      check: config.format === 'es' && config.browser && config.env === 'development',
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
      tsconfigOverride: {
        compilerOptions: {
          target: config.format === 'iife' || config.format === 'umd' ? 'es5' : 'es2018',
        },
        exclude: ['test'],
      },
    }),
  );

  if (config.env === 'production') {
    rollup.plugins.push(size());
    rollup.plugins.push(visualizer({
      filename: 'dist/stats-vue.json',
      json: true,
    }));
  }

  if (config.minify) {
    rollup.plugins.push(terser({ module: config.format === 'es' }));
  }

  return rollup;
}

export default createEntries();
