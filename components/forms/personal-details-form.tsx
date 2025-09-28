"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface PersonalDetailsData {
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

interface PersonalDetailsFormProps {
  data: PersonalDetailsData
  onUpdate: (data: Partial<PersonalDetailsData>) => void
}

export function PersonalDetailsForm({ data, onUpdate }: PersonalDetailsFormProps) {
  const handleInputChange = (field: keyof PersonalDetailsData, value: string) => {
    onUpdate({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          required
          className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={data.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter your complete address"
          rows={3}
          required
          className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter your city"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            placeholder="Enter your state"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input
            id="pincode"
            value={data.pincode}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            placeholder="Enter pincode"
            required
            className={`border-orange-500 focus:ring-orange-500 ${manrope.className}`}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>* Required fields</p>
      </div>
    </div>
  )
}
