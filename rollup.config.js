import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import babili from 'rollup-plugin-babili';
import replace from 'rollup-plugin-replace';

const config = {
  moduleName: 'Reactstrap',
  entry: 'src/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      plugins: ['external-helpers'],
    }),
  ],
  sourceMap: true,
  external: [
    'react',
    'react-dom',
    'react-transition-group',
  ],
  // Used for the UMD bundles
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-transition-group': 'ReactTransitionGroup',
  },
  targets: [
    { dest: 'dist/reactstrap.es.js', format: 'es' },
    { dest: 'dist/reactstrap.min.js', format: 'umd' },
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(babili({ comments: false }));
  config.plugins.push(replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
}

export default config;
