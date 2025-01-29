"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, MapPin, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const historicalEras = [
  { id: 1, name: "explorer.era.Ancient Carthage", image: "/images/carthage.jpg" },
  { id: 2, name: "explorer.era.Roman Tunisia", image: "/images/roman-tunisia.jpg" },
  { id: 3, name: "explorer.era.Modern Tunisia", image: "/images/modern-tunisia.jpg" },
  { id: 4, name: "Islamic Golden Age", image: "/images/islamic-tunisia.jpg" },

]

const features = [
  { id: 1, icon: Clock, text: "Traverse 3000 years of history" },
  { id: 2, icon: MapPin, text: "Explore iconic Tunisian landmarks" },
  { id: 3, icon: Book, text: "Immerse in rich cultural narratives" },
]

export default function Home() {
  const [currentEra, setCurrentEra] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000) // Change feature every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Morphing Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-red-700 to-gray-950 animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-red-800 to-gray-950 animate-gradient-y"></div>
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Tunisian <span className="text-black">Time</span> Traveler
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
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: index === currentFeature ? 1 : 0, x: index === currentFeature ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center space-x-2 ${index === currentFeature ? "block" : "hidden"}`}
            >
              <feature.icon className="w-6 h-6 text-primary" />
              <span className="text-lg">{t(`home.feature${feature.id}.text`)}</span>
            </motion.div>
          ))}
        </motion.div>


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

