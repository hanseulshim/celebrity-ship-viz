import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import { GET_DECK_CHART } from 'graphql/queries'
import { deckLayout } from './config'
import { createDecks } from './helper'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import Plot from 'react-plotly.js'
import decksBlurry from 'assets/decksBlurry.png'

const Blurry = styled.img`
	width: 400px;
`

const Decks = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { selectedShip, selectedSailDate, selectedBookingWeek } = state

	const { networkStatus, error, data } = useQuery(GET_DECK_CHART, {
		variables: {
			shipId: selectedShip.id,
			sailingDate: selectedSailDate.sailingDate,
			interval: selectedBookingWeek
		},
		skip:
			!selectedShip.id ||
			!selectedSailDate.sailingDate ||
			selectedBookingWeek === null,
		fetchPolicy: 'network-only'
	})

	// local state for plot data
	const [plotData, setPlotdata] = useState([])

	useEffect(() => {
		if (data) {
			const bars = Object.keys(data.deckChart)
			const barData = bars
				.filter((v) => v !== '__typename' && v !== 'y')
				.map((bar) => createDecks(data.deckChart[bar], bar, data.deckChart.y))
			setPlotdata(barData)
		}
	}, [selectedShip, selectedSailDate, selectedBookingWeek, data, networkStatus])

	if (
		!selectedShip.id ||
		!selectedSailDate.sailingDate ||
		selectedBookingWeek === null
	) {
		return <Blurry src={decksBlurry} />
	}
	if (networkStatus !== 2 && networkStatus !== 7) return <Loader />
	if (error) return <Notification type="error" message={error.message} />
	return (
		<>
			<Plot
				data={plotData}
				layout={deckLayout}
				config={{ displayModeBar: false }}
			/>
		</>
	)
}

export default Decks
