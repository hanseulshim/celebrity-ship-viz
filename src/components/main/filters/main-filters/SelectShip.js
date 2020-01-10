import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_SHIP_LIST } from 'graphql/queries'

const SelectShip = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedProduct, selectedShip } = state

  const { loading, error, data } = useQuery(GET_SHIP_LIST, {
    variables: { id: selectedProduct },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    dispatch({ type: 'setSelectedShip', value })
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <FilterSelect
      label="Ship"
      options={data.shipList}
      value={selectedShip}
      onChange={onChange}
    />
  )
}

export default SelectShip