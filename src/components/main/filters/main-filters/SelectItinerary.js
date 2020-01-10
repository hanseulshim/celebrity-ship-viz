import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'

// GQL
import { GET_ITINERARY_LIST } from 'graphql/queries'

const SelectItinerary = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedShip, selectedItinerary } = state

  const { loading, error, data } = useQuery(GET_ITINERARY_LIST, {
    variables: { id: selectedShip },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    dispatch({ type: 'setSelectedItinerary', value })
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <FilterSelect
      label="Itinerary"
      options={data.itineraryList}
      value={selectedItinerary}
      onChange={onChange}
    />
  )
}

export default SelectItinerary
