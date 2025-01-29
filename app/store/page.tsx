"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Virtual Tour: Ancient Carthage",
    price: 29.99,
    type: "digital",
    image: "/images/carthage-tour.jpg",
    description: "Experience the grandeur of ancient Carthage in VR",
  },
  {
    id: 2,
    name: "Historical Tunisia Book",
    price: 49.99,
    type: "physical",
    image: "/images/tunisia-book.jpg",
    description: "Comprehensive guide to Tunisia's rich history",
  },
  // Add more products
]

export default function StorePage() {
  const { cart, addToCart } = useCart()
  const { t } = useLanguage()

  return (
    <div className="page-background">
      <div className="container py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">{t("store.title")}</h1>
          <Link href="/cart">
            <Button variant="outline" className="flex items-center gap-2">
              
                <ShoppingCart className="h-5 w-5" />
                {t("store.cart")} ({cart.reduce((total, item) => total + item.quantity, 0)})
              
            </Button>
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
            >
              <div className="aspect-video relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-white">
                    {product.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                  >
                    {t("store.addToCart")}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

