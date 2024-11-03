// import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NNShop',
}

export default function RootLayout({ children }) {
  let id = 'ididididididid'
  return (
    <div>{children}</div>
  )
}
