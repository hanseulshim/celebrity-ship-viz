import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import { GET_SUB_FILTERS } from 'graphql/queries'
import styled from 'styled-components'
import Button from 'components/common/Button'
import Icon from 'components/common/Icon'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'
import PeerDropdownMenu from './PeerDropdownMenu'
import { StyledModal } from 'components/common/StyledComponents'

const OpenModal = styled(Button)`
  background-color: ${props => props.theme.babyBlue};
  color: ${props => props.theme.black};
`

const PeerSubFilters = () => {
  const globalState = useContext(store)
  const { state, dispatch } = globalState
  const { peerFilter, filterCount } = state
  const { loading, error, data } = useQuery(GET_SUB_FILTERS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      Object.keys(data.filter)
        .filter(v => v !== '__typename')
        .forEach(subFilter => {
          const arr = data.filter[subFilter].map(v => ({
            id: v.id,
            value: v.value
          }))
          dispatch({
            type: 'setSelectedPeerSubFilter',
            title: subFilter,
            value: arr
          })
          dispatch({
            type: 'setSelectedSubFilterCount',
            title: subFilter,
            value: arr.length
          })
        })
    }
  })

  const [visible, setVisible] = useState(false)

  const openModal = () => {
    setVisible(true)
  }

  const handleApply = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />
  return (
    <>
      <OpenModal onClick={() => openModal()}>
        {
          Object.keys(peerFilter).filter(key => {
            return peerFilter[key].length !== filterCount[key]
          }).length
        }{' '}
        Filters <Icon icon="edit" />
      </OpenModal>
      <StyledModal
        title="Peer Group Filters"
        visible={visible}
        onOk={handleApply}
        onCancel={handleCancel}
        okText="Apply"
      >
        {Object.keys(data.filter)
          .filter(v => v !== '__typename')
          .map((subFilter, i) => {
            const options = data.filter[subFilter]
            return (
              <PeerDropdownMenu
                options={options}
                title={subFilter}
                key={subFilter + i}
                displayKey={'value'}
              />
            )
          })}
      </StyledModal>
    </>
  )
}

export default PeerSubFilters
