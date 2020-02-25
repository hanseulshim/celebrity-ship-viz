import colors from 'styles/colors'
import { hoverInfo } from './config'

const getStatus = (point, colorCount) => {
  const statusObj = {}

  statusObj.status =
    point.bookingStatus === 'B'
      ? 'BOOKED'
      : point.bookingStatus === 'U'
        ? 'UNBOOKED'
        : 'CANCELLED'
  statusObj.bookedOccupancy = point.bookedOccupancy ? point.bookedOccupancy : 'N/A'
  statusObj.cabinCapacity = point.cabinCapacity ? point.cabinCapacity : 'N/A'
  const even = point.cabinNumber % 2 === 0
  if (point.bookingStatus === null) {
    if (even) {
      statusObj.color = colorCount.lastInvalidEven ? colors.shuttleGray : colors.fiord
      colorCount.lastInvalidEven = !colorCount.lastInvalidEven
    } else {
      statusObj.color = colorCount.lastInvalidOdd ? colors.shuttleGray : colors.fiord
      colorCount.lastInvalidOdd = !colorCount.lastInvalidOdd
    }
  } else if (point.bookingStatus === 'U' || point.bookingStatus === 'C') {
    if (even) {
      statusObj.color = colorCount.lastUnbookedEven ? colors.cabaret : colors.mandy
      colorCount.lastUnbookedEven = !colorCount.lastUnbookedEven
    } else {
      statusObj.color = colorCount.lastUnbookedOdd ? colors.cabaret : colors.mandy
      colorCount.lastUnbookedOdd = !colorCount.lastUnbookedOdd
    }
  } else if (point.bookedOccupancy < point.cabinCapacity) {
    if (even) {
      statusObj.color = colorCount.lastPartEven ? colors.keyLimePie : colors.hokeyPokey
      colorCount.lastPartEven = !colorCount.lastPartEven
    } else {
      statusObj.color = colorCount.lastPartOdd ? colors.keyLimePie : colors.hokeyPokey
      colorCount.lastPartOdd = !colorCount.lastPartOdd
    }
  } else {
    if (even) {
      statusObj.color = colorCount.lastFullEven ? colors.silverTree : colors.aquaForest
      colorCount.lastFullEven = !colorCount.lastFullEven
    } else {
      statusObj.color = colorCount.lastFullOdd ? colors.silverTree : colors.aquaForest
      colorCount.lastFullOdd = !colorCount.lastFullOdd
    }
  }
  return statusObj
}

const getPolygonCoordinates = (point, length, customdata, colorCount) => {
  const { color, status, bookedOccupancy, cabinCapacity } = getStatus(
    point,
    colorCount
  )

  const h0 = point.plotY0 * length // Starting Height
  const h1 = point.plotY1 * length // Ending Height
  // Vertices of the polygon
  const v0 = point.plotX0 + h0
  const v1 = point.plotX1 + h0
  const v2 = point.plotX0 + h1
  const v3 = point.plotX1 + h1

  // Set hover info
  customdata[v0] = {
    cabinNumber: point.cabinNumber,
    status,
    bookedOccupancy,
    cabinCapacity
  }
  customdata[v1] = customdata[v0]

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
  for (let y0 = 0; y0 < length; y0++) {
    for (let x0 = 0; x0 < length; x0++) {
      x.push(x0)
      y.push(y0)
      customdata.push({
        cabinNumber: '',
        status: '',
        bookedOccupancy: '',
        cabinCapacity: ''
      })
      z.push(deck)
    }
  }
  const i = []
  const j = []
  const k = []
  const facecolor = []
  const colorCount = {
    lastFullEven: true,
    lastFullOdd: true,
    lastPartEven: true,
    lastPartOdd: true,
    lastUnbookedEven: true,
    lastUnbookedOdd: true,
    lastInvalidEven: true,
    lastInvalidOdd: true
  }
  data.forEach(point => {
    const coords = getPolygonCoordinates(point, length, customdata, colorCount)
    i.push(...coords.i)
    j.push(...coords.j)
    k.push(...coords.k)
    facecolor.push(...coords.facecolor)
  })

  const hover = deck === selectedDeck ? hoverInfo : { hoverinfo: 'none' }
  const opacity = deck === selectedDeck ? 1 : 0.3
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
