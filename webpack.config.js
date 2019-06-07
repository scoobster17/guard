const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (webpackEnvironment, options) => {

  // set the context for entry points
  const context = path.resolve(__dirname, 'src');

  // set the source map level based on mode
  const devtool = false;

  // set all CSS/JS entry points
  const entry = {
    index: ['./app/js/index.tsx', './app/css/index.scss'],
  };

  // set the webpack mode based on NODE_ENV
  const mode = 'production';

  // set rules for processing files/code
  const module = {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { publicPath: 'css/' } },
          { loader: 'css-loader', options: { sourceMap: false } },
          { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer') ] } },
          { loader: 'sass-loader', options: { minimize: true, sourceMap: false } },
        ],
      },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { configFileName: './src/app/tsconfig.json' } },
      { test: /\.jsx?$/, enforce: 'pre', loader: 'source-map-loader' }
    ]
  };

  // set optimisation configuration
  const optimization = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        'vendors~index': {
          chunks: (chunk) => chunk.name === 'index',
          name: 'vendors~index',
          test: /node_modules/,
        },
      }
    },
    usedExports: true,
  };

  // set output details
  const output = {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: ''
  };

  // mark files to process
  const resolve = { extensions: [ '.scss', '.css', '.js', '.jsx', '.ts', '.tsx' ] };

  // list plugins to be utilised
  const plugins = [
    new MiniCSSExtractPlugin({ filename: 'css/[name].css' }),
    new CopyWebpackPlugin([
      { from: 'app/assets/images', to: 'assets/images' },
    ]),
    // so we do not actually process our EJS template in the HtmlWebpackPlugin
    new webpack.LoaderOptionsPlugin({ options: { 'ejs-compiled-loader': { delimiter: '#' } } }),
    ...['index'].map((chunkName) => new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: `!!ejs-webpack-loader!src/shared/views/${ chunkName }.ejs`,
      filename: `../dist/shared/views/${ chunkName }.ejs`,
      chunks: [`${ chunkName }`, `vendors~${ chunkName }`],
    })),
  ];

  // limit webpack output to console
  const stats = 'minimal';

  // target
  const target = 'web';

  // return complete webpack configuration
  return {
    context,
    devtool,
    entry,
    mode,
    module,
    output,
    optimization,
    resolve,
    plugins,
    stats,
    target,
  }
};
