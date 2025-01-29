"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Clock, Award, BookOpen } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const achievements = [
  {
    id: 1,
    title: "Time Traveler",
    description: "Explored 5 different historical periods",
    progress: 60,
    icon: Clock,
  },
  {
    id: 2,
    title: "History Scholar",
    description: "Completed 10 historical lessons",
    progress: 40,
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Cultural Expert",
    description: "Mastered 3 cultural aspects",
    progress: 80,
    icon: Award,
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-600">Premium Member</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Subscription</h2>
                <div className="bg-primary/10 text-primary rounded-lg p-4">Premium Plan - Valid until Dec 2024</div>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">Time Spent</p>
                    <p className="text-2xl font-bold text-gray-900">24h</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">Places Visited</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="space-y-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <achievement.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={achievement.progress} className="flex-1" />
                    <span className="text-sm font-medium text-gray-600">{achievement.progress}%</span>
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

