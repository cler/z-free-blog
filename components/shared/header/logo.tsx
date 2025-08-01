'use client'

import Link from 'next/link'
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Logo() {
  const logoText = "LEFT IS FACK MOVIE,人生如戏呀、老铁"

  useGSAP(
    () => {
      const chars = document.querySelectorAll("span.letter")
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

      tl.to(chars, {
          y: -5,
          color: (i) => `hsl(${(i / chars.length) * 360}, 100%, 50%)`,
          stagger: {
            each: 0.1,
            from: "start",
            yoyo: true,
            repeat: 3,
          },
          ease: "power1.inOut",
          duration: 0.5,
        })
    },
  )

  return (
    <div className="items-center hidden md:flex">
      <Link href="/" className="text-xl font-bold">
        {logoText.split("").map((char, index) => (
          <span
            key={index}
            style={{ display: "inline-block" }}
            className={char === " " ? "" : "letter"}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Link>
    </div>
  )
}

export default Logo