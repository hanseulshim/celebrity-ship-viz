import React, { useContext, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { store } from 'context/store'
import styled from 'styled-components'
import { Select, Icon } from 'antd'

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
  justify-content: space-around;
  align-items: center;
  padding: 0em 1em;
  height: 100px;
`

const ChangeInterval = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.white};
  cursor: pointer;
  font-size: 2em;
`

const IntervalMeter = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background-color: ${props => props.theme.dusk};
`

const IntervalPosition = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 3px;
  width: ${props => props.width}
  background-color: ${props => props.theme.babyBlue};
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

  const handleStep = dir => {
    const { snapshotIntervalList } = data
    const getCurrent = snapshot => snapshot.interval === selectedInterval
    const index = snapshotIntervalList.findIndex(getCurrent)
    if (dir === 'prev' && index !== 0) {
      dispatch({
        type: 'setselectedInterval',
        value: snapshotIntervalList[index - 1].interval
      })
    }
    if (dir === 'next' && index !== snapshotIntervalList.length - 1) {
      dispatch({
        type: 'setselectedInterval',
        value: snapshotIntervalList[index + 1].interval
      })
    }
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

  const getWidth = () => {
    const { snapshotIntervalList } = data
    const total = snapshotIntervalList[snapshotIntervalList.length - 1].interval
    console.log(total, selectedInterval)

    return `${(1 - selectedInterval / total) * 100}%`
  }

  if (loading) return <Loader />
  if (error) {
    return <Notification type="error" message={error.message} />
  }
  return (
    Object.entries(shipData).length > 0 && (
      <Container>
        <ChangeInterval>
          <StyledIcon
            type="caret-left"
            style={{ color: 'white' }}
            onClick={() => handleStep('prev')}
          />
          <Select
            style={{ width: 400 }}
            value={selectedInterval}
            onChange={handleSelect}
          >
            {data.snapshotIntervalList.map((snapshot, i) => (
              <Option value={snapshot.interval} key={'interval' + i}>
                {snapshot.intervalLabel + ' to departure'}
              </Option>
            ))}
          </Select>
          <StyledIcon
            type="caret-right"
            style={{ color: 'white' }}
            onClick={() => handleStep('next')}
          />
        </ChangeInterval>
        <IntervalMeter>
          <IntervalPosition width={getWidth()} />
        </IntervalMeter>
      </Container>
    )
  )
}

export default Timeline
