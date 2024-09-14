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
    third: {
      main: getCSSVariable('--accent-color-light'),
    },
    text: {
      primary: getCSSVariable('--text-color-light'),
      secondary: getCSSVariable('--secondary-color-light'),
      third: getCSSVariable('--text-color-dark'),
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
    third: {
      main: getCSSVariable('--accent-color-dark'),
    },
    text: {
      primary: getCSSVariable('--text-color-dark'),
      secondary: getCSSVariable('--secondary-color-dark'),
    },
  },
  typography: {
    fontFamily: getCSSVariable('--font-family'),
  },
})

export { lightTheme, darkTheme }
