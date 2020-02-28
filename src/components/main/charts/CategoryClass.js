import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import { GET_CABIN_CATEGORY_CLASS_CHART } from 'graphql/queries'
import { categoryClassLayout } from './config'
import { createCategoryClass } from './helper'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import Plot from 'react-plotly.js'
import categoryClassBlurry from 'assets/categoryClassBlurry.png'

const Blurry = styled.img`
  width: 400px;
`

const CategoryClass = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedShip, selectedSailDate, selectedBookingWeek } = state

  const { networkStatus, error, data } = useQuery(
    GET_CABIN_CATEGORY_CLASS_CHART,
    {
      variables: {
        shipId: selectedShip.id,
        sailingDateId: selectedSailDate.id,
        interval: selectedBookingWeek
      },
      skip:
        !selectedShip.id ||
        !selectedSailDate.id ||
        selectedBookingWeek === null,
      fetchPolicy: 'network-only'
    }
  )

  // local state for plot data
  const [plotData, setPlotdata] = useState([])

  useEffect(() => {
    if (data) {
      const bars = Object.keys(data.cabinCategoryClassChart)
      const barData = bars
        .filter(v => v !== '__typename' && v !== 'y')
        .map(bar =>
          createCategoryClass(
            data.cabinCategoryClassChart[bar],
            bar,
            data.cabinCategoryClassChart.y
          )
        )
      setPlotdata(barData)
    }
  }, [selectedShip, selectedSailDate, selectedBookingWeek, data])

  if (
    !selectedShip.id ||
    !selectedSailDate.id ||
    selectedBookingWeek === null
  ) {
    return <Blurry src={categoryClassBlurry} />
  }
  if (networkStatus !== 2 && networkStatus !== 7) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <>
      <Plot
        data={plotData}
        layout={categoryClassLayout}
        config={{ displayModeBar: false }}
      />
    </>
  )
}

export default CategoryClass
