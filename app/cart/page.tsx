"use client"

import React from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>
        {cart.length === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-600">
                      {t("cart.quantity")}: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      {t("cart.price")}: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {t("cart.total")}: ${getCartTotal().toFixed(2)}
              </h2>
              <div>
                <Button variant="outline" onClick={clearCart} className="mr-2">
                  {t("cart.clear")}
                </Button>
                <Button className="bg-primary hover:bg-primary-dark text-white">{t("cart.checkout")}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

