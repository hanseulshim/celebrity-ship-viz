import React from 'react'
import styled from 'styled-components'

// Project Imports
import Header from './Header'
import Filters from './filters'
import SubFilters from './filters/sub-filters'
import ShipViz from './ship-viz'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
`

const ChartColumn = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  background-color: ${props => props.theme.black50};
`

const VizContainer = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
`

const Main = () => {
  return (
    <Container>
      <Header />
      <Filters />
      <Row>
        <ChartColumn />
        <VizContainer>
          <SubFilters />
          <ShipViz />
        </VizContainer>
      </Row>
    </Container>
  )
}

export default Main
