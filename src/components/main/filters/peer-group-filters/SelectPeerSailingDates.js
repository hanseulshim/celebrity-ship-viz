import React, { useContext } from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'
import { store } from 'context/store'

const { RangePicker } = DatePicker

const StyledRangePicker = styled(RangePicker)`
  .ant-input {
    background-color: ${props => props.theme.black50};
    color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.biscay};
  }
  .ant-calendar-range-picker-separator {
    color: ${props => props.theme.white};
  }

  .ant-calendar-picker-icon {
    color: ${props => props.theme.white};
  }

  .ant-calendar-picker-clear {
    color: ${props => props.theme.white};
  }
`

const SelectPeerSailingDates = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { selectedPeerSailingDates } = state

  const onChange = date => {
    dispatch({ type: 'setSelectedPeerSailingDates', value: date })
  }

  return (
    <StyledRangePicker
      format={'YYYY/MM/DD'}
      onChange={onChange}
      value={selectedPeerSailingDates}
    />
  )
}

export default SelectPeerSailingDates
