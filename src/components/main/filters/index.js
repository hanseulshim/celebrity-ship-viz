import React from 'components/main/filters/node_modules/react'
import styled from 'components/main/filters/node_modules/styled-components'
import MainFilters from './main-filters'
// import PeerGroupFilters from './peer-group-filters'

const Container = styled.div`
  background-color: rgb(0, 0, 0, 0);
  padding: 2em 2em;
`

const Filters = () => {
  return (
    <Container>
      <MainFilters />
      {/* <PeerGroupFilters /> */}
    </Container>
  )
}

export default Filters
