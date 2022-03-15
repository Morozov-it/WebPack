const path = require('path')
//плагин для работы с файлами html
const HTMLWebpackPlugin = require('html-webpack-plugin')
//плагин для очистки старых файлов в папке dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


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
    //подключение плагинов
    plugins: [
        new HTMLWebpackPlugin({
            //title: 'Webpack course', не работает если брать шаблон
            template: './index.html'
        }),
        new CleanWebpackPlugin()
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
        ]
    }
}