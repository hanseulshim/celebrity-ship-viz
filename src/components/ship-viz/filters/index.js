import React from 'react'
import styled from 'styled-components'
import FilterSelect from './FilterSelect'
import { useQuery } from '@apollo/react-hooks'

// Queries
import { GET_DATASET_LIST } from '../../../graphql/queries'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.ghostWhite};
  padding: 2em 0em;
`

const Filters = () => {
  const { loading, error, data } = useQuery(GET_DATASET_LIST)

  if (loading) return <p>Loading</p>
  return (
    <Container>
      <FilterSelect label="Dataset" options={data.datasetList} />
    </Container>
  )
}

export default Filters
