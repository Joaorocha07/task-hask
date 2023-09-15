import React, { type ReactNode } from 'react'

interface IRootLayout {
  children: ReactNode
}

export default function RootLayout({ children }: IRootLayout): JSX.Element {
  return (
    <div suppressHydrationWarning={true}>
      {children}
    </div>
  )
}
