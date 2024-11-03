'use client'
import './tailwind.css'
import './globals.css'
import { useState, useEffect } from 'react'
import ChatBotWindow from '@/components/ChatbotWindow/ChatbotWindow'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

import SlideShow from '@/components/slideShow/slideShow'
import ChatBotButton from '@/components/chatbot/ChatBotButton'
import BackToTopButton from '@/components/backToTop/BackToTop'
import CallPhone from '@/components/CallPhone/CallPhone'
import Map from '@/components/Map/Map'
import ChatMess from '@/components/ChatMess/ChatMess'

import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { Providers } from "./providers";
const inter = Inter({ subsets: ['latin'] })

import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const closeChatBot = () => {
      setIsChatOpen(false);
    };

    useEffect(() => {
      // Chỉ import bootstrap bundle trong môi trường client
      if (typeof window !== 'undefined') {
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
          const carousel = document.querySelector('#carouselExampleIndicators');
          if (carousel) {
            new bootstrap.Carousel(carousel);
          }
        });
      }
    }, []);

    return (
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {pathname === '/' && <SlideShow className="mb-10" />}
          <div className="flex flex-col px-[calc(100%-1660px)] min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
            <div className='mt-4 rounded'>
              <Providers>{children}</Providers>
            </div>
          </div>
          <div className='flex flex-col justify-center gap-1 fixed bottom-16 right-4'>
            <Map></Map>
            <CallPhone></CallPhone>
            <ChatBotButton state={setIsChatOpen}></ChatBotButton>
            <ChatMess></ChatMess>
            <BackToTopButton></BackToTopButton>
          </div>
          <div>
            {isChatOpen && <ChatBotWindow onClose={closeChatBot} />}
          </div>
          <Footer />
        </body>
      </html>
    )
}
