import React from 'react'
import styled from 'styled-components'

// Project Imports
import SelectPeerShip from './SelectPeerShip'
import SelectPeerProduct from './SelectPeerProduct'
import SelectPeerSailingDates from './SelectPeerSailingDates'
import PeerSubFilters from './PeerSubFilters'

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.jungleMist};
  padding: 1em 0em 0em 2em;
  > div,
  .ant-calendar-picker {
    margin-right: 2em;
  }
`

const Title = styled.div`
  color: ${props => props.theme.jungleMist};
  font-size: 1.5em;
`

const PeerGroupFilters = () => {
  return (
    <Container>
      <Title>Peer Group</Title>
      <SelectPeerShip />
      <SelectPeerProduct />
      <SelectPeerSailingDates />
      <PeerSubFilters />
    </Container>
  )
}

export default PeerGroupFilters
