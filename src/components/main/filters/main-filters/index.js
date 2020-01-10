import React from 'react'
import styled from 'styled-components'

// Project Imports
import SelectProduct from './SelectProduct'
import SelectItinerary from './SelectItinerary'
import SelectShip from './SelectShip'
import PeerGroupToggle from './PeerGroupToggle'
import SailDatePicker from './SailDatePicker'

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

const MainFilters = () => {
  return (
    <Container>
      <PeerGroupToggle />
      <SelectProduct />
      <SelectShip />
      <SelectItinerary />
      <SailDatePicker />
    </Container>
  )
}

export default MainFilters
