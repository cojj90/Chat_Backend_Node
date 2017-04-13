var IS_DEV = true;

var webpack = require('webpack');
var path = require('path');
var nodeRoot = path.join( __dirname, 'node_modules' );
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = function () {
  return {
    entry: {
      bundle: './src/main.ts'
      // ,polyfill: './polyfill.ts'
    },
    output: {
      filename: './build/[name].js'
    },
    externals: nodeModules,
    resolve: {
      extensions: ['*', '.ts', '.js']
    },
    module: {
      loaders: [
        { test: /.ts$/, loader: 'awesome-typescript-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /(\.md|\.map)$/, loader: 'null-loader'},
        { test: /hiredis/, loader: IS_DEV ? 'noop' : 'noop' }
      ]
    },
    target: 'node',
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify("5fa3b9"),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        TEST: function (x) { return x * x * x }
      }),
      new webpack.ProvidePlugin({
        //  BOBBIES: "./src/global2"
      })
    ]
  };
}

