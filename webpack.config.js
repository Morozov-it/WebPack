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



//переменная состояния разработки
const isDev = process.env.NODE_ENV === 'development'
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
}

module.exports = {
    //контекст это исходная папка src и все пути будут от нее
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    //входная точка для работы webpack
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },

    //итоговый файл со всеми скриптами
    output: {
        //паттерн для названий файлов bundle
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        //указываются расширения файлов, которые можно не указывать в импортах
        extensions: ['.js', '.json', '.png', '.css'],
        
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

    //подключение плагинов
    plugins: [
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
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
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
        ]
    }
}