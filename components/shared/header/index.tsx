'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { 
  AiOutlineHome, 
  AiOutlineFileText, 
  AiOutlineTags, 
  AiOutlineUser, 
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlineClose
} from 'react-icons/ai'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { href: '/', label: '首页', icon: AiOutlineHome },
    { href: '/posts', label: '文章', icon: AiOutlineFileText },
    { href: '/categories', label: '分类', icon: AiOutlineTags },
    { href: '/about', label: '关于', icon: AiOutlineUser },
    { href: '/contact', label: '联系', icon: AiOutlineMail },
  ]

  return (
    <header className='flex justify-center border-b border-b-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
      <div className='h-14 w-full max-w-7xl flex items-center justify-between px-4'>
        {/* Logo */}
        <Link href="/" className='text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200'>
          Z-Blog
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8'>
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className='group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-105'
              >
                <IconComponent className='text-lg group-hover:rotate-12 transition-transform duration-300' />
                <span className='font-medium group-hover:font-semibold transition-all duration-200'>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
          aria-label='Toggle mobile menu'
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose className='text-2xl text-gray-700 transform rotate-180 transition-transform duration-300' />
          ) : (
            <AiOutlineMenu className='text-2xl text-gray-700 hover:rotate-90 transition-transform duration-300' />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <nav className='flex flex-col py-4'>
          {navItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:translate-x-2`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <IconComponent className='text-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300' />
                <span className='font-medium group-hover:font-semibold transition-all duration-200'>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header