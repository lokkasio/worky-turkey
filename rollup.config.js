import { terser } from 'rollup-plugin-terser'

function config ({ format, ext = 'js' }) {
  return {
    input: `./index.js`,
    output: {
      name: 'workyTurkey',
      file: `dist/worky-turkey.min.${ext}`,
      format
    },
    plugins: [terser()]
  }
}

export default [{ format: 'esm', ext: 'mjs' }, { format: 'iife' }].map(config)
