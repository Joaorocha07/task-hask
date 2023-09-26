'use client'
import React, { type ReactNode } from 'react'
import '../styles/globals.css'
import Authprovider from '@/component/Authprovider/Authprovider'
import { ThemeProvider } from '@mui/material'
import theme from '../theme'

interface IRootLayout {
  children: ReactNode
}

export default function RootLayout({ children }: IRootLayout): JSX.Element {
  return (
    <html lang="pt-br">
      <ThemeProvider theme={theme}>
        <Authprovider>
          <body suppressHydrationWarning={true}>
            {children}
          </body>
        </Authprovider>
      </ThemeProvider>
    </html>
  )
}
