import React, { useContext, useState, useEffect } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { deckList, SVG_URL } from './config'
import numeral from 'numeral'

const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-flow: column-reverse;
  padding: 1em 1em;
  border: 2px solid ${props => props.theme.biscay};
`
const Deck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.jungleMist};
  cursor: pointer;

  span {
    border-bottom: ${props =>
      props.selected ? `1px solid ${props.theme.jungleMist}` : ''};
  }
`

const DeckSvg = ({ deck, selectedDeck }) => {
  const [hover, setHover] = useState(false)
  const getSrc = () =>
    hover || selectedDeck === deck
      ? SVG_URL.replace('{SHIP_CLASS}', 3).replace('{DECK}', `${deck}_ro`)
      : SVG_URL.replace('{SHIP_CLASS}', 3).replace('{DECK}', deck)
  return (
    <img
      src={getSrc()}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      alt="deck"
    />
  )
}

const SelectDeck = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedDeck } = state

  useEffect(() => {
    dispatch({ type: 'setSelectedDeck', value: Math.min(...deckList) })
  }, [])

  const handleSelect = value => {
    dispatch({ type: 'setSelectedDeck', value })
  }

  return (
    <Container>
      {deckList.map((deck, i) => {
        return (
          <Deck
            key={'deck' + i}
            onClick={() => handleSelect(deck)}
            selected={selectedDeck === deck}
          >
            <span>Deck {numeral(deck).format('00')}</span>
            <DeckSvg deck={deck} selectedDeck={selectedDeck} />
          </Deck>
        )
      })}
    </Container>
  )
}

export default SelectDeck
