import styled from 'styled-components'
import { Select, Menu, Checkbox, Dropdown } from 'antd'

export const StyledSelect = styled(Select)`
  .ant-select,
  .ant-select-enabled {
    border: 1px solid ${props => props.theme.babyBlue};
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

  .ant-select-disabled,
  .ant-select-selection {
    background-color: ${props => props.theme.black50} !important;
  }
`
export const StyledDropdown = styled(Dropdown)`
  > ul {
    background-color: ${props => props.theme.black50};
  }
`

export const StyledMenu = styled(Menu)`
  max-height: 300px;
  overflow: scroll;
  background-color: ${props => props.theme.black50} !important;
  .ant-dropdown-menu {
    background-color: ${props => props.theme.black50} !important;
  }
`

export const StyledCheckbox = styled(Checkbox)``
