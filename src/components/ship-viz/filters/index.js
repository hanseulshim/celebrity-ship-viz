import React, { useState } from 'react'
import styled from 'styled-components'
import FilterSelect from './FilterSelect'
import { useQuery } from '@apollo/react-hooks'
import DatasetToggle from './DatasetToggle'

// GQL
import { GET_PRODUCT_LIST } from '../../../graphql/queries'
import SailDatePicker from './SailDatePicker'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.ghostWhite};
  padding: 2em 2em;
`

const Filters = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST)

  // const [filters, setFilter] = useState({
  //   singleSailing: true
  // })

  if (loading) return <p>Loading available datasets</p>
  return (
    <Container>
      <DatasetToggle />
      <FilterSelect
        label="Product"
        options={data.productList}
        onChange={v => console.log(v)}
      />
      <FilterSelect
        label="Ship"
        options={data.productList}
        onChange={v => console.log(v)}
      />
      <FilterSelect
        label="Itinerary"
        options={data.productList}
        onChange={v => console.log(v)}
      />
      <SailDatePicker />
    </Container>
  )
}

export default Filters
