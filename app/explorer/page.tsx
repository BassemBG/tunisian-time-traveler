"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Timeline } from "@/components/timeline"
import { MapPin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const historicalPeriods = [
  { id: 0, name: "Antiquity", year: -814 },
  { id: 1, name: "Middle Ages", year: 670 },
  { id: 2, name: "Modern Era", year: 1574 },
]

const categories = [
  { id: "landmarks", name: "Landmarks" },
  { id: "culture", name: "Culture" },
  { id: "events", name: "Events" },
]

const historicalSites = [
  {
    id: 1,
    name: "Carthage",
    coordinates: { x: 45, y: 25 },
    period: 0,
    category: "landmarks",
    description: "Ancient Phoenician and Roman city",
    image: "/images/carthage.jpg",
    video: "/videos/carthage-teaser.mp4",
  },
  {
    id: 2,
    name: "Kairouan",
    coordinates: { x: 55, y: 45 },
    period: 1,
    category: "landmarks",
    description: "Fourth holiest city of Islam",
    image: "/images/kairouan.jpg",
    video: "/videos/kairouan-teaser.mp4",
  },
  {
    id: 3,
    name: "Medina of Tunis",
    coordinates: { x: 40, y: 30 },
    period: 2,
    category: "landmarks",
    description: "Historic heart of Tunis",
    image: "/images/medina-tunis.jpg",
    video: "/videos/medina-tunis-teaser.mp4",
  },
  {
    id: 4,
    name: "Punic Wars",
    coordinates: { x: 35, y: 20 },
    period: 0,
    category: "events",
    description: "Series of wars between Rome and Carthage",
    image: "/images/punic-wars.jpg",
    video: "/videos/punic-wars-teaser.mp4",
  },
  {
    id: 5,
    name: "Arab Conquest",
    coordinates: { x: 50, y: 40 },
    period: 1,
    category: "events",
    description: "Islamic expansion into North Africa",
    image: "/images/arab-conquest.jpg",
    video: "/videos/arab-conquest-teaser.mp4",
  },
  {
    id: 6,
    name: "Tunisian Independence",
    coordinates: { x: 45, y: 35 },
    period: 2,
    category: "events",
    description: "Tunisia gains independence from France",
    image: "/images/tunisian-independence.jpg",
    video: "/videos/tunisian-independence-teaser.mp4",
  },
  {
    id: 7,
    name: "Carthaginian Culture",
    coordinates: { x: 40, y: 25 },
    period: 0,
    category: "culture",
    description: "Art, religion, and daily life in ancient Carthage",
    image: "/images/carthaginian-culture.jpg",
    video: "/videos/carthaginian-culture-teaser.mp4",
  },
  {
    id: 8,
    name: "Islamic Golden Age",
    coordinates: { x: 60, y: 50 },
    period: 1,
    category: "culture",
    description: "Advancements in science, art, and philosophy",
    image: "/images/islamic-golden-age.jpg",
    video: "/videos/islamic-golden-age-teaser.mp4",
  },
  {
    id: 9,
    name: "Modern Tunisian Art",
    coordinates: { x: 55, y: 30 },
    period: 2,
    category: "culture",
    description: "Contemporary art scene in Tunisia",
    image: "/images/modern-tunisian-art.jpg",
    video: "/videos/modern-tunisian-art-teaser.mp4",
  },
]

export default function ExplorerPage() {
  const [selectedSite, setSelectedSite] = React.useState<(typeof historicalSites)[0] | null>(null)
  const [selectedPeriod, setSelectedPeriod] = React.useState(0)
  const [selectedCategory, setSelectedCategory] = React.useState("landmarks")
  const { t } = useLanguage()

  const filteredSites = historicalSites.filter(
    (site) => site.period === selectedPeriod && site.category === selectedCategory,
  )

  return (
    <div className="page-background">
      <div className="container py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">{t("explorer.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/tunisia-map.jpg" alt="Map of Tunisia" layout="fill" objectFit="cover" />

              {filteredSites.map((site) => (
                <motion.button
                  key={site.id}
                  className="absolute"
                  style={{
                    left: `${site.coordinates.x}%`,
                    top: `${site.coordinates.y}%`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-primary drop-shadow-lg" />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Timeline eras={historicalPeriods} onEraChange={(eraId) => setSelectedPeriod(eraId)} />

            <Tabs defaultValue="landmarks" onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {t(`explorer.category.${category.id}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {selectedSite && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{selectedSite.name}</h3>
                <p className="text-gray-200 mb-4">{selectedSite.description}</p>
                <div className="aspect-video relative mb-4">
                  <video
                    src={selectedSite.video}
                    poster={selectedSite.image}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                </div>
                <Button
                  onClick={() => {
                    console.log("Starting VR experience for:", selectedSite.name)
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t("explorer.startVR")}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

