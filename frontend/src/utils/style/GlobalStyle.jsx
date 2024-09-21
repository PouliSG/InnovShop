import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../context/themeContext'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
  }
`

const ThemedGlobalStyle = () => {
  const { theme } = useTheme()

  React.useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme'
  }, [theme])

  return <GlobalStyle />
}

export default ThemedGlobalStyle
