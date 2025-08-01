import Header from '@/components/shared/header'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
   <div className='flex h-screen flex-col'>
    <Header />
    <main>
        {children}
    </main>
   </div>
  )
}

export default Layout
