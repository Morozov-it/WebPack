import Post from './Post'

import json from './assets/json.json' //webpack сразу выполняет .parse()
import './styles/styles.css' //обязательно расширение
import logo from './assets/eraser.png'



const post = new Post('webpack post title', logo)

console.log(post.toString())
console.log(json)