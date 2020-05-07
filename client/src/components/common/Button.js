import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5em 1em;
  font-weight: 700;
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
