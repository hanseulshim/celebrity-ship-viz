import React from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const StyledRangePicker = styled(RangePicker)`
  .ant-input {
    background-color: ${props => props.theme.black50};
    color: ${props => props.theme.white};
    border: none;
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
  return (
    <StyledRangePicker
      defaultValue={[
        moment('2015/01/01', 'YYYY/MM/DD'),
        moment('2015/01/01', 'YYYY/MM/DD')
      ]}
      format={'YYYY/MM/DD'}
    />
  )
}

export default SelectPeerSailingDates
