import colors from 'styles/colors'
import { hoverInfo } from './shipConfig'

const getStatus = (maxOccupancy, booked, colorCount, roomNumber) => {
  const statusObj = {
    status: '',
    color: '',
    maxOccupancyLabel: '',
    bookedLabel: ''
  }
  const even = roomNumber % 2 === 0
  if (maxOccupancy === null) {
    statusObj.status = 'N/A'
    statusObj.maxOccupancyLabel = 'N/A'
    statusObj.bookedLabel = 'N/A'
    if (even) {
      statusObj.color = colorCount.lastInvalidEven === 0 ? colors.shuttleGray : colors.fiord
      if (colorCount.lastInvalidEven === 0) {
        colorCount.lastInvalidEven = 1
      } else {
        colorCount.lastInvalidEven = 0
      }
    } else {
      statusObj.color = colorCount.lastInvalidOdd === 0 ? colors.shuttleGray : colors.fiord
      if (colorCount.lastInvalidOdd === 0) {
        colorCount.lastInvalidOdd = 1
      } else {
        colorCount.lastInvalidOdd = 0
      }
    }
  } else if (booked === 0) {
    statusObj.status = 'UNBOOKED'
    statusObj.maxOccupancyLabel = maxOccupancy
    statusObj.bookedLabel = booked
    if (even) {
      statusObj.color = colorCount.lastUnbookedEven === 0 ? colors.cabaret : colors.mandy
      if (colorCount.lastUnbookedEven === 0) {
        colorCount.lastUnbookedEven = 1
      } else {
        colorCount.lastUnbookedEven = 0
      }
    } else {
      statusObj.color = colorCount.lastUnbookedOdd === 0 ? colors.cabaret : colors.mandy
      if (colorCount.lastUnbookedOdd === 0) {
        colorCount.lastUnbookedOdd = 1
      } else {
        colorCount.lastUnbookedOdd = 0
      }
    }
  } else if (maxOccupancy === booked) {
    statusObj.status = 'BOOKED'
    statusObj.maxOccupancyLabel = maxOccupancy
    statusObj.bookedLabel = booked
    if (even) {
      statusObj.color = colorCount.lastFullEven === 0 ? colors.silverTree : colors.aquaForest
      if (colorCount.lastFullEven === 0) {
        colorCount.lastFullEven = 1
      } else {
        colorCount.lastFullEven = 0
      }
    } else {
      statusObj.color = colorCount.lastFullOdd === 0 ? colors.silverTree : colors.aquaForest
      if (colorCount.lastFullOdd === 0) {
        colorCount.lastFullOdd = 1
      } else {
        colorCount.lastFullOdd = 0
      }
    }
  } else {
    statusObj.status = 'BOOKED'
    statusObj.maxOccupancyLabel = maxOccupancy
    statusObj.bookedLabel = booked
    if (even) {
      statusObj.color = colorCount.lastPartEven === 0 ? colors.keyLimePie : colors.hokeyPokey
      if (colorCount.lastPartEven === 0) {
        colorCount.lastPartEven = 1
      } else {
        colorCount.lastPartEven = 0
      }
    } else {
      statusObj.color = colorCount.lastPartOdd === 0 ? colors.keyLimePie : colors.hokeyPokey
      if (colorCount.lastPartOdd === 0) {
        colorCount.lastPartOdd = 1
      } else {
        colorCount.lastPartOdd = 0
      }
    }
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
  colorCount
) => {
  const { color, status, maxOccupancyLabel, bookedLabel } = getStatus(
    maxOccupancy,
    booked,
    colorCount,
    roomNumber
  )
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
    maxOccupancy: maxOccupancyLabel,
    booked: bookedLabel
  }
  customdata[v1] = {
    roomNumber,
    status,
    maxOccupancy: maxOccupancyLabel,
    booked: bookedLabel
  }
  customdata[v2] = {
    roomNumber,
    status,
    maxOccupancy: maxOccupancyLabel,
    booked: bookedLabel
  }
  customdata[v3] = {
    roomNumber,
    status,
    maxOccupancy: maxOccupancyLabel,
    booked: bookedLabel
  }

  return {
    i: [v0, v1],
    j: [v1, v2],
    k: [v2, v3],
    facecolor: [color, color]
  }
}

export const createDeck = (data, deck, selectedDeck) => {
  const x = []
  const y = []
  const z = []
  const customdata = []
  const length = 150
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
      z.push(deck)
    }
  }
  const i = []
  const j = []
  const k = []
  const facecolor = []
  const colorCount = {
    lastFullEven: 0,
    lastFullOdd: 0,
    lastPartEven: 0,
    lastPartOdd: 0,
    lastUnbookedEven: 0,
    lastUnbookedOdd: 0,
    lastInvalidEven: 0,
    lastInvalidOdd: 0
  }
  data.forEach(point => {
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
      colorCount
    )
    i.push(...coords.i)
    j.push(...coords.j)
    k.push(...coords.k)
    facecolor.push(...coords.facecolor)
  })

  const hover = deck === selectedDeck ? hoverInfo : { hoverinfo: 'none' }
  const opacity = deck === selectedDeck ? 1 : 0.5
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
