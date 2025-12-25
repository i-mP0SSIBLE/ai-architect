import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Architect Generator - No Code Needed',
    description: 'Generate complete software architecture with AI',
    }

    export default function RootLayout({
      children,
      }: {
        children: React.ReactNode
        }) {
          return (
              <html lang="en">
                    <body className={inter.className}>
                            <Toaster position="top-right" />
                                    {children}
                                          </body>
                                              </html>
                                                )
                                                }