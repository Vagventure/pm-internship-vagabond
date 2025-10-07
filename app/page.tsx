"use client"
import { Header } from "@/components/header"
import { EligibilitySection } from "@/components/eligibility-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ResumeUploadSection } from "@/components/resume-upload-section"
import { Footer } from "@/components/footer"
import { InfiniteMovingCardsDemo } from "@/components/infiniteMovingCardsDemo"
import Image from "next/image"
import DownloadHero from "@/components/download-hero"
import { Partners } from "@/components/partners"
import GoogleTranslateLoader from "@/components/gTranslate"
import ChatbotEmbed from "@/components/chatbot"
import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    const checkAccess = async () => {
      const res = await fetch("/api/protected/profile")
      if (res.status === 401) {
        const data = await res.json()
        alert(data.message)
      }
    }

    checkAccess()
  }, [])

  return (
    <>
      {/* <GoogleTranslateLoader /> */}
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <EligibilitySection />
            <BenefitsSection />
          </div>
        </main>
        <ResumeUploadSection />
        <InfiniteMovingCardsDemo />
        <DownloadHero />
        <Partners />
        <Footer />
        <ChatbotEmbed />
      </div>
    </>
  )
}
