import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../context'

const GlobalStyle = createGlobalStyle`
  body {
    &.light-theme {
      --primary-color: var(--primary-color-light);
      --secondary-color: var(--secondary-color-light);
      --accent-color: var(--accent-color-light);
      --background-color: var(--background-color-light);
      --text-color: var(--text-color-light);
    }
    &.dark-theme {
      --primary-color: var(--primary-color-dark);
      --secondary-color: var(--secondary-color-dark);
      --accent-color: var(--accent-color-dark);
      --background-color: var(--background-color-dark);
      --text-color: var(--text-color-dark);
    }
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
