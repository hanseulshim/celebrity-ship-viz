import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'

// Project Components
import FilterSelectGroup from 'components/common/FilterSelectGroup'
import Notification from 'components/common/Notification'
import Loader from 'components/common/Loader'

// GQL
import { GET_SHIP_LIST } from 'graphql/queries'

const SelectShip = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedShip } = state

  const { loading, error, data } = useQuery(GET_SHIP_LIST)

  const onChange = value => {
    dispatch({ type: 'setSelectedShip', value })
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <FilterSelectGroup
      label="Ship"
      displayKey="shipName"
      grouping="className"
      options={data.shipList}
      value={selectedShip}
      onChange={onChange}
    />
  )
}

export default SelectShip
