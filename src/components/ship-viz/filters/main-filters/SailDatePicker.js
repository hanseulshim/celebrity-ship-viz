import React from 'react'
import styled from 'styled-components'

// Ant design
import { DatePicker } from 'antd'

// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.span`
  margin-right: 1em;
`

const SailDatePicker = () => {
  function onChange (date, dateString) {
    console.log(date, dateString)
  }

  return (
    <Container>
      <Label>Sail Date</Label>
      <DatePicker onChange={onChange} />
    </Container>
  )
}

export default SailDatePicker
