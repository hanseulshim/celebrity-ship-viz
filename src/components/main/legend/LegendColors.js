import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

const Title = styled.div`
  font-size: 1em;
  padding-bottom: 3px;
  color: ${props => props.theme.jungleMist};
  text-decoration: underline;
`
const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const ColorItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75em;
  color: ${props => props.theme.jungleMist};
  min-width: 100px;
  max-height: 50px;

  > span {
    max-width: 100px;
  }
`

const Color = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 1px;
  margin-right: 1em;
  background-color: ${props => props.theme[props.fill]};
`

const legendItems = [
  {
    label: 'Booked Staterooms',
    color: 'silverTree'
  },
  {
    label: 'Under Booked Occupancy',
    color: 'keyLimePie'
  },
  {
    label: 'Available Staterooms',
    color: 'mandy'
  }
]

const LegendColors = () => {
  return (
    <Container>
      <Title>Visualization Legend</Title>
      <ColorRow>
        {legendItems.map((item, i) => {
          return (
            <ColorItem key={'color' + i}>
              <Color fill={item.color} />
              <span>{item.label}</span>
            </ColorItem>
          )
        })}
      </ColorRow>
    </Container>
  )
}

export default LegendColors
