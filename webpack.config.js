var webpack = require('webpack');

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
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  }
}
