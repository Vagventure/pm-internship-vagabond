"use client"
import { Header } from "@/components/header"
import { MultiStepForm } from "@/components/multi-step-form"

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Profile</h1>
            <p className="text-lg text-gray-600">
              We'll guide you through creating your profile step by step to find the perfect internships for you.
            </p>
          </div>
          <MultiStepForm />
        </div>
      </main>
    </div>
  )
}
