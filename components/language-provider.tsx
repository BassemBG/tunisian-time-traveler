"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type Language = "en" | "fr" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    exploreHistory: "Experience 3000 years of Tunisian history through immersive AR & VR",
    startExploring: "Start Exploring",
    "nav.home": "Home",
    "nav.explorer": "Explorer",
    "nav.figures": "Historical Figures",
    "nav.store": "Store",
    "nav.profile": "Profile",
    "store.title": "Store",
    "store.cart": "Cart",
    "store.addToCart": "Add to Cart",
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.quantity": "Quantity",
    "cart.price": "Price",
    "cart.total": "Total",
    "cart.clear": "Clear Cart",
    "cart.checkout": "Checkout",
    "explorer.title": "Explore Tunisia's History",
    "explorer.startVR": "Start VR Experience",
    "explorer.gallery": "Image and Video Gallery",
    "explorer.era.Antiquity": "Antiquity",
    "explorer.era.Middle Ages": "Middle Ages",
    "explorer.era.Modern Era": "Modern Era",
    "common.BCE": "BCE",
    "common.CE": "CE",
    "figures.title": "Historical Figures",
    "figures.startConversation": "Start Conversation",
    language: "Language",
    "explorer.category.landmarks": "Landmarks",
    "explorer.category.culture": "Culture",
    "explorer.category.events": "Events",
  },
  fr: {
    exploreHistory: "Découvrez 3000 ans d'histoire tunisienne grâce à la RA et la RV immersives",
    startExploring: "Commencer l'exploration",
    "nav.home": "Accueil",
    "nav.explorer": "Explorateur",
    "nav.figures": "Personnages historiques",
    "nav.store": "Boutique",
    "nav.profile": "Profil",
    "store.title": "Boutique",
    "store.cart": "Panier",
    "store.addToCart": "Ajouter au panier",
    "cart.title": "Votre panier",
    "cart.empty": "Votre panier est vide",
    "cart.quantity": "Quantité",
    "cart.price": "Prix",
    "cart.total": "Total",
    "cart.clear": "Vider le panier",
    "cart.checkout": "Passer à la caisse",
    "explorer.title": "Explorez l'histoire de la Tunisie",
    "explorer.startVR": "Démarrer l'expérience VR",
    "explorer.gallery": "Galerie d'images et de vidéos",
    "explorer.era.Antiquity": "Antiquité",
    "explorer.era.Middle Ages": "Moyen Âge",
    "explorer.era.Modern Era": "Époque moderne",
    "common.BCE": "av. J.-C.",
    "common.CE": "apr. J.-C.",
    "figures.title": "Personnages historiques",
    "figures.startConversation": "Commencer la conversation",
    language: "Langue",
    "explorer.category.landmarks": "Monuments",
    "explorer.category.culture": "Culture",
    "explorer.category.events": "Événements",
  },
  ar: {
    exploreHistory: "اختبر 3000 عام من التاريخ التونسي من خلال تقنيات الواقع المعزز والواقع الافتراضي الغامرة",
    startExploring: "ابدأ الاستكشاف",
    "nav.home": "الرئيسية",
    "nav.explorer": "المستكشف",
    "nav.figures": "شخصيات تاريخية",
    "nav.store": "المتجر",
    "nav.profile": "الملف الشخصي",
    "store.title": "المتجر",
    "store.cart": "عربة التسوق",
    "store.addToCart": "أضف إلى العربة",
    "cart.title": "عربة التسوق الخاصة بك",
    "cart.empty": "عربة التسوق فارغة",
    "cart.quantity": "الكمية",
    "cart.price": "السعر",
    "cart.total": "المجموع",
    "cart.clear": "إفراغ العربة",
    "cart.checkout": "إتمام الشراء",
    "explorer.title": "استكشف تاريخ تونس",
    "explorer.startVR": "بدء تجربة الواقع الافتراضي",
    "explorer.gallery": "معرض الصور والفيديو",
    "explorer.era.Antiquity": "العصور القديمة",
    "explorer.era.Middle Ages": "العصور الوسطى",
    "explorer.era.Modern Era": "العصر الحديث",
    "common.BCE": "قبل الميلاد",
    "common.CE": "ميلادي",
    "figures.title": "الشخصيات التاريخية",
    "figures.startConversation": "بدء المحادثة",
    language: "اللغة",
    "explorer.category.landmarks": "المعالم",
    "explorer.category.culture": "الثقافة",
    "explorer.category.events": "الأحداث",
  },
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("en")

  const t = React.useCallback(
    (key: string) => {
      return translations[language][key] || key
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
      <LanguageSwitcher />
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-white">{t("language")}:</span>
        <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
          EN
        </Button>
        <Button variant={language === "fr" ? "default" : "outline"} size="sm" onClick={() => setLanguage("fr")}>
          FR
        </Button>
        <Button variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>
          عربي
        </Button>
      </div>
    </div>
  )
}

