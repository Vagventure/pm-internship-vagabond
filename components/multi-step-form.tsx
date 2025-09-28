"use client"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PersonalDetailsForm } from "./forms/personal-details-form"
import { EducationDetailsForm } from "./forms/education-details-form"
import { SkillsExperienceForm } from "./forms/skills-experience-form"
import { InternshipRecommendations } from "./internship-recommendations"

interface FormData {
  personalDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    state: string
    pincode: string
  }
  education: {
    currentLevel: string
    institution: string
    course: string
    year: string
    cgpa: string
    percentage: string
  }
  skillsExperience: {
    skills: string[]
    experience: string
    projects: string
    interests: string[]
    preferredLocations: string[]
  }
}

const initialFormData: FormData = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  },
  education: {
    currentLevel: "",
    institution: "",
    course: "",
    year: "",
    cgpa: "",
    percentage: "",
  },
  skillsExperience: {
    skills: [],
    experience: "",
    projects: "",
    interests: [],
    preferredLocations: [],
  },
}

const steps = [
  { id: 1, title: "Personal Details", description: "Basic information about you" },
  { id: 2, title: "Education", description: "Your educational background" },
  { id: 3, title: "Skills & Experience", description: "Your skills and interests" },
  { id: 4, title: "Recommendations", description: "Your personalized internships" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            data={formData.personalDetails}
            onUpdate={(data) => updateFormData("personalDetails", data)}
          />
        )
      case 2:
        return <EducationDetailsForm data={formData.education} onUpdate={(data) => updateFormData("education", data)} />
      case 3:
        return (
          <SkillsExperienceForm
            data={formData.skillsExperience}
            onUpdate={(data) => updateFormData("skillsExperience", data)}
          />
        )
      case 4:
        return <InternshipRecommendations formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className={`${manrope.className} space-y-6`}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
  {steps.map((step) => (
    <div key={step.id} className="flex flex-col items-center space-y-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step.id === currentStep ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        {step.id}
      </div>
      <div className="text-center">
        <div className={`text-sm font-medium ${step.id === currentStep ? "text-gray-700" : "text-gray-400"}`}>
          {step.title}
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
      </div>
    </div>
  ))}
</div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
        </CardHeader>
        <CardContent>{renderCurrentForm()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      {currentStep < steps.length && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={nextStep} className="flex items-center bg-gray-800 hover:bg-gray-600">
            {currentStep === steps.length - 1 ? "Get Recommendations" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
