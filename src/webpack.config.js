module.exports = {
  context: __dirname,
  entry: "./App.js",

  output: {
    filename: "app.js",
    path: __dirname + '/assets'
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
  }
}
