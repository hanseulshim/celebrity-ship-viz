import { createGlobalStyle } from 'styled-components'
import bg from 'assets/starry_night_sky.png'

export default createGlobalStyle`
  html,
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url(${bg}) no-repeat center center fixed;
     -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    @media (max-width : 1336px){
      font-size: 10px;
      line-height: 17px;
    }
  }
  a {
    text-decoration: none;
    color: initial;
  }

  .ant-select-search--inline .ant-select-search__field {
    color: white;
  }

  button {
    border:none;
  }
`
