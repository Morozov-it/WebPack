### Init install


### Dev dependencies:
# Корневой установщик с базовым функционалом
npm i -D webpack
# Пакет для работы через команды в консоли
npm i -D webpack-cli
# Пакет для работы в режиме live-server
npm i -D webpack-dev-server

# Плагин для работы с файлами html
npm install -D html-webpack-plugin
# Плагин для сжатия css
npm install -D mini-css-extract-plugin
# Плагин для очистки старых файлов bundle в папке dist
npm install -D clean-webpack-plugin
# Плагин для переноса любых файлов по директории проекта
npm install -D copy-webpack-plugin
# Плагин для настройки поля оптимизации в webpack.config
npm install -D terser-webpack-plugin
# Плагин для настройки оптимизации для css файлов
npm install -D optimize-css-assets-webpack-plugin

# Загрузчики для работы с файлами css
npm i -D style-loader css-loader
# Загрузчики для работы с файлами less
npm i -D less-loader
# Загрузчики для работы с файлами scss
npm i -D sass-loader
# Загрузчик для работы с файлами типа png
npm i -D file-loader
# Загрузчик для работы с файлами типа xml
npm i -D xml-loader
# Загрузчик для работы с файлами типа csv
npm i -D csv-loader
npm i -D papaparse
# Загрузчик для работы babel
npm i -D babel-loader
# Загрузчик для работы ESLint
npm i -D eslint-loader

# Пакет для работы с системными переменными
npm i -D cross-env
# Пакет для работы с less
npm i -D less
# Пакет для работы с sass
npm i -D node-sass
# Пакет для работы с babel
npm i -D @babel/core
npm i -D @babel/preset-env
npm i -D @babel/preset-react
npm i -D @babel/preset-typescript
npm i -D @babel/plugin-proposal-class-properties
# Пакет для работы с ESLint
npm i -D eslint
npm i -D babel-eslint
# Пакет для анализа сборки
npm i -D webpack-bundle-analyzer


### Dependencies:
# простой набор обнуляющих стилей 
npm i -S normalize.css

# установка библиотеки jquery
npm i -S jquery

# установка полифила для преобразования кода для браузера
npm i -S @babel/polyfill

# React
npm i -S react react-dom
