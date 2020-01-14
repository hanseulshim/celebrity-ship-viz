import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_ITINERARY_LIST } from 'graphql/queries'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const SelectItinerary = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedShip, selectedProduct, selectedItinerary } = state

  const { loading, error, data } = useQuery(GET_ITINERARY_LIST, {
    variables: { shipId: selectedShip, productId: selectedProduct },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    dispatch({ type: 'setSelectedItinerary', value })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Itinerary"
      displayKey="itineraryDesc"
      options={data.itineraryList}
      value={selectedItinerary}
      onChange={onChange}
      width={300}
    />
  )
}

export default SelectItinerary
