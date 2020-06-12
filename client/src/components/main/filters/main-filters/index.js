import { useLazyQuery } from '@apollo/client'
import Button from 'components/common/Button'
import { store } from 'context/store'
// Graphql
import { GET_VISUAL_DECK_LIST } from 'graphql/queries'
import { getFilterVariables } from 'helper'
import React, { useContext } from 'react'
import styled from 'styled-components'
import CsvDownload from './CsvDownload'
import PeerGroupToggle from './PeerGroupToggle'
import SelectItinerary from './SelectItinerary'
// Project Imports
import SelectProduct from './SelectProduct'
import SelectSailDate from './SelectSailDate'
import SelectShip from './SelectShip'

const Container = styled.div`
	display: flex;
	align-items: center;
	background-color: rgb(0, 0, 0, 0);
	color: ${(props) => props.theme.jungleMist};
	padding: 1em 0em;
	> div {
		margin-right: 2em;
	}
`

const Apply = styled(Button)`
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	background-color: ${(props) => props.theme.lochmara};
	color: ${(props) => props.theme.white};
`

const MainFilters = () => {
	const globalState = useContext(store)
	const { state, dispatch } = globalState
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
	const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
		onCompleted: (data) => {
			dispatch({ type: 'setShipData', value: data.deckVisualList })
		},
		fetchPolicy: 'network-only'
	})

	const enableApply = () =>
		selectedShip && selectedProduct && selectedItinerary && selectedSailDate

	return (
		<Container>
			<PeerGroupToggle />
			<SelectShip />
			<SelectProduct />
			<SelectItinerary />
			<SelectSailDate />
			<Apply
				id="apply-ship-filter"
				primary
				disabled={!enableApply()}
				onClick={() =>
					applyFilters({
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
						)
					})
				}
			>
				Apply
			</Apply>
			<CsvDownload />
		</Container>
	)
}

export default MainFilters
