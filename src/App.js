import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/colors'
import GlobalStyle from 'styles/GlobalStyle'
import 'antd/dist/antd.css'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faFilter, faEdit } from '@fortawesome/free-solid-svg-icons'

// Context
import { StateProvider } from 'context/store'

import Main from 'components/main'
import Login from 'components/Login'

library.add(faDownload, faFilter, faEdit)

const App = () => {
  const [password, setPassword] = useState('')
  const validated = password === process.env.REACT_APP_PASSWORD
  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <GlobalStyle />
        {validated ? <Main /> : <Login setPassword={setPassword} />}
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
