const path = require('path')
//плагин для работы с файлами html
const HTMLWebpackPlugin = require('html-webpack-plugin')
//плагин для очистки старых файлов в папке dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//плагин для переноса любых файлов по директории
const CopyWebpackPlugin = require('copy-webpack-plugin')
//плагин для переноса любых файлов по директории
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//плагин для настройки оптимизации для css файлов
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//плагин для настройки поля оптимизации в webpack.config
const TerserWebpackPlugin = require('terser-webpack-plugin')
//плагин для анализа оптимизации плагинов
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')



//переменная состояния разработки
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev
console.log('Is dev', isDev)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    //если режим сборки то добавляются плагины по оптимизации
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;



const cssLoaders = (extra) => {
    const loader = [
        //'style-loader', //добавляет полученные стили в head HTML
        {
            loader: MiniCssExtractPlugin.loader, //выносит css в отдельный файл
            options: {
                hmr: isDev, //позволяет обновлять данные без перезагрузки страниц в режиме dev
                reloadAll: true
            }
        }, 
        'css-loader'
    ]
    if (extra) {
        loader.push(extra)
    }
    return loader
}

const babelPreset = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    if (preset) {
        options.presets.push(preset)
    }
    return options
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: babelPreset()
        }
    ]
    // if (isDev) {
    //     loaders.push('eslint-loader')
    // }
    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            //title: 'Webpack course', не работает если брать шаблон
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'), //перенести из
                to: path.resolve(__dirname, 'dist') //перенести в
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ]
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    //контекст это исходная папка src и все пути будут от нее
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    //входная точка для работы webpack
    entry: {
        analytics: './analytics.ts',
        main: ['@babel/polyfill', './index.js']
    },

    //итоговый файл со всеми скриптами
    output: {
        //паттерн для названий файлов bundle
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        //указываются расширения файлов, которые можно не указывать в импортах
        extensions: ['.js', 'jsx', '.json', '.png', '.css', '.less', 'scss', 'sass'],
        
        //указываются абсолютные пути, которые можно указывать в импортах
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@models': path.resolve(__dirname, 'src/models'),
        }
    },

    //создается файл vendors в который отправляются все библиотеки, которые вызываются из разных компонент
    optimization: optimization(),

    //настройки для live-server, данные из папки хранятся в оперативной памяти, чтобы их отобразить нужен npm run build
    devServer: {
        port: 3000,
        hot: isDev
    },

    //создание исходных файлов без минимизации в режиме разработки в папке dist
    devtool: isDev ? 'source-map' : '',

    //подключение плагинов
    plugins: plugins(),

    //подключение модулей
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|webp)$/, //тип используемых файлов
                use: ['file-loader'] //тип загрузчика для этих файлов, справа налево
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelPreset('@babel/preset-react')
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelPreset('@babel/preset-typescript')
                }
            }
        ]
    }
}