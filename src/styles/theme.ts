'use client'

import { createTheme } from '@mui/material/styles'

const colorSet = {
  white: '#e8e9e0',
  green: '#6d7e5f',
  whiteGreen: '#c4c8ac',
  lightGreen: '#92a079',
  darkGreen: '#45553d',
  black: '#0d120e'
}

const mainColor = colorSet.green
const secondColor = colorSet.darkGreen

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: {
      main: secondColor
    }
  },
  typography: {
    fontFamily: 'var(--font-baron)',
    fontSize: 14
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colorSet.whiteGreen,
          color: colorSet.darkGreen
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '12px',
          fontWeight: 700,
          color: colorSet.darkGreen,
          textTransform: 'capitalize'
        },
        body: {
          fontSize: '12px',
          fontWeight: 400,
          color: colorSet.black
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiModal: {
      styleOverrides: {
        root: {
          overflowY: 'scroll'
        }
      }
    },
    // MuiCheckbox: {
    //   styleOverrides: {
    //     root: {
    //       '&.Mui-checked': {
    //         color: colorSet.primaryYellow
    //       }
    //     }
    //   }
    // },
    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     label: {
    //       fontSize: '16px',
    //       fontWeight: 500,
    //       color: 'rgb(69, 80, 101)'
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '40px',
          padding: '10px 30px',
          borderRadius: '6px',
          fontWeight: 300,
          fontSize: '14px',
          textTransform: 'uppercase',
          color: colorSet.white,
          backgroundColor: colorSet.lightGreen,
          transition: '0.4s all',
          ':hover': {
            backgroundColor: colorSet.green
          },
          '&.MuiButton-outlined': {
            color: colorSet.lightGreen,
            backgroundColor: colorSet.white,
            border: '2px solid #92a079',
            transition: '0.4s all',
            ':hover': {
              backgroundColor: '#92a0793b'
            }
          }
        }
      }
    }
  }
})

export default theme
