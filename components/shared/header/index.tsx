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
  const navItems = [
    { href: '/', label: '首页', icon: AiOutlineHome },
    { href: '/posts', label: '文章', icon: AiOutlineFileText },
    { href: '/categories', label: '分类', icon: AiOutlineTags },
    { href: '/about', label: '关于', icon: AiOutlineUser },
    { href: '/contact', label: '联系', icon: AiOutlineMail },
  ]

  return (
    <header className='flex justify-center border-b border-b-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 z-50 w-full header-box'>
      <div className='h-14 max-w-7xl flex-center'>
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
      </div>
    </header>
  )
}

export default Header