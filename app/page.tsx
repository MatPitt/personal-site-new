"use client"

import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Achievements } from "@/components/achievements"
import { Projects } from "@/components/projects"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Hero />
        <Experience />
        <Achievements />
        <Skills />
        <Projects />
      </main>
    </ThemeProvider>
  )
}
