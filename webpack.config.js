const path = require('path')

module.exports = {
    mode: 'development',
    //входная точка для работы webpack
    entry: './src/index.js',
    //итоговый файл со всеми скриптами
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}