"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Clock, Award, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"

const achievements = [
  {
    id: 1,
    title: "profile.achievement.timeTraveler",
    description: "profile.achievement.timeTravelerDesc",
    progress: 60,
    icon: Clock,
  },
  {
    id: 2,
    title: "profile.achievement.historyScholar",
    description: "profile.achievement.historyScholarDesc",
    progress: 40,
    icon: BookOpen,
  },
  {
    id: 3,
    title: "profile.achievement.culturalExpert",
    description: "profile.achievement.culturalExpertDesc",
    progress: 80,
    icon: Award,
  },
]

export default function ProfilePage() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Morphing Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-red-900 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-red-900 to-black animate-gradient-y"></div>
      </div>

      <div className="relative container py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">John Doe</h1>
                <p className="text-gray-300">Premium Member</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-white mb-2">{t("profile.subscription")}</h2>
                <div className="bg-primary/10 font-bold text-primary rounded-lg p-4">{t("profile.premiumPlan")}</div>
              </div>

              <div>
                <h2 className="font-semibold text-white mb-2">{t("profile.statistics")}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg">
                    <p className="text-gray-300">{t("profile.timeSpent")}</p>
                    <p className="text-2xl font-bold text-white">24h</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg">
                    <p className="text-gray-300">{t("profile.placesVisited")}</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{t("profile.achievements")}</h2>
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <achievement.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-white">{t(achievement.title)}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{t(achievement.description)}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={achievement.progress} className="flex-1" />
                    <span className="text-sm font-medium text-gray-300">{achievement.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

