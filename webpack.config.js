'use strict';
const resolve = require('node:path').resolve;

const outputPath = resolve(__dirname, 'dev');

/** @type {import ('webpack').Configuration } */
const config = {
    entry: resolve(__dirname, 'src', 'dev.ts'),
    output: {
        filename: 'index.js',
        path: outputPath
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },
    devServer: {
        hot: true,
        port: 3000,
        static: {
            directory: outputPath
        }
    }
};

module.exports = config;
