import colors from 'styles/colors'
import { hoverInfo } from './config'

const getStatus = (point, colorCount, peerGroupFilters) => {
  const statusObj = {}
  const even = point.cabinNumber % 2 === 0

  if (!peerGroupFilters) {
    statusObj.status =
      point.bookingStatus === 'B'
        ? 'BOOKED'
        : point.bookingStatus === 'U'
          ? 'UNBOOKED'
          : 'CANCELLED'
    statusObj.bookedOccupancy = point.bookedOccupancy
      ? point.bookedOccupancy
      : 'N/A'
    statusObj.cabinCapacity = point.cabinCapacity ? point.cabinCapacity : 'N/A'
    if (point.bookingStatus === null) {
      if (even) {
        statusObj.color = colorCount.lastInvalidEven
          ? colors.shuttleGray
          : colors.fiord
        colorCount.lastInvalidEven = !colorCount.lastInvalidEven
      } else {
        statusObj.color = colorCount.lastInvalidOdd
          ? colors.shuttleGray
          : colors.fiord
        colorCount.lastInvalidOdd = !colorCount.lastInvalidOdd
      }
    } else if (point.bookingStatus === 'U' || point.bookingStatus === 'C') {
      if (even) {
        statusObj.color = colorCount.lastUnbookedEven
          ? colors.cabaret
          : colors.mandy
        colorCount.lastUnbookedEven = !colorCount.lastUnbookedEven
      } else {
        statusObj.color = colorCount.lastUnbookedOdd
          ? colors.cabaret
          : colors.mandy
        colorCount.lastUnbookedOdd = !colorCount.lastUnbookedOdd
      }
    } else if (point.bookedOccupancy < point.cabinCapacity) {
      if (even) {
        statusObj.color = colorCount.lastPartEven
          ? colors.keyLimePie
          : colors.hokeyPokey
        colorCount.lastPartEven = !colorCount.lastPartEven
      } else {
        statusObj.color = colorCount.lastPartOdd
          ? colors.keyLimePie
          : colors.hokeyPokey
        colorCount.lastPartOdd = !colorCount.lastPartOdd
      }
    } else {
      if (even) {
        statusObj.color = colorCount.lastFullEven
          ? colors.silverTree
          : colors.aquaForest
        colorCount.lastFullEven = !colorCount.lastFullEven
      } else {
        statusObj.color = colorCount.lastFullOdd
          ? colors.silverTree
          : colors.aquaForest
        colorCount.lastFullOdd = !colorCount.lastFullOdd
      }
    }
  } else {
    statusObj.category = point.category ? point.category : 'N/A'
    statusObj.selectedPercent = point.selectedPercent ? point.selectedPercent : 'N/A'
    statusObj.peerGroupPercent = point.peerGroupPercent ? point.peerGroupPercent : 'N/A'
    statusObj.difference = point.difference ? point.difference : 'N/A'

    const colorArray = ['#D4F5E9',
      '#BAEEED',
      '#92E1F2',
      '#83DDF4',
      '#66D5F8',
      '#4ACCFB',
      '#35C6F2',
      '#4FC8DE',
      '#68CAC1',
      '#7FCCA6',
      '#98CE88',
      '#B2D06B',
      '#C9D250',
      '#E3D533',
      '#E1C43F',
      '#DEB14A',
      '#DC9F58',
      '#D98D64',
      '#D67B70',
      '#D4697C']

    const difference = parseInt(point.difference) >= 20 ? 20 : parseInt(point.difference) <= -20 ? -20 : parseInt(point.difference)
    const offset = 20
    const tick = offset * 2 / colorArray.length
    const num = Math.round((difference + offset) / tick) - 1
    const index = num === -1 ? 0 : num
    statusObj.color = isNaN(index) ? colors.shuttleGray : colorArray[index]
  }

  return statusObj
}

const getPolygonCoordinates = (
  point,
  length,
  customdata,
  colorCount,
  peerGroupFilters
) => {
  const {
    color,
    status,
    bookedOccupancy,
    cabinCapacity,
    category,
    selectedPercent,
    peerGroupPercent,
    difference
  } = getStatus(point, colorCount, peerGroupFilters)

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
    cabinCapacity,
    category,
    selectedPercent,
    peerGroupPercent,
    difference
  }
  customdata[v1] = customdata[v0]

  return {
    i: [v0, v1],
    j: [v1, v2],
    k: [v2, v3],
    facecolor: [color, color]
  }
}

export const createDeck = (data, deck, selectedDeck, peerGroupFilters) => {
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
        cabinCapacity: '',
        category: '',
        selectedPercent: '',
        peerGroupPercent: '',
        difference: ''
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
    const coords = getPolygonCoordinates(
      point,
      length,
      customdata,
      colorCount,
      peerGroupFilters
    )
    i.push(...coords.i)
    j.push(...coords.j)
    k.push(...coords.k)
    facecolor.push(...coords.facecolor)
  })

  const hover =
    deck === selectedDeck ? hoverInfo(peerGroupFilters) : { hoverinfo: 'none' }
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
