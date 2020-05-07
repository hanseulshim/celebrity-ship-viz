import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'

// Project Components
import FilterSelect from 'components/common/FilterSelect'
import Notification from 'components/common/Notification'
import Loader from 'components/common/Loader'

// GQL
import { GET_SHIP_LIST } from 'graphql/queries'

const SelectPeerShip = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedPeerShip } = state
  const { loading, error, data } = useQuery(GET_SHIP_LIST, {
    fetchPolicy: 'network-only'
  })
  const onChange = value => {
    dispatch({ type: 'setSelectedPeerShip', value })
  }
  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelect
      label="Ship(s)"
      mode="multiple"
      displayKey="shipName"
      options={data.shipList}
      value={selectedPeerShip}
      width={300}
      onChange={onChange}
    />
  )
}

export default SelectPeerShip
