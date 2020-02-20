import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { store } from 'context/store'
import { useLazyQuery } from '@apollo/client'
import { Menu, Dropdown, Checkbox } from 'antd'
import { GET_VISUAL_DECK_LIST } from 'graphql/queries'

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
`

const StyledCheckbox = styled(Checkbox)``

const DropdownMenu = ({ options, title, displayKey, ...props }) => {
  const [visible, setVisible] = useState(false)
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { filter, selectedShip, selectedSailDate, selectedInterval } = state

  const [applyFilters] = useLazyQuery(GET_VISUAL_DECK_LIST, {
    onCompleted: data => {
      dispatch({ type: 'setShipData', value: data.deckVisualList })
    }
  })

  // keep local state array for save button
  const [subFilter, setSubFilter] = useState(filter[title])

  useEffect(() => {
    setSubFilter(filter[title])
  }, [filter, title])

  const handleCheck = id => {
    const index = subFilter.indexOf(id)
    if (index === -1) {
      setSubFilter([...subFilter, id])
    } else {
      setSubFilter(subFilter.filter(v => v !== id))
    }
  }

  const handleSave = e => {
    if (e.key === 'save') {
      dispatch({ type: 'setSelectedSubFilter', title, value: subFilter })
      setVisible(false)
      applyFilters({
        variables: {
          shipId: selectedShip.id,
          sailingDateId: selectedSailDate.id,
          interval: selectedInterval
        }
      })
    }
  }

  const handleVisibleChange = v => {
    setVisible(v)
    if (!v) {
      setSubFilter(filter[title])
    }
  }

  const formatTitle = s => {
    const split = s.replace(/([a-z](?=[A-Z]))/g, '$1 ')
    return split.charAt(0).toUpperCase() + split.slice(1)
  }

  const menu = (
    <StyledMenu onClick={handleSave}>
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
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <Button>{formatTitle(title)}</Button>
    </Dropdown>
  )
}

export default DropdownMenu
