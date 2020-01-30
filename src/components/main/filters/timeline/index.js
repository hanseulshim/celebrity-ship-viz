import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'
import styled from 'styled-components'

// GQL
import { GET_BOOKING_WEEK_LIST } from 'graphql/queries'

// Project Imports
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const LineContainer = styled.div`
  flex: 3;
  position: relative;
  height: 150px;
  display: flex;
  justify-content: center;

  ::after {
    content: '';
    position: absolute;
    height: 2.5px;
    background-color: ${props => props.theme.lochmara};
    top: 50%;
    width: 90%;
    border-radius: 3px;
  }
`

const MarkerContainer = styled.div`
  position: absolute;
  top: 49%;
  display: flex;
  justify-content: space-between;
  width: 90%;
`

const Marker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;

  .week {
    color: ${props => props.theme.white};
  }

  .date {
    color: ${props => props.theme.jungleMist};
  }
`

const Dot = styled.div`
  border-radius: 50%;
  height: ${props => (props.selected ? '12px' : '7px')};
  width: ${props => (props.selected ? '12px' : '7px')};
  border: 1px solid ${props => props.theme.lochmara};
  position: relative;
  bottom: ${props => (props.selected ? '4px' : '')};
  background-color: ${props => props.theme.white};
  z-index: 3;
  transition: all 0.1s ease;
`

const Timeline = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedSailDate, selectedBookingWeek } = state

  // const { loading, error, data } = useQuery(GET_BOOKING_WEEK_LIST, {
  //   variables: { sailingDate: selectedSailDate },
  //   fetchPolicy: 'network-only'
  // })

  const handleSelect = (e, value) => {
    dispatch({ type: 'setSelectedBookingWeek', value })
  }

  const bookingWeekList = [
    {
      week: 41,
      date: '01/28/20'
    },
    {
      week: 42,
      date: '01/21/20'
    },
    {
      week: 43,
      date: '01/14/20'
    },
    {
      week: 44,
      date: '01/07/20'
    },
    {
      week: 45,
      date: '12/31/19'
    },
    {
      week: 46,
      date: '12/24/19'
    },
    {
      week: 47,
      date: '12/17/19'
    },
    {
      week: 48,
      date: '12/10/19'
    },
    {
      week: 49,
      date: '12/03/19'
    },
    {
      week: 50,
      date: '11/26/19'
    },
    {
      week: 51,
      date: '11/19/19'
    }
  ]

  // if (loading) return <Loader />
  // if (error) return <Notification type="error" message={error.message} />

  return (
    <LineContainer>
      <MarkerContainer>
        {bookingWeekList.map((wk, i) => {
          return (
            <Marker key={'wk' + i} onClick={e => handleSelect(e, wk.week)}>
              <Dot
                selected={selectedBookingWeek === wk.week}
                className="ripple"
              />
              <Label>
                <span className="week">{`${wk.week} wk`}</span>
                <span className="date">{`${wk.date}`}</span>
              </Label>
            </Marker>
          )
        })}
      </MarkerContainer>
    </LineContainer>
  )
}

export default Timeline
