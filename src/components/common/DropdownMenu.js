import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, Checkbox } from 'antd'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.biscay};
  padding:.5em 1em
  font-weight: 500;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
`

const StyledMenu = styled(Menu)`
  .ant-dropdown-menu {
    background-color: ${props => props.theme.black50};
  }
`

const DropdownMenu = ({ options, title, ...props }) => {
  const [visible, setVisible] = useState(false)

  const handleMenuClick = e => {
    if (e.key === 'save') {
      setVisible(false)
    } else {
      console.log(e.key)
    }
  }

  const menu = (
    <StyledMenu onClick={handleMenuClick}>
      {options.map((option, i) => (
        <Menu.Item key={'option' + i}>
          <Checkbox>Checkbox: {option}</Checkbox>
        </Menu.Item>
      ))}
      <Menu.Item key="save">
        <Button>Save</Button>
      </Menu.Item>
    </StyledMenu>
  )

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={setVisible}
      visible={visible}
      overlayStyle={{ backgroundColor: 'rgba(0,0,0,.5)' }}
    >
      <Button>{title}</Button>
    </Dropdown>
  )
}

export default DropdownMenu
