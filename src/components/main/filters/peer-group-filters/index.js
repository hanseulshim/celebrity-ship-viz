import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.jungleMist};
  padding: 1em 0em;
  > div {
    margin-right: 2em;
  }
`

const PeerGroupFilters = () => {
  return (
    <Container>
      <span>Peer Group Filters</span>
    </Container>
  )
}

export default PeerGroupFilters
