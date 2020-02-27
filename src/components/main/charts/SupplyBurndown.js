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

  const { networkStatus, error, data } = useQuery(GET_SUPPLY_BURNDOWN_CHART, {
    variables: {
      shipId: selectedShip.id,
      sailingDateId: selectedSailDate.id
    },
    skip: !selectedShip.id || !selectedSailDate.id,
    fetchPolicy: 'network-only'
  })

  // local state for plot data
  const [plotData, setPlotdata] = useState([])

  useEffect(() => {
    if (data) {
      const lines = Object.keys(data.supplyBurndownChart)
      const lineData = lines
        .filter(v => v !== '__typename')
        .map(line =>
          createSupplyBurndown(
            data.supplyBurndownChart[line],
            line,
            selectedShip.shipName
          )
        )
      setPlotdata(lineData)
    }
  }, [selectedShip, selectedSailDate, data])

  if (!selectedShip.id || !selectedSailDate.id) return null
  if (networkStatus !== 2 && networkStatus !== 7) {
    return <Loader />
  }
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
