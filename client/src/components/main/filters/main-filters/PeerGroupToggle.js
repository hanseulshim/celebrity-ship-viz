// Ant design components
import { Switch } from 'antd'
import { store } from 'context/store.js'
import React, { useContext } from 'react'
import styled from 'styled-components'

// Styled Components

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Label = styled.span`
	margin-right: 1em;
`

const StyledSwitch = styled(Switch)``

const PeerGroupToggle = () => {
	const globalState = useContext(store)
	const { state, dispatch } = globalState
	const { peerGroupFilters } = state

	const onToggleChange = () => {
		dispatch({ type: 'togglePeerGroupFilters' })
	}

	return (
		<Container>
			<Label>Peer Comparison</Label>
			<StyledSwitch
				id="peer-group-toggle"
				checked={peerGroupFilters}
				onChange={onToggleChange}
			/>
		</Container>
	)
}

export default PeerGroupToggle
