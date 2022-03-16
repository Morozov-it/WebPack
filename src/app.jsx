import React, { useState } from 'react'
import { render } from 'react-dom'
import './styles/less'

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

