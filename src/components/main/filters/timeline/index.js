import React, { useContext, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { store } from 'context/store'
import styled from 'styled-components'
import { Select } from 'antd'

// GQL
import { GET_INTERVAL_LIST, GET_VISUAL_DECK_LIST } from 'graphql/queries'

// Project Imports
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const { Option } = Select

const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Timeline = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedInterval, selectedSailDate, selectedShip, shipData } = state

  const { loading, error, data } = useQuery(GET_INTERVAL_LIST, {
    fetchPolicy: 'network-only'
  })

  const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
    onCompleted: data => {
      dispatch({ type: 'setShipData', value: data.deckVisualList })
    },
    fetchPolicy: 'network-only'
  })

  const handleSelect = value => {
    applyFilters({
      variables: {
        shipId: selectedShip.id,
        sailingDateId: selectedSailDate.id,
        interval: value
      }
    })
    dispatch({ type: 'setselectedInterval', value })
  }

  useEffect(() => {
    const onCompleted = data => {
      if (data.snapshotIntervalList.length) {
        dispatch({
          type: 'setselectedInterval',
          value: data.snapshotIntervalList[0].interval
        })
      }
    }
    const onError = error => {
      return <Notification type="error" message={error.message} />
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data)
      } else if (onError && !loading && error) {
        onError(error)
      }
    }
  }, [loading, data, error, dispatch])

  if (loading) return <Loader />
  if (error) {
    return <Notification type="error" message={error.message} />
  }
  return (
    Object.entries(shipData).length && (
      <Container>
        <Select
          style={{ width: 400 }}
          value={selectedInterval}
          onChange={handleSelect}
        >
          {data.snapshotIntervalList.map((interval, i) => (
            <Option value={interval.interval} key={'interval' + i}>
              {interval.intervalLabel}
            </Option>
          ))}
        </Select>
      </Container>
    )
  )
}

export default Timeline
