import React, { useState } from 'react'
import { render } from 'react-dom'

import Post from '@models/Post' //импорт через alias
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


const App = () => {
    const [value,setValue] = useState(0)
    return (
        <div className="box">
            <h2>It's a react app</h2>
            <div>{value}</div>
            <hr />
            <button onClick={() => setValue((prev)=> prev += 1)}>Increase</button>
            <button onClick={()=> setValue((prev)=> prev -= 1)}>Decrease</button>
        </div>
    )
}

render(<App />, document.getElementById('app'))

