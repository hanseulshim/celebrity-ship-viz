import styled from 'styled-components'
import { Select, Menu, Checkbox, Dropdown, Modal } from 'antd'

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
  /* > ul {
    background-color: ${props => props.theme.black50};
  } */
`

export const StyledMenu = styled(Menu)`
  max-height: 300px;
  overflow: scroll;
  /* background-color: ${props => props.theme.black50} !important;
  .ant-dropdown-menu {
    background-color: ${props => props.theme.black50} !important;
  } */
`

export const StyledCheckbox = styled(Checkbox)``

export const StyledModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-footer {
    background-color: ${props => props.theme.cornflowerBlue};
    border: 1px solid ${props => props.theme.dusk};
  }

  .ant-modal-header {
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title {
    color: ${props => props.theme.jungleMist};
    font-size: 1.5em;
  }

  .ant-modal-close {
    color: ${props => props.theme.jungleMist};
  }

  .ant-modal-body {
    > button {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 5px;
    }
  }

  .ant-modal-footer {
    border-top: none;

    > div {
      display: flex;
      justify-content: space-between;
    }
    .ant-btn,
    .ant-btn-primary {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.5em 1em;
      font-weight: 700;
      font-size: 1rem;
      border-radius: 2px;
      cursor: pointer;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
      min-width: 100px;
      border: none;
    }
  }
`
