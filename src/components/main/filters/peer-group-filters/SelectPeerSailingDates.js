import React from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const StyledRangePicker = styled(RangePicker)``

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
