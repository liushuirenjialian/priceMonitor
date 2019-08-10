const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        singleSpaEntry: ['babel-polyfill', 'src/singleSpaEntry.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'umd',
        library: 'grainReserves',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    },
                },

            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, './src'),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: '/dashboard/',
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]',
                    publicPath: '/dashboard/',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, './src'),

        },
        extensions: [
            ".js", ".vue"
        ],
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    mode: 'development',
    devtool: 'none',
    externals: [],
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        // host:'192.168.40.203',

        contentBase: './release',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // Proxy config for development purposes. In production, you would configure you webserver to do something similar.
        proxy: {

            // "/grainReserves": {
            //     target: "http://localhost:9004",
            //     pathRewrite: { "^/grainReserves": "" },
            // },
            // "/myuser": {
            // 	target: "http://218.241.206.66:8097/myuser",
            // 	pathRewrite: {"^/myuser" : ""},
            // },
            // "/myuser": {
            //     target: "http://192.168.80.230:8097/myuser",
            //     pathRewrite: { "^/myuser": "" },
            // },
            '/api': {
                target: 'http://lswz:9090/api', //
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': ''
                }
            },
        },


    }
};