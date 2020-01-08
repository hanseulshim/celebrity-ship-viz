import React from 'react'
import styled from 'styled-components'

// Ant design components
import { Switch } from 'antd'

// Styled Components

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.span`
  margin: 0em 1em;
`

const DatasetToggle = () => {
  function onChange (checked) {
    console.log(`switch to ${checked}`)
  }
  return (
    <Container>
      <Label>Single Sailing</Label>
      <Switch defaultChecked onChange={onChange} />
      <Label>Peer Comparison</Label>
    </Container>
  )
}

export default DatasetToggle
