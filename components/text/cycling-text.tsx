"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

type CyclingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  words: string[]
  interval?: number
}

function CyclingText({
  words,
  interval = 3000,
  className,
  ...props
}: CyclingTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span data-slot="cycling-text" {...props} className={className}>
      <span className="relative inline-flex perspective-[9999999px] transform-3d">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute right-0 origin-[50%_50%] backface-hidden whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
        <span className="invisible whitespace-nowrap">{words.reduce((a, b) => a.length >= b.length ? a : b)}</span>
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  )
}

export { CyclingText, type CyclingTextProps }
