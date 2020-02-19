import React from 'react'
import styled from 'styled-components'
import SupplyBurndown from './SupplyBurndown'
import CategoryClass from './CategoryClass'
import Decks from './Decks'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2em;
`

const Charts = () => {
  return (
    <Container>
      <SupplyBurndown />
      <CategoryClass />
      <Decks />
    </Container>
  )
}

export default Charts
