"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  depth?: number
}

export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  ({ className, children, depth = 4, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -depth / 2 }}
        whileTap={{ y: depth }}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium",
          "before:absolute before:inset-0 before:transition-transform",
          "before:translate-y-[var(--depth)] before:bg-primary/90",
          "hover:before:translate-y-0",
          "active:before:translate-y-[var(--depth)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          className,
        )}
        style={{ "--depth": `${depth}px` } as React.CSSProperties}
        {...props}
      >
        <span className="relative text-white">{children}</span>
      </motion.button>
    )
  },
)
ThreeDButton.displayName = "ThreeDButton"

