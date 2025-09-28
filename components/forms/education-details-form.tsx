"use client"

import { Manrope } from "next/font/google"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface EducationDetailsData {
  currentLevel: string
  institution: string
  course: string
  year: string
  cgpa: string
  percentage: string
}

interface EducationDetailsFormProps {
  data: EducationDetailsData
  onUpdate: (data: Partial<EducationDetailsData>) => void
}

export function EducationDetailsForm({ data, onUpdate }: EducationDetailsFormProps) {
  const handleInputChange = (field: keyof EducationDetailsData, value: string) => {
    onUpdate({ [field]: value })
  }

  const educationLevels = [
    "High School (12th)",
    "Diploma",
    "Bachelor's Degree (Pursuing)",
    "Bachelor's Degree (Completed)",
    "Master's Degree (Pursuing)",
    "Master's Degree (Completed)",
    "PhD (Pursuing)",
    "PhD (Completed)",
  ]

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Completed"]

  return (
    <div className="space-y-6">
      {/* Current Education Level */}
      <div className="space-y-2">
        <Label htmlFor="currentLevel">Current Education Level *</Label>
        <Select
          value={data.currentLevel}
          onValueChange={(value) => handleInputChange("currentLevel", value)}
        >
          <SelectTrigger className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}>
            <SelectValue placeholder="Select your current education level" />
          </SelectTrigger>
          <SelectContent className={manrope.className}>
            {educationLevels.map((level) => (
              <SelectItem key={level} value={level} className={manrope.className}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Institution */}
      <div className="space-y-2">
        <Label htmlFor="institution">Institution/College/University *</Label>
        <Input
          id="institution"
          value={data.institution}
          onChange={(e) => handleInputChange("institution", e.target.value)}
          placeholder="Enter your institution name"
          required
          className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
        />
      </div>

      {/* Course and Year */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="course">Course/Stream *</Label>
          <Input
            id="course"
            value={data.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            placeholder="e.g., Computer Science, Mechanical Engineering"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Current Year *</Label>
          <Select
            value={data.year}
            onValueChange={(value) => handleInputChange("year", value)}
          >
            <SelectTrigger className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}>
              <SelectValue placeholder="Select current year" />
            </SelectTrigger>
            <SelectContent className={manrope.className}>
              {years.map((year) => (
                <SelectItem key={year} value={year} className={manrope.className}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CGPA & Percentage */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cgpa">CGPA (if applicable)</Label>
          <Input
            id="cgpa"
            value={data.cgpa}
            onChange={(e) => handleInputChange("cgpa", e.target.value)}
            placeholder="e.g., 8.5"
            type="number"
            step="0.01"
            min="0"
            max="10"
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="percentage">Percentage (if applicable)</Label>
          <Input
            id="percentage"
            value={data.percentage}
            onChange={(e) => handleInputChange("percentage", e.target.value)}
            placeholder="e.g., 85"
            type="number"
            min="0"
            max="100"
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <h4 className="font-medium text-orange-700 mb-2">Additional Information</h4>
        <p className="text-sm text-orange-600">
          Your educational background helps us match you with internships that align with your academic level and field
          of study. If you're currently pursuing a degree, select "Pursuing" and indicate your current year.
        </p>
      </div>

      <div className="text-sm text-gray-600">
        <p>* Required fields</p>
      </div>
    </div>
  )
}
