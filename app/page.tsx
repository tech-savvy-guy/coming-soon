'use client'

import { useState, useEffect } from 'react'

import Lottie from "lottie-react"
import animationData from "@/public/fire.json"

export default function Page() {
  
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animateDot = () => {
      setDotPos((prev) => {
        const lagFactor = 0.15 // Adjust this value (0-1) to change lag amount
        const newX = prev.x + (mousePos.x - prev.x) * lagFactor
        const newY = prev.y + (mousePos.y - prev.y) * lagFactor
        return { x: newX, y: newY }
      })
      animationFrameId = requestAnimationFrame(animateDot)
    }

    animationFrameId = requestAnimationFrame(animateDot)
    return () => cancelAnimationFrame(animationFrameId)
  }, [mousePos])

  return (
    <main className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg, 
              transparent 0%,
              transparent 30%,
              rgba(138, 43, 226, 0.4) 50%,
              transparent 70%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              #1a1a2e 0%,
              #2d1b69 50%,
              #0f0f23 100%
            )
          `,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 79px,
              rgba(255, 255, 255, 0.05) 80px,
              rgba(255, 255, 255, 0.05) 81px
            )
          `,
        }}
      />

      <div className="hidden sm:block fixed z-50 pointer-events-none transition-opacity duration-300"
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#fff',
        }}
      />

      <div className="relative z-10 min-h-screen text-foreground flex items-center justify-center font-space-grotesk px-4 sm:px-6 md:px-8 select-none py-8 sm:py-12">
        <div className="text-center space-y-8 sm:space-y-12 md:space-y-16 max-w-2xl w-full">
          <svg
            id="logo"
            viewBox="0 0 78 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-auto sm:w-40 md:w-44 lg:w-48 mx-auto mb-4 sm:mb-5 md:mb-6"
          >
            <path
              d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z"
              className="ccustom"
              fill="#fffbed"
            />
            <path
              d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z"
              fill="#fffbed"
            />
          </svg>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-none text-[#fffbed] px-2">
              Coming Soon
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 px-2">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-foreground/5 text-[#fffbed] text-[10px] sm:text-xs md:text-sm tracking-wide shadow-sm backdrop-blur-sm border border-foreground/10">
                <span className="whitespace-nowrap">Something exciting is on the way</span>
                <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block shrink-0">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                  />
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#fffbed] px-2">
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="tabular-nums">{String(time.days).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-normal">Days</span>
            </div>
            <span className="text-foreground/20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">:</span>
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="tabular-nums">{String(time.hours).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-normal">Hours</span>
            </div>
            <span className="text-foreground/20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">:</span>
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="tabular-nums">{String(time.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-normal">Minutes</span>
            </div>
            <span className="text-foreground/20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">:</span>
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className="tabular-nums">{String(time.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] sm:text-xs font-normal">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
