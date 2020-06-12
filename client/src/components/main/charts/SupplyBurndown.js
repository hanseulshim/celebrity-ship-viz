import { useQuery } from '@apollo/client'
import supplyBurndownBlurry from 'assets/supplyBurndownBlurry.png'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import { store } from 'context/store'
import { GET_SUPPLY_BURNDOWN_CHART } from 'graphql/queries'
import { getFilterVariables } from 'helper'
import React, { useContext, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'
import { supplyBurndownLayout } from './config'
import { createSupplyBurndown } from './helper'

const Blurry = styled.img`
	width: 400px;
`

const SupplyBurndown = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const {
		selectedShip,
		selectedProduct,
		selectedItinerary,
		selectedSailDate,
		selectedBookingWeek,
		peerGroupFilters,
		selectedPeerShip,
		selectedPeerProduct,
		filter,
		peerFilter,
		filterCount
	} = state

	const { networkStatus, error, data } = useQuery(GET_SUPPLY_BURNDOWN_CHART, {
		variables: getFilterVariables(
			selectedShip.id,
			selectedSailDate.sailingDate,
			selectedBookingWeek,
			selectedProduct.id,
			selectedItinerary.id,
			peerGroupFilters,
			selectedPeerShip,
			selectedPeerProduct.id,
			filter,
			peerFilter,
			filterCount
		),
		skip: !selectedShip.id || !selectedSailDate.sailingDate,
		fetchPolicy: 'network-only'
	})

	// local state for plot data
	const [plotData, setPlotdata] = useState([])

	useEffect(() => {
		if (data) {
			const lines = Object.keys(data.supplyBurndownChart)
			const lineData = lines
				.filter((v) => v !== '__typename')
				.map((line) =>
					createSupplyBurndown(
						data.supplyBurndownChart[line],
						line,
						selectedShip.shipName
					)
				)
			setPlotdata(lineData)
		}
	}, [selectedShip, selectedSailDate, data])

	if (!selectedShip.id || !selectedSailDate.sailingDate) {
		return <Blurry src={supplyBurndownBlurry} />
	}
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
