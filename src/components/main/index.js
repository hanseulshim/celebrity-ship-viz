import React from 'react'
import styled from 'styled-components'

// Project Imports
import Header from './Header'
import Filters from './filters'
import SubFilters from './filters/sub-filters'
import ShipViz from './ship-viz'
import Timeline from './filters/timeline'
import Legend from './legend'
import DeckView from './legend/DeckView'
import Charts from './charts'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`
const VizContainer = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  padding-right: 2em;
`

const Main = () => {
  return (
    <Container>
      <Header />
      <Filters />
      <Row>
        <Charts />
        <VizContainer>
          <SubFilters />
          <Row style={{ flex: '4' }}>
            <ShipViz />
            <Legend />
          </Row>
          <Row style={{ flex: '1', minHeight: '150px' }}>
            <Timeline />
            <DeckView />
          </Row>
        </VizContainer>
      </Row>
    </Container>
  )
}

export default Main
