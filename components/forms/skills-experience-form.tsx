"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface SkillsExperienceData {
  skills: string[]
  experience: string
  projects: string
  interests: string[]
  preferredLocations: string[]
}

interface SkillsExperienceFormProps {
  data: SkillsExperienceData
  onUpdate: (data: Partial<SkillsExperienceData>) => void
}

export function SkillsExperienceForm({ data, onUpdate }: SkillsExperienceFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newLocation, setNewLocation] = useState("")

  const suggestedSkills = [
    "JavaScript", "Python", "Java", "React", "Node.js", "HTML/CSS", "SQL",
    "Git", "Communication", "Leadership", "Problem Solving", "Team Work",
    "Project Management", "Data Analysis", "Digital Marketing",
    "Content Writing", "Graphic Design",
  ]

  const suggestedInterests = [
    "Technology", "Finance", "Marketing", "Design", "Data Science",
    "Artificial Intelligence", "Startups", "Consulting", "Research",
    "Social Impact", "Healthcare", "Education",
  ]

  const suggestedLocations = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune",
    "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Remote", "Any Location",
  ]

  // Toggle item in array
  const toggleItem = (field: "skills" | "interests" | "preferredLocations", item: string) => {
    if (data[field].includes(item)) {
      onUpdate({ [field]: data[field].filter((i) => i !== item) })
    } else {
      onUpdate({ [field]: [...data[field], item] })
    }
  }

  // Add custom input item
  const addCustomItem = (
    field: "skills" | "interests" | "preferredLocations",
    value: string,
    setValue: (val: string) => void
  ) => {
    if (!value.trim()) return
    if (!data[field].includes(value.trim())) {
      onUpdate({ [field]: [...data[field], value.trim()] })
    }
    setValue("")
  }

  const handleInputChange = (field: keyof SkillsExperienceData, value: string) => {
    onUpdate({ [field]: value })
  }

  // Generic section component
  const renderSection = (
    title: string,
    placeholder: string,
    field: "skills" | "interests" | "preferredLocations",
    newValue: string,
    setNewValue: (val: string) => void,
    suggestedItems: string[]
  ) => (
    <div className="space-y-4">
      <div>
        <Label>{title} *</Label>
        <p className="text-sm text-gray-600 mb-2">{`Select or type ${placeholder.toLowerCase()}`}</p>
      </div>

      {/* Input field */}
      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={`Enter ${placeholder}`}
          onKeyDown={(e) => e.key === "Enter" && addCustomItem(field, newValue, setNewValue)}
        />
        <Button
          type="button"
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => addCustomItem(field, newValue, setNewValue)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Selected badges */}
      {data[field].length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {data[field].map((item) => (
            <Badge
              key={item}
              className="flex items-center gap-1 cursor-pointer bg-orange-500 text-white"
              onClick={() => toggleItem(field, item)}
            >
              {item} <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Suggested items */}
      <div>
        <p className="text-sm text-gray-600 mb-2 mt-2">Suggested {placeholder.toLowerCase()}:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedItems
            .filter((item) => !data[field].includes(item))
            .slice(0, 10)
            .map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={() => toggleItem(field, item)}
              >
                + {item}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderSection("Technical & Soft Skills", "a skill", "skills", newSkill, setNewSkill, suggestedSkills)}

      {/* Experience Section */}
      <div className="space-y-2">
        <Label htmlFor="experience">Previous Experience (if any)</Label>
        <Textarea
          id="experience"
          value={data.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          placeholder="Describe any internships, part-time jobs, freelance work, or relevant experience..."
          rows={4}
        />
      </div>

      {/* Projects Section */}
      <div className="space-y-2">
        <Label htmlFor="projects">Projects & Achievements</Label>
        <Textarea
          id="projects"
          value={data.projects}
          onChange={(e) => handleInputChange("projects", e.target.value)}
          placeholder="Describe any projects, competitions, certifications, or achievements..."
          rows={4}
        />
      </div>

      {renderSection(
        "Areas of Interest",
        "an area of interest",
        "interests",
        newInterest,
        setNewInterest,
        suggestedInterests
      )}

      {renderSection(
        "Preferred Locations",
        "a location",
        "preferredLocations",
        newLocation,
        setNewLocation,
        suggestedLocations
      )}

      <div className="text-sm text-gray-600">
        <p>* Required fields</p>
      </div>
    </div>
  )
}
