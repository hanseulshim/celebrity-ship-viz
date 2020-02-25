import React, { useContext, useState } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { DECK_SLICE_SVG_URL } from './config'
import { GET_DECK_LIST } from 'graphql/queries'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import { useQuery } from '@apollo/client'
import numeral from 'numeral'

const Container = styled.div`
  display: flex;
  min-height: 500px;
  flex-direction: column;
  flex-flow: column-reverse;
  padding: 1em 1em;
  border: 2px solid ${props => props.theme.biscay};
`
const Deck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.jungleMist};
  margin: 1em 0em;
  cursor: pointer;

  span {
    border-bottom: ${props =>
      props.selected ? `1px solid ${props.theme.jungleMist}` : ''};
  }

  img {
    width: 200px;
  }
`

const DeckSvg = ({ deck }) => {
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedDeck, selectedShip } = state
  const [hover, setHover] = useState(false)
  const getSrc = () =>
    hover || selectedDeck === deck
      ? DECK_SLICE_SVG_URL.replace(
          '{SHIP_CLASS}',
          selectedShip.classId
        ).replace('{DECK}', `${deck}_ro`)
      : DECK_SLICE_SVG_URL.replace(
          '{SHIP_CLASS}',
          selectedShip.classId
        ).replace('{DECK}', deck)
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
  const { selectedDeck, selectedShip } = state
  const [deckList, setDeckList] = useState([])
  const { loading, error } = useQuery(GET_DECK_LIST, {
    variables: { shipId: selectedShip.id },
    onCompleted({ deckList }) {
      dispatch({ type: 'setSelectedDeck', value: Math.min(...deckList) })
      setDeckList(deckList)
    }
  })

  const handleSelect = value => {
    dispatch({ type: 'setSelectedDeck', value })
  }

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }
  if (error) {
    return (
      <Container>
        <Notification type="error" message={error.message} />
      </Container>
    )
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
            <DeckSvg deck={deck} />
          </Deck>
        )
      })}
    </Container>
  )
}

export default SelectDeck
