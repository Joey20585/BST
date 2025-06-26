const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  mode: 'development',

  target: 'web', // Changed from 'node' to 'web' for browser compatibility

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 8086,
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,           
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
