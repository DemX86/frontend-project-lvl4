import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV || 'development';

export default {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    clean: true,
    path: path.resolve('dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    compress: true,
    port: 8090,
    host: '0.0.0.0',
    // publicPath: '/assets/',
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
