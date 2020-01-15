import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelectGroup from 'components/common/FilterSelectGroup'
import Notification from 'components/common/Notification'
import Loader from 'components/common/Loader'

// GQL
// import { GET_SAILING_DATE_LIST } from 'graphql/queries'

const SelectPeerShip = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedPeerShip } = state
  //   const { loading, error, data } = useQuery(GET_SAILING_DATE_LIST, {
  //     variables: {
  //       shipId: selectedShip,
  //       productId: selectedProduct,
  //       itineraryId: selectedItinerary
  //     },
  //     fetchPolicy: 'network-only'
  //   })

  const options = [
    { id: 1, name: 'Ship 1', class: 'a' },
    { id: 2, name: 'Ship 2', class: 'b' },
    { id: 3, name: 'Ship 3', class: 'b' },
    { id: 4, name: 'Ship 4', class: 'c' }
  ]
  const onChange = value => {
    dispatch({ type: 'setSelectedPeerShip', value })
    console.log(value)
  }
  //   if (loading) return <Loader />
  //   if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelectGroup
      label="Ship(s)"
      mode="multiple"
      displayKey="name"
      //   options={data.sailingDateList}
      options={options}
      grouping="class"
      value={selectedPeerShip}
      width={500}
      onChange={onChange}
    />
  )
}

export default SelectPeerShip
