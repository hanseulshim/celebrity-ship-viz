import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Loader = () => {
  return (
    <Container>
      <Spin />
    </Container>
  )
}

export default Loader
