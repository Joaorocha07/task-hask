import React, { type ReactNode } from 'react'
import '../styles/globals.css'
import Authprovider from '@/component/Authprovider/Authprovider'

interface IRootLayout {
  children: ReactNode
}

export default function RootLayout({ children }: IRootLayout): JSX.Element {
  return (
    <html lang="pt-br">
      <Authprovider>
        <body suppressHydrationWarning={true}>
          {children}
        </body>
      </Authprovider>
    </html>
  )
}
