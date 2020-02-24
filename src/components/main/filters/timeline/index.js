import React, { useContext, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { store } from 'context/store'
import styled from 'styled-components'
import { Select, Icon } from 'antd'
import { StyledSelect } from 'components/common/StyledComponents'

// GQL
import { GET_BOOKING_WEEK_LIST, GET_VISUAL_DECK_LIST } from 'graphql/queries'
import { getSubFilters } from 'helper'
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
`

const ChangeInterval = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  font-size: 2em;

  > svg {
    color: ${props => props.theme.babyBlue};
    cursor: pointer;
  }
`

const IntervalMeter = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  height: 10px;
  border-radius: 3px;
  background-color: ${props => props.theme.dusk};
`

const IntervalPosition = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 3px;
  width: ${props => props.width};
  background-color: ${props => props.theme.babyBlue};
`

const Timeline = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const {
    selectedSailDate,
    selectedBookingWeek,
    selectedShip,
    filter,
    filterCount,
    shipData
  } = state

  const { loading, error, data } = useQuery(GET_BOOKING_WEEK_LIST, {
    fetchPolicy: 'network-only'
  })

  const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
    onCompleted: data => {
      dispatch({ type: 'setShipData', value: data.deckVisualList })
    },
    fetchPolicy: 'network-only'
  })

  const handleSelect = (e, value) => {
    applyFilters({
      variables: {
        shipId: selectedShip.id,
        sailingDateId: selectedSailDate.id,
        interval: value,
        ...getSubFilters(filter, filterCount)
      }
    })
    dispatch({ type: 'setSelectedBookingWeek', value })
  }

  useEffect(() => {
    const onCompleted = data => {
      if (data.snapshotIntervalList.length) {
        dispatch({
          type: 'setSelectedBookingWeek',
          value:
            data.snapshotIntervalList[data.snapshotIntervalList.length - 1]
              .interval
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

  const handleStep = dir => {
    const { snapshotIntervalList } = data
    const getCurrent = snapshot => snapshot.interval === selectedBookingWeek
    const index = snapshotIntervalList.findIndex(getCurrent)
    if (dir === 'prev' && index !== 0) {
      dispatch({
        type: 'setSelectedBookingWeek',
        value: snapshotIntervalList[index - 1].interval
      })
      applyFilters({
        variables: {
          shipId: selectedShip.id,
          sailingDateId: selectedSailDate.id,
          interval: snapshotIntervalList[index - 1].interval,
          ...getSubFilters(filter, filterCount)
        }
      })
    }
    if (dir === 'next' && index !== snapshotIntervalList.length - 1) {
      dispatch({
        type: 'setSelectedBookingWeek',
        value: snapshotIntervalList[index + 1].interval
      })
      applyFilters({
        variables: {
          shipId: selectedShip.id,
          sailingDateId: selectedSailDate.id,
          interval: snapshotIntervalList[index + 1].interval,
          ...getSubFilters(filter, filterCount)
        }
      })
    }
  }

  const getWidth = () => {
    const { snapshotIntervalList } = data
    const total = snapshotIntervalList[0].interval

    return `${(1 - selectedBookingWeek / total) * 100}%`
  }

  if (loading) return <Loader />
  if (error) {
    return <Notification type="error" message={error.message} />
  }
  return (
    Object.entries(shipData).length > 0 && (
      <Container>
        <ChangeInterval>
          <StyledIcon type="caret-left" onClick={() => handleStep('prev')} />
          <StyledSelect
            style={{ width: 250 }}
            value={selectedBookingWeek}
            onChange={handleSelect}
            timeline
          >
            {data.snapshotIntervalList.map((snapshot, i) => (
              <Option value={snapshot.interval} key={'interval' + i}>
                {snapshot.intervalLabel + ' to departure'}
              </Option>
            ))}
          </StyledSelect>
          <StyledIcon type="caret-right" onClick={() => handleStep('next')} />
        </ChangeInterval>
        <IntervalMeter>
          <IntervalPosition width={getWidth()} />
        </IntervalMeter>
      </Container>
    )
  )
}

export default Timeline
