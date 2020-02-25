import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import Plot from 'react-plotly.js'
import { layout } from './config'
import { createDeck } from './helper'

const Container = styled.div`
  width: 100%;
  height: 700px;
`

const ShipViz = () => {
  const [plotData, setPlotdata] = useState([])
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedDeck, shipData } = state
  useEffect(() => {
    const decks = Object.keys(shipData)
    const coords = decks.map(deck =>
      createDeck(shipData[deck], parseInt(deck), selectedDeck)
    )
    setPlotdata(coords)
  }, [selectedDeck, shipData])
  return !plotData.length ? (
    <Container />
  ) : (
    <Plot
      data={plotData}
      layout={layout}
      revision={Math.random()}
      useResizeHandler={true}
      style={{ width: '100%', height: '700px' }}
    />
  )
}

export default ShipViz
