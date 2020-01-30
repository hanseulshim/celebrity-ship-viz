import React from 'react'
import styled from 'styled-components'

// Project Imports
import SelectDeck from './SelectDeck'
import LegendColors from './LegendColors'

const LegendContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Legend = () => {
  return (
    <LegendContainer>
      <LegendColors />
      <SelectDeck />
    </LegendContainer>
  )
}

export default Legend
