"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "@/components/icons"

type Experience = {
  company: string
  logo: string
  role: string
  period: string
  bullets: string[]
  technologies: string[]
  subRoles?: { role: string; period: string }[]
  additionalBullets?: string[]
}

const experiences: Experience[] = [
  {
    company: "Google",
    logo: "/logos/google.png",
    role: "Customer Engineer",
    period: "2026 - Present",
    bullets: [
      "Member of the Google Cloud Customer Engineering team, providing technical expertise and support to customers across different industries.",
      "Designing and implementing end-to-end solutions for customers using Google Cloud's AI, Gemini and GWS products.",
      "Created GEN-AI based agents to automate customer workflows using Gemini Enterprise and Google Workspace tools.",
    ],
    technologies: ["Python", "Gemini Enterprise", "Google Cloud", "GWS"],
  },
  {
    company: "DevRev",
    logo: "/logos/devrevBig.png",
    role: "Applied AI Solutions Engineer",
    period: "2025 - 2026",
    bullets: [
      "Built AI-driven demos and PoCs, increasing technical win rate during sales cycles.",
      "Worked on fine tuning prompts and optimizing LLM integrations for customer solutions.",
      "Designed customer-facing integrations and automation workflows, data migration and sync from other platforms.",
      "Partnered with Product & GTM teams to translate feedback into roadmap improvements and new AI features.",
    ],
    technologies: ["Python", "TypeScript", "AI/ML", "GraphQL"],
  },
  {
    company: "Salesforce",
    logo: "/logos/Salesforce.com_logo.svg.png",
    role: "Software Engineer",
    period: "2021 - 2025",
    bullets: [
      "Prototyped and validated new Salesforce features with Product and Solutions Engineering.",
      "Designed an AI-OCR data import prototype used by GTM teams for early customer testing.",
      "Shipped full-stack features for Salesforce Starter (SMB CRM) to enhance UX and adoption.",
      "Built an internal search engine (Python + APIs) unifying documentation across Drive, Quip, Confluence & GitHub used by more than 15 engineering teams.",
      "Mentored and hosted two interns and delivered GraphQL APIs & automated tests (TypeScript).",
    ],
    technologies: ["Salesforce Platform", "JavaScript", "Python", "AI/ML"],
    subRoles: [{
      role: "Member of Technical Staff",
      period: "2024 - 2025",
    },
    {
      role: "Associate Member of Technical Staff",
      period: "2022 - 2023",
    },
    {
      role: "Intern",
      period: "2021 - 2022",
    },
    ]
  },
  {
    company: "MercadoLibre",
    logo: "/logos/mercadolibre.svg",
    role: "Data Scientist, Visualization",
    period: "Sep 2020 - Mar 2021",
    bullets: [
      "Created dashboards and live visualizations used by 20+ teams across 5 business units.",
      "Automated ETL pipelines ensuring data reliability for business reporting.",
      "Engaged with different teams to enable a data driven culture and impact decision-making processes with clear metrics.",
    ],
    technologies: ["Python", "SQL", "Data Visualization", "ETL"],
  },
  {
    company: "J.P. Morgan Chase",
    logo: "/logos/jp-morgan.svg",
    role: "Data Analytics Intern",
    period: "Mar 2019 - Mar 2020",
    bullets: [
      "Delivered insights that helped raise Net Promoter Score from 15 to 67.",
      "Created live dashboards to monitor customer sentiment and operational metrics.",
      "Improved data collection processes, enhancing reporting accuracy and timeliness.",
      "Added data visualization to company processes for better clarity and decision-making.",
    ],
    technologies: ["Data Analytics", "SQL", "Python"],
  },
  {
    company: "Ecolab",
    logo: "/logos/ecolab.svg.png",
    role: "Business Systems Analyst Intern",
    period: "Jun 2018 - Mar 2019",
    bullets: [
      "Supported business process automation and system integration projects.",
      "Analyzed requirements and documented workflows for enterprise applications.",
      "Performed automated changes on Accounting Systems for quality and efficiency improvements.",
    ],
    technologies: ["Business Analysis", "SQL", "Process Automation", "Blackline", "OnBase"],
  },
]

const companyLogos = [
  { name: "Google", src: "/logos/google.png" },
  { name: "Salesforce", src: "/logos/Salesforce.com_logo.svg.png" },
  { name: "MercadoLibre", src: "/logos/mercadolibre.svg" },
  { name: "JPMorgan Chase", src: "/logos/jp-morgan.svg" },
  { name: "DevRev", src: "/logos/devrevBig.png" },
  { name: "Ecolab", src: "/logos/ecolab.svg.png" },
  { name: "UADE", src: "/logos/UADE.svg.png" },
]

export function Experience() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 text-muted-foreground">
          <Link
            href="https://github.com/MatPitt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Icons.github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </Link>
          <span className="text-muted-foreground/40">•</span>
          <Link
            href="https://www.linkedin.com/in/mateo-pitarch-575b78172/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Icons.linkedin className="h-5 w-5" />
            <span className="text-sm font-medium">LinkedIn</span>
          </Link>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Experience</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
          Here is my professional experience journey across different roles and industries.
        </p>

        <div className="mb-20 overflow-hidden">
          <div className="relative">
            <div className="flex gap-12 animate-scroll">
              {/* First set of logos */}
              {companyLogos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className={`flex-shrink-0 ${logo.name === "DevRev" ? "w-56" : "w-48"} h-20 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100`}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={`${logo.name} logo`}
                    fill
                    className={`object-contain ${logo.name === "DevRev" ? "scale-110" : ""}`}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className={`flex-shrink-0 ${logo.name === "DevRev" ? "w-56" : "w-48"} h-20 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100`}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={`${logo.name} logo`}
                    fill
                    className={`object-contain ${logo.name === "DevRev" ? "scale-110" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="p-8 opacity-0 transition-all duration-700 hover:shadow-lg hover:scale-[1.01] border-border/80"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`relative ${exp.company === "DevRev" ? "w-16 h-16" : "w-12 h-12"} flex-shrink-0 rounded-lg overflow-hidden bg-background border border-border/80`}
                  >
                    <Image
                      src={exp.logo || "/placeholder.svg"}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-1">{exp.role}</h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground md:text-right md:ml-4 whitespace-nowrap">{exp.period}</p>
              </div>

              <ul className="space-y-2 mb-4 text-muted-foreground leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {exp.subRoles && (
                <div className="mb-4 pl-6 border-l-2 border-border/80 space-y-3">
                  {exp.subRoles.map((subRole, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-medium text-foreground">{subRole.role}</p>
                      <p className="text-muted-foreground text-xs">{subRole.period}</p>
                    </div>
                  ))}
                  {exp.additionalBullets && (
                    <ul className="space-y-2 mt-3 text-muted-foreground">
                      {exp.additionalBullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 border border-border/80 rounded-lg bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-lg">Universidad Argentina de la Empresa (UADE)</p>
              <p className="text-muted-foreground">B.S. in Information Systems Engineering</p>
            </div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-background border border-border/80">
              <Image
                src="/logos/UADE.svg.png"
                alt="UADE logo"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
