import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { GeistSans } from "geist/font/sans"
import { LanguageProvider } from "@/components/language-provider"
import { CartProvider } from "@/contexts/CartContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <CartProvider>
              <Navigation />
              <main className="min-h-screen pt-16">{children}</main>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'