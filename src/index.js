import Post from '@models/Post'

import json from './assets/json.json' //webpack сразу выполняет .parse()
import './styles/styles.css' //обязательно расширение
import logo from './assets/eraser.png'
import xml from './assets/data.xml'
import csv from './assets/data.csv'



const post = new Post('webpack post title', logo)

console.log('POST', post.toString())
console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)