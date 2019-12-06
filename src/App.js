import React from 'react'
import Plot from 'react-plotly.js'
import './App.css'

const colors = ['#ED553B', '#20639B', '#CCCCCC']
const getColor = () => colors[Math.round(Math.random() * 2)]

const data = []

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    for (let k = 0; k < 10; k++) {
      data.push({
        type: 'mesh3d',
        color: getColor(),
        x: [k, k, k + 1, k + 1],
        y: [j, j + 1, j + 1, j],
        z: [i, i, i, i]
      })
    }
  }
}

const App = () => (
  <Plot
    data={data}
    useResizeHandler={true}
    style={{ width: '100%', height: '1000px' }}
  />
)

export default App
