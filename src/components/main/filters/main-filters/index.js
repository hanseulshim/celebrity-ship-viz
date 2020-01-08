import React from 'components/main/filters/main-filters/node_modules/react'
import styled from 'components/main/filters/main-filters/node_modules/styled-components'
import FilterSelect from './FilterSelect'
import { useQuery } from 'components/main/filters/main-filters/node_modules/@apollo/client'
import DatasetToggle from './DatasetToggle'

// GQL
import { GET_PRODUCT_LIST } from 'components/main/filters/main-filters/node_modules/graphql/queries'

import SailDatePicker from './SailDatePicker'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  color: ${props => props.theme.lightBlueGrey};
`

const MainFilters = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST)

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

export default MainFilters
