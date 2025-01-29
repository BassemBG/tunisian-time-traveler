"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { useCart } from "@/contexts/CartContext"

const routes = [
  { href: "/", label: "nav.home" },
  { href: "/explorer", label: "nav.explorer" },
  { href: "/figures", label: "nav.figures" },
  { href: "/store", label: "nav.store" },
  { href: "/profile", label: "nav.profile" },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { cart } = useCart()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMenuOpen ? "bg-background shadow-md" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Tunisia Time Traveler"
            width={120}
            height={50}
            className="dark:/logo-white.png"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary" : "text-foreground",
              )}
            >
              {t(route.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-background">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(route.label)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

