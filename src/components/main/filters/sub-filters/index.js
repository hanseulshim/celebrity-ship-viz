import React, { useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

// Project Components
import DropdownMenu from './DropdownMenu'

// GQL
import { GET_SUB_FILTERS } from 'graphql/queries'
import Loader from 'components/common/Loader'
import Notification from 'components/common/Notification'

const Container = styled.div`
  display: flex;
  margin-bottom: 1em;
  justify-content: flex-end;

  > button {
    margin-left: 1em;
  }
`
const SubFilters = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const { loading, error, data } = useQuery(GET_SUB_FILTERS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      Object.keys(data.filter)
        .filter(v => v !== '__typename')
        .forEach(subFilter => {
          const arr = []
          data.filter[subFilter].map(v => arr.push(v.id))
          dispatch({
            type: 'setSelectedSubFilter',
            title: subFilter,
            value: arr
          })
        })
    }
  })

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />

  return (
    <Container>
      {Object.keys(data.filter)
        .filter(v => v !== '__typename')
        .map((subFilter, i) => {
          const options = data.filter[subFilter]
          return (
            <DropdownMenu
              options={options}
              title={subFilter}
              key={subFilter + i}
              displayKey={'value'}
            />
          )
        })}
    </Container>
  )
}

export default SubFilters
