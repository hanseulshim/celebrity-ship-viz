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
