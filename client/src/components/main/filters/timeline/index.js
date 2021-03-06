import { useLazyQuery, useQuery } from '@apollo/client'
import { Icon, Select } from 'antd'
// Project Imports
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import { StyledSelect } from 'components/common/StyledComponents'
import { store } from 'context/store'
// GQL
import {
	GET_SNAPSHOT_INTERVAL_LIST,
	GET_VISUAL_DECK_LIST
} from 'graphql/queries'
import { getFilterVariables } from 'helper'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

const { Option } = Select

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 3em 0em;
`

const ChangeInterval = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledIcon = styled(Icon)`
	font-size: 2em;

	> svg {
		color: ${(props) => props.theme.babyBlue};
		cursor: pointer;
	}
`

const IntervalMeter = styled.div`
	display: flex;
	position: relative;
	width: 90%;
	height: 10px;
	border-radius: 3px;
	background-color: ${(props) => props.theme.dusk};
`

const IntervalPosition = styled.div`
	position: absolute;
	left: 0;
	height: 100%;
	border-radius: 3px;
	width: ${(props) => props.width};
	background-color: ${(props) => props.theme.babyBlue};
`

const Timeline = () => {
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
		filterCount,
		shipData
	} = state

	const { loading, error, data } = useQuery(GET_SNAPSHOT_INTERVAL_LIST, {
		fetchPolicy: 'network-only'
	})

	const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
		onCompleted: (data) => {
			dispatch({ type: 'setShipData', value: data.deckVisualList })
		},
		fetchPolicy: 'network-only'
	})

	const handleSelect = (value) => {
		dispatch({ type: 'setSelectedBookingWeek', value })

		applyFilters({
			variables: getFilterVariables(
				selectedShip.id,
				selectedSailDate.sailingDate,
				value,
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

	useEffect(() => {
		const onCompleted = (data) => {
			if (data.snapshotIntervalList.length) {
				dispatch({
					type: 'setSelectedBookingWeek',
					value:
						data.snapshotIntervalList[data.snapshotIntervalList.length - 1]
							.interval
				})
			}
		}
		const onError = (error) => {
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

	const handleStep = (dir) => {
		const { snapshotIntervalList } = data

		const getCurrent = (snapshot) => snapshot.interval === selectedBookingWeek
		const index = snapshotIntervalList.findIndex(getCurrent)

		if (dir === 'prev' && index !== 0) {
			const interval = snapshotIntervalList[index - 1].interval
			dispatch({
				type: 'setSelectedBookingWeek',
				value: interval
			})

			applyFilters({
				variables: getFilterVariables(
					selectedShip.id,
					selectedSailDate.sailingDate,
					interval,
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
		if (dir === 'next' && index !== snapshotIntervalList.length - 1) {
			const interval = snapshotIntervalList[index + 1].interval
			dispatch({
				type: 'setSelectedBookingWeek',
				value: interval
			})
			applyFilters({
				variables: getFilterVariables(
					selectedShip.id,
					selectedSailDate.sailingDate,
					interval,
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
						style={{ width: 250, marginBottom: '1em' }}
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
