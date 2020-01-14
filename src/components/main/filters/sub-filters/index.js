import React from 'react'
import styled from 'styled-components'

// Project Components
import DropdownMenu from 'components/common/DropdownMenu'

const Container = styled.div`
  display: flex;
`

const SubFilters = () => {
  return (
    <Container>
      <DropdownMenu options={[1, 2, 3]} title="Casino" />
    </Container>
  )
}

export default SubFilters
