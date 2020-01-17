import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'
import Notification from 'components/common/Notification'
import Loader from 'components/common/Loader'

// GQL
import { GET_SAILING_DATE_LIST } from 'graphql/queries'

const SelectSailDate = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const {
    selectedShip,
    selectedProduct,
    selectedItinerary,
    selectedSailDate
  } = state

  const { loading, error, data } = useQuery(GET_SAILING_DATE_LIST, {
    variables: {
      shipId: selectedShip,
      productId: selectedProduct,
      itineraryId: selectedItinerary
    },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    dispatch({ type: 'setSelectedSailDate', value })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Sail Date"
      displayKey="sailingDate"
      options={data.sailingDateList}
      value={selectedSailDate}
      onChange={onChange}
    />
  )
}

export default SelectSailDate
