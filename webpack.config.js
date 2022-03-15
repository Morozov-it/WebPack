const path = require('path')
//плагин для работы с файлами html
const HTMLWebpackPlugin = require('html-webpack-plugin')
//плагин для очистки старых файлов в папке dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//плагин для переноса любых файлов по директории
const CopyWebpackPlugin = require('copy-webpack-plugin')




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
        filename: '[name].[contenthash].js',
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
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    //настройки для live-server, данные из папки хранятся в оперативной памяти, чтобы их отобразить нужен npm run build
    devServer: {
        port: 3000
    },

    //подключение плагинов
    plugins: [
        new HTMLWebpackPlugin({
            //title: 'Webpack course', не работает если брать шаблон
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'), //перенести из
                to: path.resolve(__dirname, 'dist') //перенести в
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.css$/, //тип используемых файлов
                use: ['style-loader','css-loader'] //тип загрузчика для этих файлов, справа налево
            },
            {
                test: /\.(png|jpg|svg|gif|webp)$/,
                use: ['file-loader']
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