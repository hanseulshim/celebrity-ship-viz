import React, { useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import peerGroupLegend from 'assets/peer-legend.png'

// Project Imports
import SelectDeck from './SelectDeck'
import LegendColors from './LegendColors'

const LegendContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const PeerGroupLegend = styled.img`
  width: 315px;
  margin: 20px 0px;
`

const Legend = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { peerGroupFilters } = state

  return (
    <LegendContainer>
      {peerGroupFilters ? (
        <PeerGroupLegend src={peerGroupLegend} />
      ) : (
        <LegendColors />
      )}
      <SelectDeck />
    </LegendContainer>
  )
}

export default Legend
