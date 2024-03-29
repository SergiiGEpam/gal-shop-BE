const slsw = require('serverless-webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    resolve: {
        extensions: ['.mjs', '.json', '.ts', '.js'],
        symlinks: false,
        cacheWithContext: false,
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.paths.json',
            }),
        ],
    },
    devtool: 'source-map',
    stats: 'minimal',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, '.serverless'),
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, '.esbuild'),
                    ],
                ],
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
};
