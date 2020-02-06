import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import data from './data'
import { layout } from './shipConfig'
import { createDeck } from './shipHelper'

const ShipViz = () => {
  const [plotData, setPlotdata] = useState([])
  const [selectedDeck] = useState(3)
  useEffect(() => {
    const decks = Object.keys(data)
    const coords = decks.map(deck =>
      createDeck(data[deck], parseInt(deck), selectedDeck)
    )
    setPlotdata(coords)
  }, [])

  return (
    <Plot
      data={plotData}
      layout={layout}
      revision={Math.random()}
      useResizeHandler={true}
      style={{ width: '100%', height: '900px' }}
    />
  )
}

export default ShipViz
