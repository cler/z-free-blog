import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
   <div className='flex h-screen flex-col'>
    <main>
        {children}
    </main>
   </div>
  )
}

export default Layout
