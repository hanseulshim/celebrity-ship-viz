import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { Menu, Dropdown, Checkbox } from 'antd'

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.biscay};
  padding: 0.5em 1em;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
`

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.biscay};
  padding: 0.25em 0.25em;
  font-weight: 500;
  font-size: 0.75rem;
  border-radius: 2px;
  cursor: pointer;
  min-width: 50px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
`

const StyledMenu = styled(Menu)`
  max-height: 300px;
  overflow: scroll;
  color: ${props => props.theme.white};
  > div {
    background-color: ${props => props.theme.black};
  }
  .ant-dropdown-menu-item {
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.white};
    font-weight: 500;
  }
  .ant-dropdown-menu-item:hover {
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.white};
  }
`

const StyledCheckbox = styled(Checkbox)`
  > span {
    color: ${props => props.theme.white};
    text-transform: capitalize;
  }
  .ant-checkbox-inner {
    background-color: ${props => props.theme.black};
    border-color: ${props => props.theme.white};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${props => props.theme.aquaForest};
    border-color: ${props => props.theme.aquaForest};
  }
`

const DropdownMenu = ({ options, title, displayKey, ...props }) => {
  const [visible, setVisible] = useState(false)
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { filter } = state
  const [subFilter, setSubFilter] = useState(filter[title])

  const handleCheck = id => {
    const index = subFilter.indexOf(id)
    if (index === -1) {
      setSubFilter([...subFilter, id])
    } else {
      setSubFilter(subFilter.filter(v => v !== id))
    }
  }

  const handleMenuClick = e => {
    if (e.key === 'save') {
      dispatch({ type: 'setSelectedSubFilter', title, value: subFilter })
      setVisible(false)
    }
  }

  const formatTitle = s => {
    const split = s.replace(/([a-z](?=[A-Z]))/g, '$1 ')
    return split.charAt(0).toUpperCase() + split.slice(1)
  }

  const menu = (
    <StyledMenu onClick={handleMenuClick}>
      {options.map((option, i) => (
        <Menu.Item key={'option' + i}>
          <StyledCheckbox
            onChange={e => handleCheck(option.id)}
            checked={subFilter.includes(option.id)}
          >
            {option[displayKey]}
          </StyledCheckbox>
        </Menu.Item>
      ))}
      <Menu.Item key="save">
        <SaveButton>Save</SaveButton>
      </Menu.Item>
    </StyledMenu>
  )

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={setVisible}
      visible={visible}
      overlayStyle={{ backgroundColor: 'rgba(0,0,0,.5)' }}
      overlayClassName={'dropdown'}
    >
      <Button>{formatTitle(title)}</Button>
    </Dropdown>
  )
}

export default DropdownMenu
