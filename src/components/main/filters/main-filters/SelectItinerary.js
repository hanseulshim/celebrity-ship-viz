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
    variables: { shipId: selectedShip.id, productId: selectedProduct.id },
    fetchPolicy: 'network-only'
  })

  const onChange = id => {
    const itinerary = data.itineraryList.find(itinerary => itinerary.id === id)
    dispatch({ type: 'setSelectedItinerary', value: itinerary })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Itinerary"
      displayKey="itineraryDesc"
      options={data.itineraryList}
      value={selectedItinerary.id}
      onChange={onChange}
      width={250}
    />
  )
}

export default SelectItinerary
