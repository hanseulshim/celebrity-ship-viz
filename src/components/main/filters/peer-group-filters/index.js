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

const Title = styled.h2`
  color: ${props => props.theme.jungleMist};
`

const PeerGroupFilters = () => {
  return (
    <Container>
      <Title>Peer Group</Title>
    </Container>
  )
}

export default PeerGroupFilters
