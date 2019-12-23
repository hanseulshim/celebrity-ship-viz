import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const zCoords = [0, 1, 2, 3, 4, 5, 6, 7]
const coordinates = []
for (let a = 0; a < 99; a++) {
  for (let b = 0; b < 99; b++) {
    coordinates.push([
      a,
      b,
      Math.round(Math.random()),
      {
        room: Math.round(Math.random)
      }
    ])
  }
}

const layout = {
  scene: {
    aspectmode: 'manual',
    aspectratio: {
      x: 1,
      y: 0.5,
      z: 1
    },
    xaxis: {
      nticks: 9,
      range: [0, 100]
    },
    yaxis: {
      nticks: 7,
      range: [0, 100]
    }
    // zaxis: {
    //   nticks: 10,
    //   range: [0, 100]
    // }
  }
}
const getSquareCoordinates = (x, y, status, l) => {
  const h = y * l
  const color = status ? 'green' : 'red'
  return {
    i: [x + h, x + h + 1],
    j: [x + h + 1, x + h + l],
    k: [x + h + l, x + h + l + 1],
    facecolor: [color, color]
  }
}

const createLayers = startIndex => {
  const x = []
  const y = []
  const z = []
  const length = 100
  for (let y1 = 0; y1 < length; y1++) {
    for (let x1 = 0; x1 < length; x1++) {
      x.push(x1)
      y.push(y1)
      z.push(startIndex)
    }
  }
  const i = []
  const j = []
  const k = []
  const facecolor = []
  const test = []
  const customdata = []
  coordinates.forEach(coord => {
    const obj = getSquareCoordinates(coord[0], coord[1], coord[2], length)
    i.push(...obj.i)
    j.push(...obj.j)
    k.push(...obj.k)
    facecolor.push(...obj.facecolor)
    test.push({ point: coord[2] })
    customdata.push([coord[3]])
  })
  return {
    x,
    y,
    z,
    i,
    j,
    k,
    facecolor,
    test,
    customdata,
    opacity: Math.random(),
    flatshading: true,
    hovertemplate: '<i>Y</i>: %{customdata}',
    type: 'mesh3d'
  }
}

const Playground = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const coords = []
    zCoords.forEach(z => coords.push(createLayers(z)))
    setData(coords)
  }, [])

  return (
    <Plot
      data={data}
      layout={layout}
      revision={Math.random()}
      useResizeHandler={true}
      style={{ width: '100%', height: '1000px' }}
      onHover={hover => console.log(hover.points[0])}
    />
  )
}

export default Playground
