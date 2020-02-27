import styled from 'styled-components'
import { Modal } from 'antd'

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
