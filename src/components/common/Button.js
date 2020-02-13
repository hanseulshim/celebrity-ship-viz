import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${props =>
    props.primary ? props.theme.lochmara : props.theme.silverTree};
  padding: 0.5em 1em;
  color: ${props => (props.primary ? props.theme.white : props.theme.black)};
  font-weight: 500;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  min-width: 100px;
  border: none;
`

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
