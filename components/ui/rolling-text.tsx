"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimationControls, useInView, type Easing } from "framer-motion"
import { useEffect, useMemo, useRef } from "react"

interface TransitionConfig {
  duration?: number
  delay?: number
  ease?: Easing | "easeOut" | "easeIn" | "easeInOut" | "linear"
}

interface RollingTextProps {
  text: string
  inView?: boolean
  inViewMargin?: string
  inViewOnce?: boolean
  transition?: TransitionConfig
  className?: string
  repeatInterval?: number
}

export function RollingText({
  text,
  inView: inViewProp = false,
  inViewMargin = "0px",
  inViewOnce = true,
  transition = { duration: 0.5, delay: 0.1, ease: "easeOut" },
  className,
  repeatInterval = 0,
}: RollingTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const isInView = useInView(ref, {
    margin: inViewMargin as any,
    once: inViewOnce,
  })

  const shouldAnimate = inViewProp || isInView

  const duration = transition.duration ?? 0.5
  const delay = transition.delay ?? 0.1
  const ease = transition.ease ?? "easeOut"

  const characters = useMemo(() => text.split(""), [text])
  const totalAnimationMs = useMemo(() => {
    const letters = Math.max(characters.length - 1, 0)
    return (duration + delay * letters) * 1000
  }, [characters.length, duration, delay])

  const containerVariants = useMemo(
    () => ({
      hidden: {
        transition: {
          staggerChildren: delay,
          staggerDirection: -1,
        },
      },
      visible: {
        transition: {
          staggerChildren: delay,
          staggerDirection: 1,
        },
      },
    }),
    [delay],
  )

  const letterVariants = useMemo(
    () => ({
      hidden: { rotateX: 90, opacity: 0, y: "0.5em" },
      visible: {
        rotateX: 0,
        opacity: 1,
        y: "0em",
        transition: {
          duration,
          ease,
        },
      },
    }),
    [duration, ease],
  )

  useEffect(() => {
    if (!shouldAnimate) {
      controls.stop()
      controls.set("hidden")
      return
    }

    let cancelled = false
    let timer: NodeJS.Timeout | null = null

    const play = async () => {
      controls.set("hidden")
      if (cancelled) return

      await controls.start("visible")
      if (cancelled) return

      if (!repeatInterval || repeatInterval <= 0 || inViewOnce) return

      const pause = Math.max(repeatInterval - totalAnimationMs, 0)

      timer = setTimeout(() => {
        if (cancelled) return
        play()
      }, pause)
    }

    play()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
      controls.stop()
    }
  }, [controls, shouldAnimate, repeatInterval, inViewOnce, totalAnimationMs])

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex overflow-hidden", className)}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            backfaceVisibility: "hidden",
          }}
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
