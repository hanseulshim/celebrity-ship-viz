import React from 'react'
import styled from 'styled-components'

// Project Imports
import Header from './Header'
import Filters from './filters'
import SubFilters from './filters/sub-filters'
import ShipViz from './ship-viz'
import Timeline from './filters/timeline'

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
  padding-right: 2em;
`
const ShipVizContainer = styled.div`
  flex: 4;
`

const LegendContainer = styled.div`
  flex: 1;
  flex-direction: column;
  border: 3px solid ${props => props.theme.black50};
`

const TimelineContainer = styled.div`
  flex: 4;
  border: 3px solid ${props => props.theme.black50};
  padding: 0em 1em;
`
const DeckViewContainer = styled.div`
  flex: 1;
  border: 3px solid ${props => props.theme.black50};
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
          <Row style={{ flex: 5 }}>
            <ShipVizContainer>
              <ShipViz />
            </ShipVizContainer>
            <LegendContainer />
          </Row>
          <Row style={{ flex: 1 }}>
            <TimelineContainer style={{ height: '150px' }}>
              <Timeline />
            </TimelineContainer>
            <DeckViewContainer />
          </Row>
        </VizContainer>
      </Row>
    </Container>
  )
}

export default Main
