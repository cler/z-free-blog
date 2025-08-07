import React from 'react'
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineTags,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EllipsisVertical } from 'lucide-react';

function Menu() {
 const navItems = [
    { href: "/", label: "首页", icon: AiOutlineHome },
    { href: "/articles", label: "文章", icon: AiOutlineFileText },
    { href: "/categories", label: "分类", icon: AiOutlineTags },
    { href: "/about", label: "关于", icon: AiOutlineUser },
    { href: "/contact", label: "联系", icon: AiOutlineMail },
  ];

  return (
    <div>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-white/90 hover:text-white hover:scale-110 transition-all duration-300 transform"
                >
                  <IconComponent className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium group-hover:font-semibold transition-all duration-200">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start p-2 ">
              <SheetTitle>菜单</SheetTitle>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2  hover:scale-110 transition-all duration-300 transform"
                  >
                    <IconComponent className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium group-hover:font-semibold transition-all duration-200">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </SheetContent>
          </Sheet>
        </nav>
      </div>
  )
}

export default Menu