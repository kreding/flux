var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/js/index.jsx',

  output: {
    path: 'dist/js',
    filename: 'index.js'
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?harmony!babel-loader'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      // {test: /\.styl$/, loader: 'style-loader!stylus-loader'},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'stylus-loader')},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
      // {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: [
    new webpack.optimize.MinChunkSizePlugin(800),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
  ]
}
