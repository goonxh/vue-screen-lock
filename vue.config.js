// const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 3000,
        https: false,
        hotOnly: false,
    },
    outputDir: path.resolve(__dirname, 'docs'),
    publicPath: './',
    productionSourceMap: false,
    filenameHashing: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            return {
                devtool: false,
                entry: './example/example.js',
                plugins: [
                ],
                output: {
                    filename: 'example.js',
                },
            }
        } else {
            return {
                entry: './example/example.js',
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader'],
            }
        }
    }
}
