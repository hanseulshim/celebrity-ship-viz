import React from 'react'
import styled from 'styled-components'
import SupplyBurndown from './SupplyBurndown'

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
      <Chart>Chart 2</Chart>
      <Chart>Chart 3</Chart>
    </Container>
  )
}

export default Charts
