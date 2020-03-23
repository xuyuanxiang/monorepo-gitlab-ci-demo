import typescript from 'rollup-plugin-typescript2';
import tts from 'ttypescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';

const compilerOptions = {
  module: 'es2015',
  plugins: [
    {
      transform: 'typescript-plugin-styled-components',
      type: 'config',
      minify: true,
      ssr: true,
    },
  ],
};

const tsconfigOverride = {
  exclude: ['**/__*__/'],
  compilerOptions,
};

const tsConfig = {
  typescript: tts,
  objectHashIgnoreUnknownHack: true,
  tsconfigOverride,
};

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external: ['react', 'react-dom', 'styled-components', 'clsx'],
    plugins: [
      resolve(),
      typescript({
        ...tsConfig,
        tsconfigOverride: {
          ...tsconfigOverride,
          compilerOptions: { ...compilerOptions, declaration: true, sourceMap: true },
        },
      }),
      url({ limit: 1024 * 1024 }),
      commonjs({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
    },
    external: ['react', 'react-dom', 'styled-components', 'clsx'],
    plugins: [
      resolve(),
      typescript(tsConfig),
      url({ limit: 1024 * 1024 }),
      commonjs({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      terser({
        output: {
          comments: false,
        },
        compress: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          drop_console: true,
        },
      }),
    ],
  },
];
