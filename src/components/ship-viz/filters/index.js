import React, { useState } from 'react'
import styled from 'styled-components'
import MainFilters from './main-filters'

const Container = styled.div`
  background-color: rgb(0, 0, 0, 0);
  padding: 2em 2em;
`

const Filters = () => {
  return (
    <Container>
      <MainFilters />
    </Container>
  )
}

export default Filters
