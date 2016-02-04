const path = require('path');

const webpack = require('webpack');
const TargetprocessMashupPlugin = require('targetprocess-mashup-webpack-plugin');
const CombineAssetsPlugin = require('combine-assets-plugin');

const pkg = require('../package.json');

const createConfig = (options_) => {

    const options = Object.assign({
        mashupName: pkg.name,
        production: false,
        mashupManager: false
    }, options_);

    const mashupName = options.mashupName;

    const outputConfigFileName = './mashup.config.js';

    const config = {
        context: path.resolve(__dirname, '../src'),
        entry: {
            configData: [`targetprocess-mashup-config?libraryTarget=${mashupName}&outputFile=${outputConfigFileName}!./config.json`],
            index: ['./index.js']
        }
    };

    if (!options.mashupManager) {

        config.entry.manifestData = ['targetprocess-mashup-manifest!./manifest.json'];
        config.entry.ignoreData = ['file?name=chunks/mashup.ignore!./mashup.ignore'];

    }

    config.output = {
        filename: '[name].js',
        path: 'build',
        chunkFilename: 'chunks/[id].[name].[hash].js',
        pathinfo: !options.production,
        jsonpFunction: `webpackJsonp_mashup_${mashupName}`
    };

    config.module = {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loaders: [
                'style',
                'css'
            ]
        }]
    };

    if (!options.production) {

        config.debug = true;
        config.devtool = 'eval-source-map';

    }

    config.plugins = [
        new TargetprocessMashupPlugin(mashupName, {
            useConfig: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.BannerPlugin(`v${pkg.version} Build ${new Date().toUTCString()}`, {
            entryOnly: true
        })
    ];

    var toConcat = {};
    var toExclude = [
        'configData.js',
        'ignoreData.js',
        'manifestData.js'
    ];

    if (options.mashupManager) {

        toConcat = {
            'index.js': [outputConfigFileName, 'index.js']
        };
        toExclude = toExclude.concat(outputConfigFileName);

    }

    config.plugins = config.plugins.concat(new CombineAssetsPlugin({
        toConcat: toConcat,
        toExclude: toExclude
    }));

    if (options.mashupManager) {

        // produce single file index.js despite async chunks
        config.plugins = config.plugins.concat(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }));

    }

    if (options.production) {

        config.plugins = config.plugins.concat(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));

    }

    config.externals = [
        'jQuery',
        {jquery: 'jQuery'},
        'Underscore',
        {underscore: 'Underscore'},
        /^tp3\//,
        /^tau\//,
        /^tp\//
    ];

    return config;
};

module.exports = createConfig;
