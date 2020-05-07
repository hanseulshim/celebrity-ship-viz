import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { useLazyQuery } from '@apollo/client'

import { GET_VISUAL_DECK_LIST } from 'graphql/queries'
import { getFilterVariables } from 'helper'
import {
	StyledMenu,
	StyledCheckbox,
	StyledDropdown
} from 'components/common/StyledComponents'

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.jungleMist};
	background-color: ${(props) => props.theme.biscay};
	padding: 0.5em 1em;
	font-weight: 500;
	font-size: 1rem;
	border-radius: 2px;
	cursor: pointer;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
`

const ApplyButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.white};
	background-color: ${(props) => props.theme.biscay};
	padding: 0.25em 0.25em;
	font-weight: 500;
	font-size: 0.75rem;
	border-radius: 2px;
	cursor: pointer;
	min-width: 50px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
`

const DropdownMenu = ({ options, title, displayKey, ...props }) => {
	const [visible, setVisible] = useState(false)
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
		selectedPeerSailingDates,
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

	// keep local state array for save button
	const [subFilter, setSubFilter] = useState(filter[title])

	useEffect(() => {
		setSubFilter(filter[title])
	}, [filter, title])

	const handleCheck = ({ id, value }) => {
		const foundFilter = subFilter.find((v) => v.id === id)
		if (foundFilter) {
			setSubFilter(subFilter.filter((v) => v.id !== id))
		} else {
			setSubFilter([...subFilter, { id, value }])
		}
	}

	const handleSave = (e) => {
		if (e.key === 'save') {
			dispatch({ type: 'setSelectedSubFilter', title, value: subFilter })
			const filterCopy = { ...filter }
			setVisible(false)
			filterCopy[title] = subFilter
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
					selectedPeerSailingDates[0],
					selectedPeerSailingDates[1],
					filterCopy,
					peerFilter,
					filterCount
				)
			})
		}
	}

	const handleVisibleChange = (v) => {
		setVisible(v)
		if (!v) {
			setSubFilter(filter[title])
		}
	}

	const formatTitle = (s) => {
		const split = s.replace(/([a-z](?=[A-Z]))/g, '$1 ')
		return split.charAt(0).toUpperCase() + split.slice(1)
	}

	const menu = (
		<StyledMenu onClick={handleSave}>
			{options.map((option, i) => (
				<StyledMenu.Item key={'option' + i}>
					<StyledCheckbox
						onChange={() => handleCheck(option)}
						checked={!!subFilter.find((f) => f.id === option.id)}
					>
						{option[displayKey]}
					</StyledCheckbox>
				</StyledMenu.Item>
			))}
			<StyledMenu.Item key="save">
				<ApplyButton>Apply</ApplyButton>
			</StyledMenu.Item>
		</StyledMenu>
	)

	return (
		<StyledDropdown
			overlay={menu}
			onVisibleChange={handleVisibleChange}
			visible={visible}
		>
			<Button>{formatTitle(title)}</Button>
		</StyledDropdown>
	)
}

export default DropdownMenu
