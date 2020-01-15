import React from 'react'
import styled from 'styled-components'
import SelectPeerShip from './SelectPeerShip'
import SelectPeerSailingDates from './SelectPeerSailingDates'

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.jungleMist};
  padding: 1em 0em 0em 2em;
  > div {
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
      <SelectPeerSailingDates />
    </Container>
  )
}

export default PeerGroupFilters
