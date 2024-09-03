import { createTheme } from '@mui/material/styles'

const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim()
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: getCSSVariable('--primary-color-light'),
    },
    secondary: {
      main: getCSSVariable('--secondary-color-light'),
    },
    background: {
      default: getCSSVariable('--background-color-light'),
    },
    text: {
      primary: getCSSVariable('--text-color-light'),
    },
  },
  typography: {
    fontFamily: getCSSVariable('--font-family'),
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: getCSSVariable('--primary-color-dark'),
    },
    secondary: {
      main: getCSSVariable('--secondary-color-dark'),
    },
    background: {
      default: getCSSVariable('--background-color-dark'),
    },
    text: {
      primary: getCSSVariable('--text-color-dark'),
    },
  },
  typography: {
    fontFamily: getCSSVariable('--font-family'),
  },
})

export { lightTheme, darkTheme }
