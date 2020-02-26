import colors from 'styles/colors'

export const createSupplyBurndown = (data, selectedShipName) => {
  const x = [...data.selected.x]
  const y = [...data.selected.y]
  const marker = {
    color: colors.aquaForest
  }
  const hoverinfo = 'text'
  const hoverlabel = {
    bgcolor: colors.aquaForest,
    bordercolor: colors.aquaForest,
    font: {
      color: colors.black,
      size: 14
    }
  }
  const hovertemplate = '%{y}%<extra></extra>'
  const name = selectedShipName + ' ship'

  return [
    {
      x,
      y,
      type: 'line',
      mode: 'lines',
      name,
      marker,
      hoverinfo,
      hoverlabel,
      hovertemplate
    }
  ]
}
