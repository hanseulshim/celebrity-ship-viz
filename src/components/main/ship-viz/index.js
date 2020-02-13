import React, { useState, useEffect, useContext } from 'react'
import { store } from 'context/store'
import Plot from 'react-plotly.js'
import data from './data'
import { layout } from './shipConfig'
import { createDeck } from './shipHelper'

const ShipViz = () => {
  const [plotData, setPlotdata] = useState([])
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedDeck } = state
  useEffect(() => {
    const decks = Object.keys(data)
    const coords = decks.map(deck =>
      createDeck(data[deck], parseInt(deck), selectedDeck)
    )
    setPlotdata(coords)
  }, [selectedDeck])

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
