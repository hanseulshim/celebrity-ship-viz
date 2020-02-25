import styled from 'styled-components'
import { Select } from 'antd'

export const StyledSelect = styled(Select)`
  .ant-select {
    border: 1px ${props => props.theme.biscay};
  }
  .ant-select-selection {
    background-color: ${props => props.theme.black50};
    border: 1px ${props => props.theme.biscay};
    font-size: ${props => (props.timeline ? '1.25rem' : '1rem')};
  }

  .ant-select-selection--multiple .ant-select-selection__choice {
    background-color: ${props => props.theme.dusk};
    color: ${props => props.theme.white};
    border: none;
  }

  .ant-select-arrow {
    color: ${props => props.theme.white};
  }

  .ant-select-selection-selected-value {
    color: ${props => props.theme.white};
  }
`