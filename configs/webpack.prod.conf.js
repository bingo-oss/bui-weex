const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const os = require('os');
const webpack = require('webpack');

const config = require('./config');
const helper = require('./helper');

/**
 * Webpack Plugins
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Webpack configuration for weex.
 */
commonConfig[1].module.rules[0].exclude = config.excludeModuleReg;
commonConfig[1].module.rules[1].exclude = config.excludeModuleReg;
const weexConfig = webpackMerge(commonConfig[1], {
    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
        /**
         * Plugin: webpack.DefinePlugin
         * Description: The DefinePlugin allows you to create global constants which can be configured at compile time.
         *
         * See: https://webpack.js.org/plugins/define-plugin/
         */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': config.prod.env
            }
        }),
          /*
          * uglifyjs-webpack-plugin,与webpack-uglify-parallel使用方式类似，优势在于完全兼容webpack.optimize.UglifyJsPlugin中的配置，可以通过uglifyOptions写入，因此也做为推荐使用
          *
          * See: https://www.npmjs.com/package/uglifyjs-webpack-plugin
          */
          new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                mangle: true,
                output: { comments: false },
                compress: { warnings: false }
            },
            sourceMap: false,
            cache: true,
            parallel: os.cpus().length * 2
          }),
          // Need to run uglify first, then pipe other webpack plugins
          ...commonConfig[1].plugins
    ]
})

/**
* Webpack configuration for web.
*/
const webConfig = webpackMerge(commonConfig[0], {
  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: config.prod.devtool,
  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: helper.rootNode('./dist'),
    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].web.js',
    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[name].web.map'
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    /**
     * Plugin: webpack.DefinePlugin
     * Description: The DefinePlugin allows you to create global constants which can be configured at compile time. 
     *
     * See: https://webpack.js.org/plugins/define-plugin/
     */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': config.prod.env
      }
    }),
    /*
    * uglifyjs-webpack-plugin,与webpack-uglify-parallel使用方式类似，优势在于完全兼容webpack.optimize.UglifyJsPlugin中的配置，可以通过uglifyOptions写入，因此也做为推荐使用
    *
    * See: https://www.npmjs.com/package/uglifyjs-webpack-plugin
    */
    new UglifyJsPlugin({
      uglifyOptions: {
          ie8: false,
          ecma: 8,
          mangle: true,
          output: { comments: false },
          compress: { warnings: false }
      },
      sourceMap: false,
      cache: true,
      parallel: os.cpus().length * 2
    }),
  ]
});

module.exports = [weexConfig, webConfig]
