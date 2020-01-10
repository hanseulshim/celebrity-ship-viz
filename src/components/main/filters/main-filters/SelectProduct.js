import React, { useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_PRODUCT_LIST } from 'graphql/queries'

const SelectProduct = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST)
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedProduct } = state

  const onChange = value => {
    dispatch({ type: 'setSelectedProduct', value })
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <FilterSelect
      label="Product"
      options={data.productList}
      value={selectedProduct}
      onChange={onChange}
    />
  )
}

export default SelectProduct
