import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './styles/colors'
import GlobalStyle from './styles/GlobalStyle'
import 'antd/dist/antd.css'
// import Playground from './Playground'

import ShipViz from './components/ship-viz'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ShipViz />
    </ThemeProvider>
  )
}

export default App
