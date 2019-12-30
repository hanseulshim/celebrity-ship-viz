import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Filters from './filters'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ShipViz = () => {
  return (
    <Container>
      <Header />
      <Filters />
    </Container>
  )
}

export default ShipViz
