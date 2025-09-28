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

  const handleInputChange = (field: keyof SkillsExperienceData, value: string) => {
    onUpdate({ [field]: value })
  }

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      onUpdate({ skills: [...data.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onUpdate({ skills: data.skills.filter((skill) => skill !== skillToRemove) })
  }

  const addInterest = () => {
    if (newInterest.trim() && !data.interests.includes(newInterest.trim())) {
      onUpdate({ interests: [...data.interests, newInterest.trim()] })
      setNewInterest("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    onUpdate({ interests: data.interests.filter((interest) => interest !== interestToRemove) })
  }

  const addLocation = () => {
    if (newLocation.trim() && !data.preferredLocations.includes(newLocation.trim())) {
      onUpdate({ preferredLocations: [...data.preferredLocations, newLocation.trim()] })
      setNewLocation("")
    }
  }

  const removeLocation = (locationToRemove: string) => {
    onUpdate({ preferredLocations: data.preferredLocations.filter((location) => location !== locationToRemove) })
  }

  const suggestedSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "HTML/CSS",
    "SQL",
    "Git",
    "Communication",
    "Leadership",
    "Problem Solving",
    "Team Work",
    "Project Management",
    "Data Analysis",
    "Digital Marketing",
    "Content Writing",
    "Graphic Design",
  ]

  const suggestedInterests = [
    "Technology",
    "Finance",
    "Marketing",
    "Design",
    "Data Science",
    "Artificial Intelligence",
    "Startups",
    "Consulting",
    "Research",
    "Social Impact",
    "Healthcare",
    "Education",
  ]

  const suggestedLocations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Gurgaon",
    "Noida",
    "Remote",
    "Any Location",
  ]

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <Label>Technical & Soft Skills *</Label>
          <p className="text-sm text-gray-600 mb-2">Add skills that you possess or are learning</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-2">Suggested skills:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter((skill) => !data.skills.includes(skill))
              .slice(0, 10)
              .map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => onUpdate({ skills: [...data.skills, skill] })}
                >
                  + {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>

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

      {/* Interests Section */}
      <div className="space-y-4">
        <div>
          <Label>Areas of Interest *</Label>
          <p className="text-sm text-gray-600 mb-2">What fields or industries interest you?</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Enter an area of interest"
            onKeyPress={(e) => e.key === "Enter" && addInterest()}
          />
          <Button type="button" onClick={addInterest} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {data.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                {interest}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeInterest(interest)} />
              </Badge>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-2">Suggested interests:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedInterests
              .filter((interest) => !data.interests.includes(interest))
              .slice(0, 8)
              .map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => onUpdate({ interests: [...data.interests, interest] })}
                >
                  + {interest}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      {/* Preferred Locations Section */}
      <div className="space-y-4">
        <div>
          <Label>Preferred Locations *</Label>
          <p className="text-sm text-gray-600 mb-2">Where would you like to do your internship?</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter a city or 'Remote'"
            onKeyPress={(e) => e.key === "Enter" && addLocation()}
          />
          <Button type="button" onClick={addLocation} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {data.preferredLocations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.preferredLocations.map((location) => (
              <Badge key={location} variant="secondary" className="flex items-center gap-1">
                {location}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeLocation(location)} />
              </Badge>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-2">Popular locations:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedLocations
              .filter((location) => !data.preferredLocations.includes(location))
              .slice(0, 8)
              .map((location) => (
                <Badge
                  key={location}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => onUpdate({ preferredLocations: [...data.preferredLocations, location] })}
                >
                  + {location}
                </Badge>
              ))}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>* Required fields</p>
      </div>
    </div>
  )
}
