import logo from 'assets/logo.png'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	background-color: ${(props) => props.theme.black50};
	padding: 1em;
	color: ${(props) => props.theme.white};
	padding: 1em 0em;
`

const Logo = styled.img`
	width: 150px;
`

const Header = () => {
	return (
		<Container>
			<Logo src={logo} />
		</Container>
	)
}

export default Header
