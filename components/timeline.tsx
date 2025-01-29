"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/components/language-provider"

interface Era {
  id: number
  name: string
  year: number
}

interface TimelineProps {
  eras: Era[]
  onEraChange?: (eraId: number) => void
}

export function Timeline({ eras, onEraChange }: TimelineProps) {
  const [selectedEra, setSelectedEra] = React.useState(0)
  const { t } = useLanguage()

  const handleEraChange = (value: number) => {
    setSelectedEra(value)
    onEraChange?.(value)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <motion.h3
          key={eras[selectedEra].name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2 text-white"
        >
          {t(`explorer.era.${eras[selectedEra].name}`)}
        </motion.h3>
        <motion.p
          key={eras[selectedEra].year}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-300"
        >
          {eras[selectedEra].year} {eras[selectedEra].year < 0 ? t("common.BCE") : t("common.CE")}
        </motion.p>
      </div>
      <Slider
        min={0}
        max={eras.length - 1}
        step={1}
        value={[selectedEra]}
        onValueChange={([value]) => handleEraChange(value)}
        className="w-full"
      />
      <div className="mt-4 flex justify-between text-sm text-gray-300">
        {eras.map((era, i) => (
          <div
            key={era.year}
            className={`text-center transition-colors ${i === selectedEra ? "text-primary font-medium" : ""}`}
          >
            {era.year}
          </div>
        ))}
      </div>
    </div>
  )
}

