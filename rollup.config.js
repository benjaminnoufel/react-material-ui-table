import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import remove from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/ReactMaterialUiTable.tsx',
  plugins: [remove({ targets: 'dist/*' }), typescript(), commonjs(), nodeResolve(), terser()],
  external: [
    '@material-ui',
    '@material-ui/core/Table',
    '@material-ui/core/TableHead',
    '@material-ui/core/TablePagination',
    '@material-ui/core/TableRow',
    '@material-ui/core/OutlinedInput',
    '@material-ui/core/TableCell',
    '@material-ui/core/TableContainer',
    '@material-ui/core',
    '@material-ui/core/styles/makeStyles',
    'react',
    'react-dom',
  ],
  output: {
    file: 'dist/ReactMaterialUiTable.js',
    format: 'cjs',
  },
}
