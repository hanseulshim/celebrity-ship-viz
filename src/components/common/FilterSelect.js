import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import moment from 'moment'
import { StyledSelect } from './StyledComponents'

const { Option } = Select

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.span`
  margin-right: 1em;
`

const FilterSelect = ({
  label,
  options,
  value,
  onChange,
  displayKey,
  width,
  ...props
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledSelect
        style={{ width: width || 150 }}
        value={value}
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={value => onChange(value)}
        mode={props.mode}
      >
        {options &&
          options.map((option, i) => {
            return displayKey === 'sailingDate' ? (
              <Option value={option.id} key={'option' + i}>
                {moment(option[displayKey]).format('MM-DD-YYYY')}
              </Option>
            ) : (
              <Option value={option.id} key={'option' + i}>
                {option[displayKey]}
              </Option>
            )
          })}
      </StyledSelect>
    </Container>
  )
}

export default FilterSelect
