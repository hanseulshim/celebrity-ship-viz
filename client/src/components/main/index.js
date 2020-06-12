import React, { useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useQuery, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'

import { GET_FIRST_SAIL_DATE, GET_VISUAL_DECK_LIST } from 'graphql/queries'

// Project Imports
import Header from './Header'
import Filters from './filters'
import SubFilters from './filters/sub-filters'
import ShipViz from './ship-viz'
import Timeline from './filters/timeline'
import Legend from './legend'
import DeckView from './legend/DeckView'
import Charts from './charts'

import { getFilterVariables } from 'helper'

const Container = styled.div`
	display: flex;
	flex-direction: column;
`
const Row = styled.div`
	display: flex;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex: 4;
`

const VizContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-right: 2em;
`

const Main = () => {
	const globalState = useContext(store)
	const { dispatch } = globalState

	const { data } = useQuery(GET_FIRST_SAIL_DATE)
	const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
		onCompleted: (data) => {
			dispatch({ type: 'setShipData', value: data.deckVisualList })
		},
		fetchPolicy: 'network-only'
	})

	useEffect(() => {
		if (data) {
			dispatch({ type: 'setSelectedShip', value: data.firstSailDate.ship })
			dispatch({
				type: 'setSelectedSailDate',
				value: data.firstSailDate.sailingDate
			})
			applyFilters({
				variables: getFilterVariables(
					data.firstSailDate.ship.id,
					data.firstSailDate.sailingDate.id,
					data.firstSailDate.interval
				)
			})
		}
	}, [data, dispatch, applyFilters])

	return (
		<Container>
			<Header />
			<Filters />
			<Row>
				<Charts />
				<VizContainer>
					<SubFilters />
					<Row>
						<Column>
							<Timeline />
							<ShipViz />
						</Column>
						<Legend />
					</Row>
					<Row style={{ padding: '2em 0em' }}>
						<DeckView />
					</Row>
				</VizContainer>
			</Row>
		</Container>
	)
}

export default Main
