import colors from 'styles/colors'

export const createSupplyBurndown = (line, key, selectedShipName) => {
  const x = [...line.x]
  const y = [...line.y]

  const lineColor =
    key === 'selected'
      ? colors.aquaForest
      : key === 'all'
        ? colors.lochmara
        : colors.babyBlue
  const marker = {
    color: lineColor
  }
  const hoverinfo = 'text'
  const hoverlabel = {
    bgcolor: lineColor,
    bordercolor: lineColor,
    font: {
      color: colors.black,
      size: 14
    }
  }
  const hovertemplate = '%{y}%<extra></extra>'
  const name =
    key === 'selected'
      ? selectedShipName
      : key === 'all'
        ? 'All Ships Avg.'
        : 'Peer Avg.'

  return {
    x,
    y,
    type: 'line',
    mode: 'lines+markers',
    name,
    marker,
    hoverinfo,
    hoverlabel,
    hovertemplate
  }
}

export const createCategoryClass = (bar, key, categoryClasses) => {
  const x = [...bar]
  const y = [...categoryClasses]
  const barColor = key === 'bookedX' ? colors.lochmara : colors.babyBlue
  const type = 'bar'
  const width = 0.5
  const orientation = 'h'
  const name = key === 'bookedX' ? 'Booked' : 'Available'
  const marker = {
    color: barColor
  }
  const hoverinfo = 'text'
  const hoverlabel = {
    bgcolor: barColor,
    bordercolor: barColor,
    font: {
      color: colors.black,
      size: 14
    }
  }
  const hovertemplate = '%{x}%<extra></extra>'
  return {
    x,
    y,
    type,
    width,
    orientation,
    name,
    marker,
    hoverinfo,
    hoverlabel,
    hovertemplate
  }
}

export const createDecks = (bar, key, categoryClasses) => {
  const x = [...bar]
  const y = [...categoryClasses]
  const barColor = key === 'bookedX' ? colors.lochmara : colors.babyBlue
  const type = 'bar'
  const orientation = 'h'
  const name = key === 'bookedX' ? 'Booked' : 'Available'
  const marker = {
    color: barColor
  }
  const hoverinfo = 'text'
  const hoverlabel = {
    bgcolor: barColor,
    bordercolor: barColor,
    font: {
      color: colors.black,
      size: 14
    }
  }
  const hovertemplate = '%{x}%<extra></extra>'
  return {
    x,
    y,
    type,
    orientation,
    name,
    marker,
    hoverinfo,
    hoverlabel,
    hovertemplate
  }
}
