import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0px 5px;
`

const Icon = ({ icon }) => {
  return <StyledIcon icon={icon}></StyledIcon>
}

export default Icon
