import React, { useContext, useState } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'

// Get array of all SVGS from assets

const reqSvgs = require.context('assets/deck_slices', true, /\.svg$/)

// Create array of Objects
const svgs = reqSvgs.keys().map(path => ({ path, file: reqSvgs(path) }))

// Split array into two. One of originals and one of rolllovers
const originals = svgs.filter(svg => !svg.path.includes('_ro'))
const rollOvers = svgs.filter(svg => svg.path.includes('_ro'))

// Create array of deck objects with path to original, rollover, and name
const decks = originals.map((obj, i) => ({
  ...obj,
  rollOver: rollOvers[i].file,
  name: obj.path.replace(/\.\/|\.svg/g, ''),
  value: parseInt(obj.path.replace(/\.\/[A-z]+|\.svg/g, ''))
}))

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

const DeckSvg = ({ path, rollOverPath }) => {
  const [image, setImage] = useState(path)

  const handleRollover = () => {
    setImage(rollOverPath)
  }

  const handleMouseExit = () => {
    setImage(path)
  }
  return (
    <img
      src={image}
      onMouseOver={handleRollover}
      onMouseOut={handleMouseExit}
      alt="deck"
    />
  )
}

const SelectDeck = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedDeck } = state

  const handleSelect = value => {
    dispatch({ type: 'setSelectedDeck', value })
  }
  return (
    <Container>
      {decks.map((deck, i) => {
        return (
          <Deck
            key={'deck' + i}
            onClick={() => handleSelect(deck.value)}
            selected={selectedDeck === deck.value}
          >
            <span>{deck.name}</span>
            <DeckSvg path={deck.file} rollOverPath={deck.rollOver} />
          </Deck>
        )
      })}
    </Container>
  )
}

export default SelectDeck
