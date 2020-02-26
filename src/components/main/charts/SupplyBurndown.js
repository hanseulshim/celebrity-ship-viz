import React, { useState, useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import { GET_SUPPLY_BURNDOWN_CHART } from 'graphql/queries'
import { supplyBurndownLayout } from './config'
import { createSupplyBurndown } from './helper'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import Plot from 'react-plotly.js'

const SupplyBurndown = () => {
  const globalState = useContext(store)
  const { state } = globalState
  const { selectedShip, selectedSailDate } = state

  const { loading, error, data } = useQuery(GET_SUPPLY_BURNDOWN_CHART, {
    variables: {
      shipId: selectedShip.id || 0,
      sailingDateId: selectedSailDate.id || 0
    },
    fetchPolicy: 'network-only'
  })

  // local state for plot data
  const [plotData, setPlotdata] = useState([])

  useEffect(() => {
    if (data) {
      setPlotdata(
        createSupplyBurndown(data.supplyBurndownChart, selectedShip.shipName)
      )
    }
  }, [selectedShip, selectedSailDate, data])

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <>
      <Plot
        data={plotData}
        layout={supplyBurndownLayout}
        config={{ displayModeBar: false }}
      />
    </>
  )
}

export default SupplyBurndown
