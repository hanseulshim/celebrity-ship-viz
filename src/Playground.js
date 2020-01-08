import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'

const hoverInfo = {
  hoverlabel: {
    bgcolor: 'rgba(2, 19, 43, 0.7)',
    bordercolor: '#4a627f',
    font: {
      color: '#FFF'
    }
  },
  // hovertemplate:
  //   '   Room 8234   <br />   BOOKED   <br />   Max 4   <br />   Booked 2   <br /><br /><extra></extra>'
  hovertemplate:
    '   Room %{customdata.status}   <br />   BOOKED   <br />   Max 4   <br />   Booked 2   <br /><br /><extra></extra>'
}

const data = [
  [
    {
      x0: 0,
      x1: 2,
      y0: 0,
      y1: 2,
      z: 0,
      roomNumber: 5832,
      status: 'booked',
      maxOccupancy: 4,
      booked: 4
    },
    // {
    //   x0: 0,
    //   x1: 2,
    //   y0: 2,
    //   y1: 3,
    //   z: 0,
    //   roomNumber: 5833,
    //   status: 'booked',
    //   maxOccupancy: 2,
    //   booked: 1
    // },
    // {
    //   x0: 0,
    //   x1: 2,
    //   y0: 3,
    //   y1: 4,
    //   z: 0,
    //   roomNumber: 5834,
    //   status: 'unbooked',
    //   maxOccupancy: 2,
    //   booked: 0
    // },
    // {
    //   x0: 0,
    //   x1: 2,
    //   y0: 4,
    //   y1: 5,
    //   z: 0,
    //   roomNumber: 5835,
    //   status: 'unbooked',
    //   maxOccupancy: 2,
    //   booked: 2
    // },
    {
      x0: 4,
      x1: 5,
      y0: 0,
      y1: 2,
      z: 0,
      roomNumber: 5832,
      status: 'unbooked',
      maxOccupancy: 2,
      booked: 2
    }
    // {
    //   x0: 3,
    //   x1: 5,
    //   y0: 2,
    //   y1: 3,
    //   z: 0,
    //   status: 'unbooked',
    //   maxOccupancy: 2,
    //   booked: 0
    // },
    // {
    //   x0: 3,
    //   x1: 5,
    //   y0: 3,
    //   y1: 4,
    //   z: 0,
    //   roomNumber: 5833,
    //   status: 'booked',
    //   maxOccupancy: 2,
    //   booked: 1
    // },
    // {
    //   x0: 3,
    //   x1: 5,
    //   y0: 4,
    //   y1: 5,
    //   z: 0,
    //   status: 'booked',
    //   maxOccupancy: 4,
    //   booked: 4
    // }
  ]
  // [
  //   {
  //     x0: 0,
  //     x1: 2,
  //     y0: 0,
  //     y1: 2,
  //     z: 1,
  //     roomNumber: 5832,
  //     status: 'booked',
  //     maxOccupancy: 4,
  //     booked: 4
  //   },
  //   {
  //     x0: 0,
  //     x1: 2,
  //     y0: 2,
  //     y1: 3,
  //     z: 1,
  //     roomNumber: 5833,
  //     status: 'booked',
  //     maxOccupancy: 2,
  //     booked: 1
  //   },
  //   {
  //     x0: 0,
  //     x1: 2,
  //     y0: 3,
  //     y1: 4,
  //     z: 1,
  //     roomNumber: 5834,
  //     status: 'unbooked',
  //     maxOccupancy: 2,
  //     booked: 0
  //   },
  //   {
  //     x0: 0,
  //     x1: 2,
  //     y0: 4,
  //     y1: 5,
  //     z: 1,
  //     roomNumber: 5835,
  //     status: 'unbooked',
  //     maxOccupancy: 2,
  //     booked: 2
  //   }
  // ]
]

const layout = {
  scene: {
    xaxis: {
      // title: ''
      // showgrid: false,
      // zeroline: false,
      // showticklabels: false,
      // showspikes: false
    },
    yaxis: {
      // title: ''
      // showgrid: false,
      // zeroline: false,
      // showticklabels: false,
      // showspikes: false
    },
    zaxis: {
      // title: ''
      // showgrid: false,
      // zeroline: false,
      // showline: false,
      // showticklabels: false,
      // showspikes: false
    },
    aspectmode: 'auto'
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)'
}

const getStatus = (status, maxOccupancy, booked) => {
  if (status === 'unbooked') {
    return 'red'
  } else if (maxOccupancy === booked) {
    return 'green'
  } else return 'yellow'
}

const getPolygonCoordinates = (
  x0,
  x1,
  y0,
  y1,
  l,
  status,
  maxOccupancy,
  booked
) => {
  const h0 = y0 * l // Starting Height
  const h1 = y1 * l // Ending Height
  // Vertices of the polygon
  const v0 = x0 + h0
  const v1 = x0 + x1 + h0
  const v2 = x0 + h1
  const v3 = x0 + x1 + h1
  const color = getStatus(status, maxOccupancy, booked)
  return {
    i: [v0, v1],
    j: [v1, v2],
    k: [v2, v3],
    facecolor: [color, color],
    customdata: [
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked },
      { status, maxOccupancy, booked }
    ]
  }
}

const createLevels = (data, level) => {
  const x = []
  const y = []
  const z = []
  const length = 6
  for (let y1 = 0; y1 < length; y1++) {
    for (let x1 = 0; x1 < length; x1++) {
      x.push(x1)
      y.push(y1)
      z.push(level)
    }
  }
  const i = []
  const j = []
  const k = []
  const facecolor = []
  const customdata = []
  data.forEach(point => {
    const coords = getPolygonCoordinates(
      point.x0,
      point.x1,
      point.y0,
      point.y1,
      length,
      point.status,
      point.maxOccupancy,
      point.booked
    )
    i.push(...coords.i)
    j.push(...coords.j)
    k.push(...coords.k)
    facecolor.push(...coords.facecolor)
    customdata.push(...coords.customdata)
  })

  const hover = level === 0 ? hoverInfo : { hoverinfo: 'none' }

  return {
    x,
    y,
    z,
    i,
    j,
    k,
    facecolor,
    customdata,
    ...hover,
    opacity: Math.random(),
    flatshading: true,
    type: 'mesh3d'
  }
}

const Playground = () => {
  const [plotData, setPlotdata] = useState([])
  useEffect(() => {
    const coords = data.map(createLevels)
    setPlotdata(coords)
  }, [])

  return (
    <Plot
      data={plotData}
      layout={layout}
      revision={Math.random()}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      // onHover={hover => console.log(hover.points[0].data)}
    />
  )
}

export default Playground
