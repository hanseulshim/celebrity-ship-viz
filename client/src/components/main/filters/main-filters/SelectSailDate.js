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
      shipId: selectedShip.id,
      productId: selectedProduct.id,
      itineraryId: selectedItinerary.id
    },
    fetchPolicy: 'network-only'
  })

  const onChange = value => {
    const sailDate = data.sailingDateList.find(date => date.id === value)
    dispatch({ type: 'setSelectedSailDate', value: sailDate })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Sail Date"
      displayKey="sailingDate"
      options={data.sailingDateList}
      value={selectedSailDate.id}
      onChange={onChange}
    />
  )
}

export default SelectSailDate
