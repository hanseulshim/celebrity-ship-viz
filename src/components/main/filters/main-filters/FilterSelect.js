import React from 'components/main/filters/main-filters/node_modules/react'
import styled from 'components/main/filters/main-filters/node_modules/styled-components'
import { Select } from 'components/main/filters/main-filters/node_modules/antd'

const { Option } = Select

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledSelect = styled(Select)`
  .ant-select {
    border: 1px ${props => props.theme.darkSlateBlue};
  }
  .ant-select-selection {
    background-color: ${props => props.theme.black50};
    border: 1px ${props => props.theme.darkSlateBlue};
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
