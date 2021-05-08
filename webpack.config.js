module.exports = {
  mode: 'development',
  entry: './demo.js',
  output: {
    filename: 'demo.bundle.js',
    path: __dirname,
  },
  devtool: 'eval-cheap-module-source-map',
}
