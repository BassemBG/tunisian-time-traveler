"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const historicalEras = [
  { id: 1, name: "Ancient Carthage", image: "/images/carthage.jpg" },
  { id: 2, name: "Roman Tunisia", image: "/images/roman-tunisia.jpg" },
  { id: 3, name: "Islamic Golden Age", image: "/images/islamic-tunisia.jpg" },
  { id: 4, name: "Modern Tunisia", image: "/images/modern-tunisia.jpg" },
]

export default function Home() {
  const [currentEra, setCurrentEra] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % historicalEras.length)
    }, 5000) // Change era every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Morphing Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-red-900 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-red-900 to-black animate-gradient-y"></div>
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          key={currentEra}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          {historicalEras[currentEra].name}
        </motion.h1>
        <motion.p
          key={`desc-${currentEra}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 mb-8"
        >
          {t("exploreHistory")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/explorer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              {t("startExploring")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

