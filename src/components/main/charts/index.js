import React from 'react'
import styled from 'styled-components'
import SupplyBurndown from './SupplyBurndown'
import CategoryClass from './CategoryClass'
import Decks from './Decks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  padding-top: 0;
  background-color: ${props => props.theme.black50};
  min-width: 450px;

  > div {
    margin-bottom: 2.5%;
  }
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
