"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface PageTitleContextType {
  currentTitle: string
  setCurrentTitle: (title: string) => void
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined)

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [currentTitle, setCurrentTitle] = useState('仪表板')

  return (
    <PageTitleContext.Provider value={{ currentTitle, setCurrentTitle }}>
      {children}
    </PageTitleContext.Provider>
  )
}

export function usePageTitle() {
  const context = useContext(PageTitleContext)
  if (context === undefined) {
    throw new Error('usePageTitle must be used within a PageTitleProvider')
  }
  return context
}