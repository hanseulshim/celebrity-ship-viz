import React from 'react'
import styled from 'styled-components'

// Project Imports
import SelectProduct from './SelectProduct'
import SelectShip from './SelectShip'
import PeerGroupToggle from './PeerGroupToggle'
import SailDatePicker from './SailDatePicker'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.lightBlueGrey};

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
      {/* <FilterSelect
        label="Itinerary"
        options={data.productList}
        onChange={v => console.log(v)}
      /> */}
      <SailDatePicker />
    </Container>
  )
}

export default MainFilters
