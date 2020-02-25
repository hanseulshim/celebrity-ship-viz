import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_PRODUCT_LIST } from 'graphql/queries'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const SelectPeerProduct = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedShip, selectedPeerProduct } = state
  const { loading, error, data } = useQuery(GET_PRODUCT_LIST, {
    variables: {
      shipId: selectedShip.id
    },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    dispatch({ type: 'setSelectedPeerProduct', value })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Product(s)"
      mode="multiple"
      width={300}
      displayKey="rdssProductCode"
      options={data.productList}
      value={selectedPeerProduct}
      onChange={onChange}
    />
  )
}

export default SelectPeerProduct
