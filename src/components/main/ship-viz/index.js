import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import colors from 'styles/colors'

const hoverInfo = {
  hoverlabel: {
    bgcolor: colors.biscay,
    bordercolor: colors.jungleMist,
    font: {
      color: '#FFF',
      size: 16
    }
  },
  hovertemplate:
    '   Room %{customdata.roomNumber}   <br />   %{customdata.status}   <br />   Max %{customdata.maxOccupancy}   <br />   Booked %{customdata.booked}   <br /><br /><extra></extra>'
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
      maxOccupancy: 4,
      booked: 4
    },
    {
      x0: 0,
      x1: 2,
      y0: 2,
      y1: 3,
      z: 0,
      roomNumber: 5833,
      maxOccupancy: 2,
      booked: 1
    },
    {
      x0: 0,
      x1: 2,
      y0: 3,
      y1: 4,
      z: 0,
      roomNumber: 5834,
      maxOccupancy: 2,
      booked: 1
    },
    {
      x0: 0,
      x1: 2,
      y0: 4,
      y1: 5,
      z: 0,
      roomNumber: 5835,
      maxOccupancy: 2,
      booked: 0
    },
    {
      x0: 3,
      x1: 5,
      y0: 0,
      y1: 2,
      z: 0,
      roomNumber: 5836,
      maxOccupancy: 2,
      booked: 0
    },
    {
      x0: 3,
      x1: 5,
      y0: 2,
      y1: 3,
      z: 0,
      roomNumber: 5837,
      maxOccupancy: 2,
      booked: 0
    },
    {
      x0: 3,
      x1: 5,
      y0: 3,
      y1: 4,
      z: 0,
      roomNumber: 5838,
      maxOccupancy: 2,
      booked: 2
    },
    {
      x0: 3,
      x1: 5,
      y0: 4,
      y1: 5,
      z: 0,
      roomNumber: 5839,
      maxOccupancy: 4,
      booked: 4
    }
  ],
  [
    {
      x0: 0,
      x1: 2,
      y0: 0,
      y1: 2,
      z: 1,
      roomNumber: 5832,
      maxOccupancy: 4,
      booked: 4
    },
    {
      x0: 0,
      x1: 2,
      y0: 2,
      y1: 3,
      z: 1,
      roomNumber: 5833,
      maxOccupancy: 2,
      booked: 1
    },
    {
      x0: 0,
      x1: 2,
      y0: 3,
      y1: 4,
      z: 1,
      roomNumber: 5834,
      maxOccupancy: 2,
      booked: 0
    },
    {
      x0: 0,
      x1: 2,
      y0: 4,
      y1: 5,
      z: 1,
      roomNumber: 5835,
      maxOccupancy: 2,
      booked: 2
    }
  ]
]

const layout = {
  scene: {
    xaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      showspikes: false
    },
    yaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      showspikes: false
    },
    zaxis: {
      title: '',
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false,
      showspikes: false
    },
    aspectmode: 'auto'
  },
  paper_bgcolor: colors.black0,
  plot_bgcolor: colors.black0
}

const getStatus = (maxOccupancy, booked, index) => {
  const statusObj = {
    status: '',
    color: ''
  }
  const even = index % 2 === 0
  if (booked === 0) {
    statusObj.status = 'UNBOOKED'
    statusObj.color = even ? colors.cabaret : colors.mandy
  } else if (maxOccupancy === booked) {
    statusObj.status = 'BOOKED'
    statusObj.color = even ? colors.silverTree : colors.aquaForest
  } else {
    statusObj.status = 'BOOKED'
    statusObj.color = even ? colors.keyLimePie : colors.hokeyPokey
  }
  return statusObj
}

const getPolygonCoordinates = (
  x0,
  x1,
  y0,
  y1,
  l,
  roomNumber,
  maxOccupancy,
  booked,
  customdata,
  index
) => {
  const { color, status } = getStatus(maxOccupancy, booked, index)
  const h0 = y0 * l // Starting Height
  const h1 = y1 * l // Ending Height
  // Vertices of the polygon
  const v0 = x0 + h0
  const v1 = x1 + h0
  const v2 = x0 + h1
  const v3 = x1 + h1

  // Set hover info
  customdata[v0] = {
    roomNumber,
    status,
    maxOccupancy,
    booked
  }
  customdata[v1] = {
    roomNumber,
    status,
    maxOccupancy,
    booked
  }

  return {
    i: [v0, v1],
    j: [v1, v2],
    k: [v2, v3],
    facecolor: [color, color]
  }
}

const createLevels = (data, level) => {
  const x = []
  const y = []
  const z = []
  const customdata = []
  const length = 6
  for (let y1 = 0; y1 < length; y1++) {
    for (let x1 = 0; x1 < length; x1++) {
      x.push(x1)
      y.push(y1)
      customdata.push({
        roomNumber: '',
        status: '',
        maxOccupancy: '',
        booked: ''
      })
      z.push(level)
    }
  }
  const i = []
  const j = []
  const k = []
  const facecolor = []
  data.forEach((point, index) => {
    const coords = getPolygonCoordinates(
      point.x0,
      point.x1,
      point.y0,
      point.y1,
      length,
      point.roomNumber,
      point.maxOccupancy,
      point.booked,
      customdata,
      index
    )
    i.push(...coords.i)
    j.push(...coords.j)
    k.push(...coords.k)
    facecolor.push(...coords.facecolor)
  })

  const hover = level === 0 ? hoverInfo : { hoverinfo: 'none' }
  const opacity = level === 0 ? 1 : 0.3
  return {
    x,
    y,
    z,
    i,
    j,
    k,
    opacity,
    facecolor,
    customdata,
    ...hover,
    flatshading: true,
    type: 'mesh3d'
  }
}

const ShipViz = () => {
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
      style={{ width: '100%', height: '900px', flex: '5' }}
    />
  )
}

export default ShipViz
