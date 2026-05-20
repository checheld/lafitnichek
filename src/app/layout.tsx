import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { ThemeProvider } from '@mui/material'
import Header from '@/components/Header'
import SnackbarWrapper from '@/components/SnackbarWrapper'
import theme from '@/styles/theme'
import '@/styles/global.sass'

const LogoSans = localFont({
  src: '../common/fonts/P22 Kilkenny Initial Cap.otf',
  variable: '--font-kilkenny'
})

const geistMono = localFont({
  src: '../common/fonts/Baron Neue.otf',
  variable: '--font-baron'
})

export const metadata: Metadata = {
  title: 'Lafitnichek',
  description: 'Book club for the elite'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${LogoSans.variable} ${geistMono.variable}`}>
        <Script
          src='https://unpkg.com/react-scan/dist/auto.global.js'
          strategy='beforeInteractive'
        />
        <ThemeProvider theme={theme}>
          <SnackbarWrapper>
            <Header />
            {children}
          </SnackbarWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
