import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/colors'
import GlobalStyle from 'styles/GlobalStyle'
import 'antd/dist/antd.css'

// Context
import { StateProvider } from 'context/store'

import Main from 'components/main'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <GlobalStyle />
        <Main />
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
