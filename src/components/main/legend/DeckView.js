import React from 'react'
import styled from 'styled-components'
import deckView from 'assets/ship_nav.png'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const DeckView = () => {
  return (
    <Container>
      <img src={deckView} />
    </Container>
  )
}

export default DeckView
