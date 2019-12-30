import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.galaxyBlue};
  padding: 1em;
  color: ${props => props.theme.ghostWhite};
  padding: 1em 0em;
`

const Header = () => {
  return <Container>Header</Container>
}

export default Header
