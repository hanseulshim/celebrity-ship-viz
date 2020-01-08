import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Filters from './filters'
import ShipViz from './ship-viz'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = () => {
  return (
    <Container>
      <Header />
      <Filters />
      <ShipViz />
    </Container>
  )
}

export default Main
