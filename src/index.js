import Post from '@models/Post' //импорт через alias
import './app.jsx'
import './babel'
import * as $ from 'jquery'

import './styles/styles' //без расширений с помощью extensions
import './styles/less'
import logo from './assets/eraser'

//import json from './assets/json' //webpack сразу выполняет .parse()
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'

const post = new Post('webpack post title', logo)
// console.log('JSON', json)
// console.log('XML', xml)
// console.log('CSV', csv)
$('pre').addClass('code').html(post.toString())

