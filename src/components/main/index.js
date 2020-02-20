import React, { useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useQuery, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'

import { GET_FIRST_SAIL_DATE, GET_VISUAL_DECK_LIST } from 'graphql/queries'

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
  const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
    onCompleted: data => {
      dispatch({ type: 'setShipData', value: data.deckVisualList })
    },
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (data) {
      dispatch({ type: 'setSelectedShip', value: data.firstSailDate.ship })
      dispatch({ type: 'setSelectedSailDate', value: data.firstSailDate.sailingDate })
      applyFilters({
        variables: {
          shipId: data.firstSailDate.ship.id,
          sailingDateId: data.firstSailDate.sailingDate.id,
          interval: data.firstSailDate.interval
        }
      })
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
