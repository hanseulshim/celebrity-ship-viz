import React, { useContext } from 'react'
import { useLazyQuery } from '@apollo/client'
import { store } from 'context/store'
import styled from 'styled-components'

// Project Imports
import SelectProduct from './SelectProduct'
import SelectItinerary from './SelectItinerary'
import SelectShip from './SelectShip'
import PeerGroupToggle from './PeerGroupToggle'
import SelectSailDate from './SelectSailDate'
import Button from 'components/common/Button'
import CsvDownload from './CsvDownload'
import { getFilterVariables } from 'helper'

// Graphql
import { GET_VISUAL_DECK_LIST } from 'graphql/queries'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.jungleMist};
  padding: 1em 0em;
  > div {
    margin-right: 2em;
  }
`

const Apply = styled(Button)`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => props.theme.lochmara};
  color: ${props => props.theme.white};
`

const MainFilters = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const {
    selectedShip,
    selectedProduct,
    selectedItinerary,
    selectedSailDate,
    selectedBookingWeek,
    peerGroupFilters,
    selectedPeerShip,
    selectedPeerProduct,
    selectedPeerSailingDates,
    filter,
    peerFilter,
    filterCount
  } = state
  const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
    onCompleted: data => {
      dispatch({ type: 'setShipData', value: data.deckVisualList })
    },
    fetchPolicy: 'network-only'
  })

  const enableApply = () =>
    selectedShip && selectedProduct && selectedItinerary && selectedSailDate

  return (
    <Container>
      <PeerGroupToggle />
      <SelectShip />
      <SelectProduct />
      <SelectItinerary />
      <SelectSailDate />
      <Apply
        primary
        disabled={!enableApply()}
        onClick={() =>
          applyFilters({
            variables: getFilterVariables(
              selectedShip.id,
              selectedSailDate.id,
              selectedBookingWeek,
              selectedProduct.id,
              selectedItinerary.id,
              peerGroupFilters,
              selectedPeerShip,
              selectedPeerProduct.id,
              selectedPeerSailingDates[0],
              selectedPeerSailingDates[1],
              filter,
              peerFilter,
              filterCount
            )
          })
        }
      >
        Apply
      </Apply>
      <CsvDownload />
    </Container>
  )
}

export default MainFilters
