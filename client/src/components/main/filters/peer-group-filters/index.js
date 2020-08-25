import React from 'react'
import styled from 'styled-components'
import PeerSubFilters from './PeerSubFilters'
import SelectPeerProduct from './SelectPeerProduct'
// Project Imports
import SelectPeerShip from './SelectPeerShip'

const Container = styled.div`
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.jungleMist};
	padding: 1em 0em 0em 2em;
	> div,
	.ant-calendar-picker {
		margin-right: 2em;
	}
`

const Title = styled.div`
	color: ${(props) => props.theme.jungleMist};
	font-size: 1.5em;
`

const PeerGroupFilters = () => {
	return (
		<Container>
			<Title>Peer Group</Title>
			<SelectPeerShip />
			<SelectPeerProduct />
			<PeerSubFilters />
		</Container>
	)
}

export default PeerGroupFilters
