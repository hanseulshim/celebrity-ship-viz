import React from 'react'
import styled from 'styled-components'

// Project Imports
import SelectProduct from './SelectProduct'
import SelectItinerary from './SelectItinerary'
import SelectShip from './SelectShip'
import PeerGroupToggle from './PeerGroupToggle'
import SelectSailDate from './SelectSailDate'
import Button from 'components/common/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

// const Download = styled(Button)`
//   align-self: flex-end;
// `

const MainFilters = () => {
  return (
    <Container>
      <PeerGroupToggle />
      <SelectShip />
      <SelectProduct />
      <SelectItinerary />
      <SelectSailDate />
      <Button primary>Apply</Button>
      <Button style={{ marginLeft: 'auto' }}>
        <FontAwesomeIcon icon="download" />
        Download
      </Button>
    </Container>
  )
}

export default MainFilters
