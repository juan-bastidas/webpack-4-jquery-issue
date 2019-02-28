var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var relativePathToJs = './js';
var pathToJs = path.resolve(__dirname, relativePathToJs);

var lintFailOnError = true;
var cleanWebpackPluginPaths = ['local'];

var amdShim = [];

var config = new WebpackConfig.Config().merge({

    mode: 'development',

    entry: {
        common: ['common'],
        page1: ['page1'],
        page2: ['page2'],
        page3: ['page3'],
    },

    output: {

        pathinfo: true,

        path: path.resolve(pathToJs, 'local', 'build'),
        publicPath: path.join('/', 'js', 'local', 'build', '/'),

        // Naming for entry chunks
        filename: '[name].js', // Template based on keys in "entry" above

        // Naming for non-entry chunks
        chunkFilename: '[name].bundle.js',

        jsonpFunction: 'pk',

        sourcePrefix: '',

    },

    resolveLoader: {

        modules: [
            path.join(__dirname, 'web_loaders'),
            path.join(__dirname,'web_modules'),
            path.join(__dirname,'node_loaders'),
            path.join(__dirname,'node_modules'),
            path.join(__dirname,'webpack/loaders')
        ]

    },

    plugins: [

        new CleanWebpackPlugin(cleanWebpackPluginPaths, {

            root: pathToJs,
            verbose: true,
            dry: false

        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],

    node: {

        fs: 'empty'

    },

    resolve: {

        alias: {
            'jquery': path.resolve(pathToJs, 'vendor/jquery-2.1.1.min'),
            'jquery-migrate': path.resolve(pathToJs, 'vendor/jquery-migrate-1.2.1.min'),
        },

        extensions: ['.js', '.jsx', '.hbs', '.scss'],

        modules: [

            path.join(__dirname, 'web_modules'), path.join(__dirname,'node_modules'),
            relativePathToJs,
            'node_modules'
        ],

        symlinks: false
    },

    module: {

        rules: amdShim,

        noParse: [ /\/node_modules/ ]

    },

    /*optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]vendor[\\/](jquery-2.1.1.min|jquery-migrate-1.2.1.min)[\\/]/,
                    name: 'jquery',
                    chunks: 'all',
                }
            }
        },
    },*/

    stats: {

        children: false,

        warningsFilter: (warning) => /Conflicting order between/gm.test(warning),

    },

    devtool: 'source-map'

});

module.exports = config;