import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/colors'
import GlobalStyle from 'styles/GlobalStyle'
import 'antd/dist/antd.css'

import Main from 'components/main'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  )
}

export default App
