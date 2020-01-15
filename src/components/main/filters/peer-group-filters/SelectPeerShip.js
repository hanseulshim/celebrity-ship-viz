import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'
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
    { id: 1, name: 'Ship 1' },
    { id: 2, name: 'Ship 2' },
    { id: 3, name: 'Ship 3' }
  ]
  const onChange = value => {
    dispatch({ type: 'setSelectedPeerShip', value })
    console.log(value)
  }
  //   if (loading) return <Loader />
  //   if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Ship(s)"
      mode="multiple"
      displayKey="name"
      //   options={data.sailingDateList}
      options={options}
      value={selectedPeerShip}
      width={500}
      onChange={onChange}
    />
  )
}

export default SelectPeerShip
