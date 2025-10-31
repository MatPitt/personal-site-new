"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Project = {
  title: string
  description: string
  technologies: string[]
  demoUrl: string
  githubUrl: string
  image?: string
}

const projects: Project[] = [
  {
    title: "JuliiCocina",
    description:
      "Site for young chef Argentinian YouTuber specialized in cakes and desserts. Juli is close to reaching 1 million subscribers on her YouTube channel.",
    technologies: ["React", "Node.js", "v0"],
    demoUrl: "https://www.juliicocina.com/",
    githubUrl: "https://github.com/MatPitt/julii-cocina",
    image: "/images/juliCocinaLogo.png",
  },
  {
    title: "Globe Particle Visualizer",
    description:
      "Interactive 3D visualization of Earth using particle simulations and WebGL, featuring real-time rendering and smooth animations for an immersive experience.",
    technologies: ["JavaScript", "WebGL", "V0", "Three.js"],
    demoUrl: "https://v0-particle-explorer.vercel.app/",
    githubUrl: "https://github.com/MatPitt/v0-particles-globe",
    image: "/images/particlesLogo.png",
  },
  {
    title: "WhatsApp Car Sales Agent",
    description:
      "Intelligent conversational agent for automotive sales and customer support, powered by OpenAI, handling inquiries and providing personalized recommendations via WhatsApp.",
    technologies: ["Python", "Flask", "OpenAI", "Twilio"],
    demoUrl: "https://drive.google.com/file/d/1JaKH6zkfvBklifilmCZ7ADFeDaxhIdSz/view?usp=sharing",
    githubUrl: "#",
    image: "/images/WhatsppSalesAssistant.png",
  },
  {
    title: "Ads Metrics Equalizer",
    description: "Tool to compare and equalize ad metrics between different ad platforms.",
    technologies: ["React", "WebSockets", "V0"],
    demoUrl: "https://v0-modern-dashboard-design-eight-tau.vercel.app/",
    githubUrl: "#",
    image: "/images/metricsLogo.png",
  },
  {
    title: "Bakery Shop Web Site",
    description: "Basic e-commerce website for a bakery shop built with React and V0.",
    technologies: ["React", "WebSockets", "V0"],
    demoUrl: "https://v0-bakery-website-with-admin.vercel.app/",
    githubUrl: "https://github.com/MatPitt/bakery-app",
    image: "/images/bakery.png",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Projects</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          Some of my recent work and projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="relative overflow-hidden p-6 opacity-0 transition-all duration-700 hover:shadow-xl border-border/80 group"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10 space-y-4">
                {project.image ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border/70 bg-muted/20">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-border/70 bg-muted/30 text-sm text-muted-foreground">
                    Preview coming soon
                  </div>
                )}

                <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent group/btn" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent group/btn" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  transform: hoveredIndex === index ? "scale(1)" : "scale(0.95)",
                  transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                }}
              />
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">More projects coming soon...</p>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View All on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
