import React, { useContext } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { DECK_LEGEND_SVG_URL } from './config'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 315px;
`

const DeckView = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedDeck } = state
  return (
    <Container>
      {Number.isInteger(selectedDeck) && (
        <img
          src={DECK_LEGEND_SVG_URL.replace('{DECK}', selectedDeck)}
          alt="deck-view"
        />
      )}
    </Container>
  )
}

export default DeckView
