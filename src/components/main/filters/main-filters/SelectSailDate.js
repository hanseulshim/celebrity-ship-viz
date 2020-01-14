import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'
import Notification from 'components/common/Notification'
import Loader from 'components/common/Loader'

// GQL
import { GET_SAIL_DATE_LIST } from 'graphql/queries'

const SelectSailDate = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedItinerary, selectedSailDate } = state

  const { loading, error, data } = useQuery(GET_SAIL_DATE_LIST, {
    variables: { id: selectedItinerary },
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
      displayKey="date"
      options={data.sailDateList}
      value={selectedSailDate}
      onChange={onChange}
    />
  )
}

export default SelectSailDate
