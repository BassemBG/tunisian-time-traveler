"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

const historicalFigures = [
  {
    id: 1,
    name: "Hannibal Barca",
    period: "247-183 BCE",
    description: "Carthaginian general and statesman",
    image: "/images/hannibal.jpg",
  },
  {
    id: 2,
    name: "Ibn Khaldun",
    period: "1332-1406 CE",
    description: "Historian and social scientist",
    image: "/images/ibn-khaldun.jpg",
  },
  {
    id: 3,
    name: "Habib Bourguiba",
    period: "1903-2000 CE",
    description: "First President of Tunisia",
    image: "/images/habib-bourguiba.jpg",
  },
]

export default function FiguresPage() {
  const [selectedFigure, setSelectedFigure] = React.useState<(typeof historicalFigures)[0] | null>(null)
  const { t } = useLanguage()

  return (
    <div className="page-background">
      <div className="container py-8 px-4">
        <h1 className="text-4xl text-center font-bold text-white mb-8">{t("figures.title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historicalFigures.map((figure) => (
            <motion.div
              key={figure.id}
              className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-md"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={figure.image || "/placeholder.svg"}
                  alt={t(`figures.name.${figure.id}`)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold text-white mb-2">{t(`figures.name.${figure.id}`)}</h3>
                  <p className="text-gray-200 mb-2">{t(`figures.period.${figure.id}`)}</p>
                  <p className="text-gray-300 mb-4">{t(`figures.description.${figure.id}`)}</p>
                  <Button
                    onClick={() => setSelectedFigure(figure)}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t("figures.startConversation")}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Chat Dialog would go here */}
      </div>
    </div>
  )
}

