import React, { useContext } from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'
import { store } from 'context/store'
import moment from 'moment'

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

  const onChange = (date, dateString) => {
    dispatch({ type: 'setSelectedPeerSailingDates', value: dateString })
  }

  return (
    <StyledRangePicker
      format={'YYYY/MM/DD'}
      onChange={onChange}
      value={
        selectedPeerSailingDates.length
          ? [
              moment(selectedPeerSailingDates[0]),
              moment(selectedPeerSailingDates[1])
            ]
          : []
      }
    />
  )
}

export default SelectPeerSailingDates
