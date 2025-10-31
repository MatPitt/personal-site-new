"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    category: "Languages & Frameworks",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "GraphQL", "React", "Next.js", "Node.js"],
  },
  {
    category: "Platforms & Tools",
    skills: ["Salesforce Platform","Agentforce", "Vercel", "Docker", "Twilio", "Git", "Tableau", "V0", "MongoDB"],
  },
  {
    category: "Expertise",
    skills: [
      "API Development",
      "API Integration",
      "AI Automation",
      "Data Migration",
      "CRM Integrations",
      "GTM Systems",
      "E2E Testing",
      "Agent Development",
      "Prompt Engineering"
    ],
  },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1 },
    )

    categoriesRef.current.forEach((cat) => {
      if (cat) observer.observe(cat)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Skills</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          A comprehensive toolkit for building modern, scalable applications.
        </p>

        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              ref={(el) => {
                categoriesRef.current[index] = el
              }}
              className="opacity-0 transition-all duration-700"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-muted-foreground">{category.category}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-sm py-2 px-4 hover:bg-accent hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
