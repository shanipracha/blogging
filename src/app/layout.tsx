import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlogHub - Your Ultimate Blogging & Events Platform',
  description: 'Discover amazing blogs and join exciting events. Your one-stop destination for content and community.',
  keywords: ['blog', 'events', 'community', 'content', 'blogging'],
  authors: [{ name: 'BlogHub Team' }],
  openGraph: {
    title: 'BlogHub - Your Ultimate Blogging & Events Platform',
    description: 'Discover amazing blogs and join exciting events. Your one-stop destination for content and community.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogHub - Your Ultimate Blogging & Events Platform',
    description: 'Discover amazing blogs and join exciting events. Your one-stop destination for content and community.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}