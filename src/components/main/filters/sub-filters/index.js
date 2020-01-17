import React from 'react'
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
  const { loading, error, data } = useQuery(GET_SUB_FILTERS, {
    fetchPolicy: 'network-only'
  })

  if (loading) return <Loader />
  if (error) return <Notification type="error" message={error.message} />

  return (
    <Container>
      {Object.keys(data.filter)
        .filter(v => v !== '__typename')
        .map((subFilter, i) => {
          const options = data.filter[subFilter]
          if (options.length) {
            return (
              <DropdownMenu
                options={options}
                title={subFilter}
                key={subFilter + i}
                displayKey={'value'}
              />
            )
          }
        })}
    </Container>
  )
}

export default SubFilters