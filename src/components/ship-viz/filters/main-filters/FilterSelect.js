import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

const { Option } = Select

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledSelect = styled(Select)`
  .ant-select-selection {
    background-color: ${props => props.theme.galaxyBlue};
  }

  .ant-select-arrow {
    color: ${props => props.theme.ghostWhite};
  }

  .ant-select-selection-selected-value {
    color: ${props => props.theme.ghostWhite};
  }
`

const Label = styled.span`
  color: ${props => props.theme.ghostWhite};
  margin-right: 1em;
`

const FilterSelect = ({ label, options, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledSelect
        labelInValue
        style={{ width: 150 }}
        onChange={value => props.onChange(value)}
      >
        {options.map((option, i) => {
          return (
            <Option value={option.id} key={'option' + i}>
              {option.name}
            </Option>
          )
        })}
      </StyledSelect>
    </Container>
  )
}

export default FilterSelect
