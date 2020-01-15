import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

const { Option, OptGroup } = Select

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledSelect = styled(Select)`
  .ant-select {
    border: 1px ${props => props.theme.biscay};
  }
  .ant-select-selection {
    background-color: ${props => props.theme.black50};
    border: 1px ${props => props.theme.biscay};
  }

  .ant-select-arrow {
    color: ${props => props.theme.white};
  }

  .ant-select-selection-selected-value {
    color: ${props => props.theme.white};
  }
`

const Label = styled.span`
  margin-right: 1em;
`

const FilterSelectGroup = ({
  label,
  options,
  value,
  onChange,
  displayKey,
  grouping,
  width,
  ...props
}) => {
  const groups = [...new Set(options.map(item => item[grouping]))]

  return (
    <Container>
      <Label>{label}</Label>
      <StyledSelect
        style={{ width: width || 150 }}
        value={value}
        onChange={value => onChange(value)}
        mode={props.mode}
      >
        {/* {options &&
          options.map((option, i) => {
            return (
              <Option value={option.id} key={'option' + i}>
                option[displayKey]
              </Option>
            )
          })} */}
        {groups.forEach(grouping => {
          return (
            <OptGroup label={grouping}>
              <Option>Hey</Option>
            </OptGroup>
          )
        })}
      </StyledSelect>
    </Container>
  )
}

export default FilterSelectGroup
