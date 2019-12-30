import React from 'react'
import styled from 'styled-components'
import FilterSelect from './FilterSelect'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.ghostWhite};
  padding: 2em 0em;
`

const Filters = () => {
  return (
    <Container>
      <FilterSelect label="Filter 1" options={['1', '2', '3']} />
    </Container>
  )
}

export default Filters
