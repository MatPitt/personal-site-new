"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, Award } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    title: "Salesforce GenAI Hackathon Winner",
    description: "Won the Salesforce GenAI Hackathon for developing an AI solution that uses OCR and AI to facilitate document processing and faster uploads. The hackathon features more than 25 engineering and product teams competing to build innovative AI-powered solutions within Salesforce's ecosystem.",
    year: "2024",
  },
  {
    icon: Award,
    title: "Systems and methods for automated pattern detection in service tickets Patent",
    description: "I was part of the original team that developed and patented innovative methods for automated pattern detection in service tickets, enhancing issue resolution efficiency.",
    year: "2023",
  },
  {
    icon: Award,
    title: "Intern Project of the Year",
    description: "Designed and implemented a new software tool that enabled engineers to search for documentation across multiple internal systems, simultaneously improving efficiency and reducing time spent searching by 30%.",
    year: "2022",
  }
]

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Achievements</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          Key milestones and recognitions throughout my career journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="p-6 opacity-0 transition-all duration-700 hover:shadow-lg hover:scale-[1.02] border-border/80 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{achievement.title}</h3>
                      <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
