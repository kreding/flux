var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// define plugins
var plugins = [
        new webpack.DefinePlugin({
            __DEV__: '1' == process.env.dev ? true : false,
            __PDT__: '1' == process.env.pdt ? true : false
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          filename: './js/common.js',
          minChunks: Infinity
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.MinChunkSizePlugin(800)
    ];

if('1' == process.env.pdt){
  plugins.push( new webpack.optimize.UglifyJsPlugin() );
}

module.exports = {
  entry: {
  	index: './src/js/index.jsx'
  },

  output: {
    path: 'dist',
    filename: './js/[name].js',
    chunkFilename: './js/[id].[name].js'
  },

  module: {
    loaders: [
      	{test: /\.jsx$/, loader: 'jsx-loader?harmony!babel-loader'},
      	{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      	{test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'stylus-loader')},
      	{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      	{test: /\.tpl$/, loader: 'html-loader'},
      	{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[path][name].[ext]'},
        {test: /\.woff$/,   loader: "url?limit=10000&minetype=application/font-woff"},
        {test: /\.ttf$/,    loader: "file"},
        {test: /\.eot$/,    loader: "file"},
        {test: /\.svg$/,    loader: "file"}
    ]
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: plugins
}
