import React from 'react'
import styled from 'styled-components'
import SupplyBurndown from './SupplyBurndown'
import CategoryClass from './CategoryClass'
import Decks from './Decks'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2em;
`

const Chart = styled.div`
  flex: 1;
  color: ${props => props.theme.white};
`

const Charts = () => {
  return (
    <Container>
      <Chart>
        <SupplyBurndown />
      </Chart>
      <Chart>
        <CategoryClass />
      </Chart>
      <Decks />
    </Container>
  )
}

export default Charts
