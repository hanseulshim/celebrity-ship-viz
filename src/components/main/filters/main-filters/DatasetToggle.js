import React from 'components/main/filters/main-filters/node_modules/react'
import styled from 'components/main/filters/main-filters/node_modules/styled-components'

// Ant design components
import { Switch } from 'components/main/filters/main-filters/node_modules/antd'

// Styled Components

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.span`
  margin: 0em 1em;
`

const StyledSwitch = styled(Switch)`
  background-color: #1890ff !important;
`

const DatasetToggle = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`)
  }
  return (
    <Container>
      <Label>Single Sailing</Label>
      <StyledSwitch onChange={onChange} />
      <Label>Peer Comparison</Label>
    </Container>
  )
}

export default DatasetToggle
