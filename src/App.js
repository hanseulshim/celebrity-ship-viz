import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/colors'
import GlobalStyle from 'styles/GlobalStyle'
import 'antd/dist/antd.css'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faFilter } from '@fortawesome/free-solid-svg-icons'

// Context
import { StateProvider } from 'context/store'

import Main from 'components/main'

library.add(faDownload, faFilter)

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
