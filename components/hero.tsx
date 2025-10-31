"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { RollingText } from "@/components/ui/rolling-text"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !titleRef.current || !subtitleRef.current || !descRef.current) return

      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      const scrollProgress = Math.min(scrollY / heroHeight, 1)

      // Parallax and fade effects
      titleRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      titleRef.current.style.opacity = `${1 - scrollProgress * 1.5}`

      subtitleRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
      subtitleRef.current.style.opacity = `${1 - scrollProgress * 1.2}`

      descRef.current.style.transform = `translateY(${scrollY * 0.2}px)`
      descRef.current.style.opacity = `${1 - scrollProgress}`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border/80 shadow-xl bg-background">
            <Image
              src="/logos/Memoji.jpg"
              alt="Foto de perfil - Mateo Pitarch"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div ref={titleRef} className="transition-all duration-300">
          <RollingText 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-balance"
            text="Mateo Pitarch"
            inView={true}
            inViewOnce={false}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            repeatInterval={2500}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted" asChild>
            <a href="https://github.com/MatPitt" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Icons.github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted" asChild>
            <a href="https://www.linkedin.com/in/mateo-pitarch-575b78172/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icons.linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide transition-all duration-300"
        >
          Software/Solutions/Product Engineer
          <span className="block mt-2 text-lg md:text-xl text-muted-foreground/70">📍 Buenos Aires, Argentina</span>
        </p>

        <p
          ref={descRef}
          className="text-base md:text-lg lg:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed text-pretty transition-all duration-300"
        >
          Experienced software engineer specializing in backend development with a passion for building and technology. I have worked in different areas, roles and industries, always looking to deliver value and learn. I love building, creating and contributing to innovative technology solutions. I worked in different places including DevRev, Salesforce, MercadoLibre, MuleSoft, and JP Morgan
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
