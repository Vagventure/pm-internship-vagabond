import { Header } from "@/components/header"
import { EligibilitySection } from "@/components/eligibility-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ResumeUploadSection } from "@/components/resume-upload-section"
// import UserButton from "@/components/user-button"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <EligibilitySection />
          <BenefitsSection />
        </div>
      </main>
      <ResumeUploadSection />
      <Footer />
    </div>
  )
}
