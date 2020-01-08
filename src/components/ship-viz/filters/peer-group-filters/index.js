import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.ghostWhite};
`

const PeerGroupFilters = () => {
  return (
    <Container>
      <span>Peer Group Filters</span>
    </Container>
  )
}

export default PeerGroupFilters
