"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Building, Star, ExternalLink, Bookmark } from "lucide-react"

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

interface Internship {
  id: string
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  description: string
  requirements: string[]
  skills: string[]
  type: string
  rating: number
  applicants: number
  matchScore: number
}

interface InternshipRecommendationsProps {
  formData: FormData
}

export function InternshipRecommendations({ formData }: InternshipRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [savedInternships, setSavedInternships] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate API call to get recommendations
    const generateRecommendations = () => {
      setLoading(true)

      // Mock internship data - in real app, this would come from an API
      const mockInternships: Internship[] = [
        {
          id: "1",
          title: "Software Development Intern",
          company: "TechCorp India",
          location: "Bangalore",
          duration: "6 months",
          stipend: "₹25,000/month",
          description:
            "Work on cutting-edge web applications using React and Node.js. Gain hands-on experience in full-stack development.",
          requirements: [
            "Currently pursuing Computer Science",
            "Basic knowledge of JavaScript",
            "Problem-solving skills",
          ],
          skills: ["JavaScript", "React", "Node.js", "Git"],
          type: "Technology",
          rating: 4.5,
          applicants: 150,
          matchScore: 95,
        },
        {
          id: "2",
          title: "Digital Marketing Intern",
          company: "Marketing Solutions Ltd",
          location: "Mumbai",
          duration: "4 months",
          stipend: "₹18,000/month",
          description:
            "Learn digital marketing strategies, social media management, and content creation for various clients.",
          requirements: ["Good communication skills", "Creative thinking", "Basic understanding of social media"],
          skills: ["Digital Marketing", "Content Writing", "Social Media"],
          type: "Marketing",
          rating: 4.2,
          applicants: 89,
          matchScore: 88,
        },
        {
          id: "3",
          title: "Data Science Intern",
          company: "Analytics Pro",
          location: "Hyderabad",
          duration: "5 months",
          stipend: "₹22,000/month",
          description:
            "Work with large datasets, create visualizations, and build predictive models using Python and machine learning.",
          requirements: ["Statistics background", "Python programming", "Analytical mindset"],
          skills: ["Python", "Data Analysis", "Machine Learning", "SQL"],
          type: "Technology",
          rating: 4.7,
          applicants: 200,
          matchScore: 82,
        },
        {
          id: "4",
          title: "UI/UX Design Intern",
          company: "Design Studio",
          location: "Delhi",
          duration: "3 months",
          stipend: "₹20,000/month",
          description:
            "Create user interfaces and experiences for mobile and web applications. Work with design tools and user research.",
          requirements: ["Design portfolio", "Creativity", "Basic knowledge of design tools"],
          skills: ["Graphic Design", "UI/UX", "Figma", "Adobe Creative Suite"],
          type: "Design",
          rating: 4.4,
          applicants: 120,
          matchScore: 78,
        },
        {
          id: "5",
          title: "Finance Analyst Intern",
          company: "Financial Services Inc",
          location: "Mumbai",
          duration: "6 months",
          stipend: "₹24,000/month",
          description:
            "Assist in financial analysis, market research, and investment recommendations. Learn about financial markets.",
          requirements: ["Commerce/Finance background", "Excel proficiency", "Analytical skills"],
          skills: ["Finance", "Excel", "Data Analysis", "Research"],
          type: "Finance",
          rating: 4.3,
          applicants: 95,
          matchScore: 75,
        },
      ]

      // Simple matching algorithm based on user data
      const matchedInternships = mockInternships
        .map((internship) => {
          let score = 0

          // Match skills
          const userSkills = formData.skillsExperience.skills.map((s) => s.toLowerCase())
          const internshipSkills = internship.skills.map((s) => s.toLowerCase())
          const skillMatches = internshipSkills.filter((skill) =>
            userSkills.some((userSkill) => userSkill.includes(skill) || skill.includes(userSkill)),
          ).length
          score += (skillMatches / internshipSkills.length) * 40

          // Match interests
          const userInterests = formData.skillsExperience.interests.map((i) => i.toLowerCase())
          const typeMatch = userInterests.some(
            (interest) =>
              internship.type.toLowerCase().includes(interest) || interest.includes(internship.type.toLowerCase()),
          )
          if (typeMatch) score += 30

          // Match location
          const userLocations = formData.skillsExperience.preferredLocations.map((l) => l.toLowerCase())
          const locationMatch = userLocations.some(
            (location) =>
              location === "any location" ||
              location === "remote" ||
              internship.location.toLowerCase().includes(location) ||
              location.includes(internship.location.toLowerCase()),
          )
          if (locationMatch) score += 20

          // Education level bonus
          if (formData.education.currentLevel.includes("Bachelor's") && internship.type === "Technology") {
            score += 10
          }

          return { ...internship, matchScore: Math.min(Math.round(score), 100) }
        })
        .sort((a, b) => b.matchScore - a.matchScore)

      setTimeout(() => {
        setRecommendations(matchedInternships)
        setLoading(false)
      }, 2000)
    }

    generateRecommendations()
  }, [formData])

  const toggleSaveInternship = (internshipId: string) => {
    const newSaved = new Set(savedInternships)
    if (newSaved.has(internshipId)) {
      newSaved.delete(internshipId)
    } else {
      newSaved.add(internshipId)
    }
    setSavedInternships(newSaved)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Finding Perfect Internships for You</h3>
        <p className="text-gray-600">Analyzing your profile and matching with available opportunities...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Recommendations</h3>
        <p className="text-gray-600">
          Based on your profile, we found {recommendations.length} internships that match your skills and interests.
        </p>
      </div>

      <div className="grid gap-6">
        {recommendations.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{internship.title}</CardTitle>
                    <Badge
                      variant={
                        internship.matchScore >= 90 ? "default" : internship.matchScore >= 80 ? "secondary" : "outline"
                      }
                      className="ml-2"
                    >
                      {internship.matchScore}% Match
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{internship.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{internship.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{internship.rating}</span>
                    </div>
                    <span>{internship.applicants} applicants</span>
                    <span className="font-medium text-green-600">{internship.stipend}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSaveInternship(internship.id)}
                  className={savedInternships.has(internship.id) ? "text-blue-600" : "text-gray-400"}
                >
                  <Bookmark className={`w-4 h-4 ${savedInternships.has(internship.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{internship.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.skillsExperience.skills.includes(skill) ? "default" : "outline"}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {internship.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <Button variant="outline" size="lg">
          Load More Recommendations
        </Button>
      </div>
    </div>
  )
}
