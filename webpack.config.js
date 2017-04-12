var IS_DEV = true;

module.exports = {
  entry: {
     bundle: './main.ts',
     polyfill: './polyfill.ts'
  },
  output: {
    filename: './build/[name].js'
  },
  resolve: {
    extensions: ['*', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' },
      {test: /hiredis/, loader: IS_DEV ? 'noop' : 'noop'}
    ]
  },
  target: 'node'
};
