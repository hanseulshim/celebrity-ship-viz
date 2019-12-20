import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

// for (let i = 0; i < 3; i++) {
//   for (let j = 0; j < 10; j++) {
//     for (let k = 0; k < 10; k++) {
//       data.push({
//         type: 'mesh3d',
//         color: getColor(),
//         x: [k, k, k + 1, k + 1],
//         y: [j, j + 1, j + 1, j],
//         z: [i, i, i, i]
//       })
//     }
//   }
// }

// for (let x = 0; x < 2; x++) {
//   for (let y = 0; y < 2; y++) {
//     createSquare(x + y)
//   }
// }
const layout = {
  scene: {
    aspectmode: 'manual',
    aspectratio: {
      x: 1,
      y: 0.7,
      z: 1
    },
    xaxis: {
      nticks: 9,
      range: [0, 100]
    },
    yaxis: {
      nticks: 7,
      range: [0, 100]
    },
    zaxis: {
      nticks: 10,
      range: [0, 100]
    }
  }
}

const Playground = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    for (let x = 0; x < 10000; x++) {
      createSquare(x)
    }
  }, [])
  const createSquare = startIndex => {
    var x = []
    var y = []
    var z = []
    var i = []
    var j = []
    var k = []
    let offset = 0
    for (let a = startIndex; a <= startIndex + 1; a++, offset++) {
      i.push(offset)
      j.push(offset + 1)
      k.push(offset + 2)
      for (let b = startIndex; b <= startIndex + 1; b++) {
        x.push(a)
        y.push(b)
        z.push(0)
      }
    }
    setData([
      ...data,
      {
        x: x,
        y: y,
        z: z,
        i: i,
        j: j,
        k: k,
        type: 'mesh3d'
      }
    ])
  }
  return (
    <Plot
      data={data}
      layout={layout}
      revision={Math.random()}
      useResizeHandler={true}
      style={{ width: '100%', height: '1000px' }}
    />
  )
}

export default Playground
