import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_PRODUCT_LIST } from 'graphql/queries'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const SelectProduct = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedShip, selectedProduct } = state
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST, {
    variables: {
      shipId: selectedShip.id
    },
    fetchPolicy: 'network-only'
  })

  const onChange = id => {
    const product = data.productList.find(product => product.id === id)
    dispatch({ type: 'setSelectedProduct', value: product })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Product"
      displayKey="rdssProductCode"
      options={data.productList}
      value={selectedProduct.id}
      onChange={onChange}
    />
  )
}

export default SelectProduct
