import React, { useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import { GET_FIRST_SAIL_DATE } from 'graphql/queries'

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
  const globalState = useContext(store)
  const { dispatch } = globalState

  const { data } = useQuery(GET_FIRST_SAIL_DATE)

  useEffect(() => {
    if (data) {
      dispatch({ type: 'setSelectedShip', value: data.firstSailDate.ship })
      dispatch({ type: 'setSelectedSailDate', value: data.firstSailDate.sailingDate })
    }
  }, [data])

  return (
    <Container>
      <Header />
      <Filters />
      <Row>
        <Charts />
        <VizContainer>
          <SubFilters />
          <Row style={{ flex: '3' }}>
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
