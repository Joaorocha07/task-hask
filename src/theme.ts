import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&.Mui-disabled': {
            opacity: 1,
            '-webkit-text-fill-color': 'black'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-disabled': {
            color: 'black'
          }
        }
      }
    }
  }
})

export default theme
    