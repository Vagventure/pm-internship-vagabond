"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Building,
  Star,
  ExternalLink,
  Bookmark,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  education: {
    currentLevel: string;
    institution: string;
    course: string;
    year: string;
    cgpa: string;
    percentage: string;
  };
  skillsExperience: {
    skills: string[];
    experience: string;
    projects: string;
    interests: string[];
    preferredLocations: string[];
  };
}

interface MLRecommendation {
  Role: string;
  "Company Name": string;
  Location_clean: string;
  Stipend: string;
  Duration: string;
  Skills_text: string;
  Match_Score: number;
  Match_Percentage: number;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  skills: string[];
  type: string;
  rating: number;
  applicants: number;
  matchScore: number;
}

interface InternshipRecommendationsProps {
  formData: FormData;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function InternshipRecommendations({
  formData,
}: InternshipRecommendationsProps) {
  const [allocation, setAllocation] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchAllocation();
  }, [formData]);

  const fetchAllocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const userSkills = formData.skillsExperience.skills.join(" ");
      const userLocation =
        formData.skillsExperience.preferredLocations.join(" ");
      const preferredDuration = 3;
      const preferredStipend = undefined;

      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: userSkills,
          location: userLocation,
          duration: preferredDuration,
          stipend: preferredStipend,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.allocation) {
        const rec = Array.isArray(data.allocation)
          ? data.allocation[0]
          : data.allocation;

        const transformedInternship: Internship = {
          id: "ml-allocated",
          title: rec.Role,
          company: rec["Company Name"],
          location: rec.Location_clean,
          duration: rec.Duration,
          stipend: rec.Stipend,
          description: `Join ${rec["Company Name"]} for an exciting ${rec.Role} opportunity.`,
          requirements: ["View details for specific requirements"],
          skills: rec.Skills_text ? rec.Skills_text.split(" ").slice(0, 8) : [],
          type:
            rec.Role.includes("Technology") || rec.Role.includes("Software")
              ? "Technology"
              : "General",
          rating: 4.0 + rec.Match_Percentage / 100,
          applicants: Math.floor(Math.random() * 200) + 50,
          matchScore: Math.round(rec.Match_Percentage),
        };

        setAllocation(transformedInternship);
      } else {
        throw new Error(data.error || "Failed to get internship allocation");
      }
    } catch (err) {
      console.error("Error fetching allocation:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch internship allocation. Please make sure the backend server is running."
      );
      setAllocation(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Finding Your Perfect Internship Match
        </h3>
        <p className="text-gray-600">
          Analyzing your profile with our ML model...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error loading allocation:</strong> {error}
            <br />
            <span className="text-sm mt-2 block">
              Make sure the Flask backend is running on {API_BASE_URL}
            </span>
          </AlertDescription>
        </Alert>
        <div className="text-center mt-6">
          <Button onClick={fetchAllocation}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!allocation) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No allocation found
        </h3>
        <p className="text-gray-600">
          Unable to find a matching internship. Please try again or update your
          profile.
        </p>
        <Button onClick={fetchAllocation} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Your Allocated Internship
        </h3>
        <p className="text-gray-600">
          Based on your profile, we've found your best matching internship using
          machine learning.
        </p>
      </div>

      <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">{allocation.title}</CardTitle>
                <Badge
                  variant={
                    allocation.matchScore >= 90
                      ? "default"
                      : allocation.matchScore >= 80
                      ? "secondary"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {allocation.matchScore}% Match
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{allocation.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{allocation.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{allocation.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{allocation.rating.toFixed(1)}</span>
                </div>
                <span>{allocation.applicants} applicants</span>
                <span className="font-medium text-green-600">
                  {allocation.stipend}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSave}
              className={isSaved ? "text-blue-600" : "text-gray-400"}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{allocation.description}</p>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Required Skills:
              </h4>
              <div className="flex flex-wrap gap-2">
                {allocation.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant={
                      formData.skillsExperience.skills.some(
                        (s) =>
                          s.toLowerCase().includes(skill.toLowerCase()) ||
                          skill.toLowerCase().includes(s.toLowerCase())
                      )
                        ? "default"
                        : "outline"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {allocation.requirements.map((req, index) => (
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
              Accept & Apply
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
