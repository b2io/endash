import camelCase from 'lodash/camelCase';
import babel from 'rollup-plugin-babel';
import babelMinify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const EXTERNALS = [
  'lodash/fp/cond',
  'lodash/fp/curry',
  'lodash/fp/flatMap',
  'lodash/fp/has',
  'lodash/fp/isFunction',
  'lodash/fp/isNil',
  'lodash/fp/take',
  'lodash/fp/takeRight',
];
const LODASH_MATCH = /^lodash(?:\/fp)?\/([a-z]+)/i;

const lodashMethodName = id => id.match(LODASH_MATCH)[1];

const LODASH_GLOBALS = EXTERNALS.filter(id => LODASH_MATCH.test(id)).reduce(
  (result, id) => Object.assign(result, { [id]: `_.${lodashMethodName(id)}` }),
  {},
);

const GLOBALS = Object.assign({}, LODASH_GLOBALS);

export default [
  {
    input: 'src/index.js',
    external: EXTERNALS,
    globals: GLOBALS,
    output: { file: pkg.browser, format: 'umd', name: camelCase(pkg.name) },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
      filesize(),
    ],
  },
  {
    input: 'src/index.js',
    external: EXTERNALS,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      babelMinify(),
      filesize(),
    ],
  },
];
