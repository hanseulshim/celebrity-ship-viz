import React, { useContext } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'

// Project Imports
import MainFilters from './main-filters'
import PeerGroupFilters from './peer-group-filters'

const Container = styled.div`
  background-color: rgb(0, 0, 0, 0);
  padding: 2em 2em;
  font-size: 1rem;
`

const Filters = () => {
  const globalState = useContext(store)
  const {
    state: { peerGroupFilters }
  } = globalState

  return (
    <Container>
      <MainFilters />
      {peerGroupFilters && <PeerGroupFilters />}
    </Container>
  )
}

export default Filters
