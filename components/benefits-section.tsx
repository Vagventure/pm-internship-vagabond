import { Card } from "@/components/ui/card"
import { Briefcase, IndianRupee, Award, Target } from "lucide-react"

export function BenefitsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-manrope font-bold text-gray-800">
        Core Benefits <span className="text-orange-500">for PM Internship</span>
      </h2>
      <h3 className="text-3xl font-manrope font-bold text-orange-500">Scheme</h3>

      <div className="grid gap-6">
        {/* Real-life Experience */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-manrope font-semibold text-gray-800 mb-2">
                12 months real-life experience in India's top companies
              </h3>
            </div>
          </div>
        </Card>

        {/* Monthly Assistance */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-manrope font-semibold text-gray-800 mb-2">
                Monthly assistance of ₹4500 by Government of India and ₹500 by Industry
              </h3>
            </div>
          </div>
        </Card>

        {/* One-time Grant */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-manrope font-semibold text-gray-800 mb-2">
                One-time Grant of ₹6000 for incidentals
              </h3>
            </div>
          </div>
        </Card>

        {/* Sector Selection */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-manrope font-semibold text-gray-800 mb-2">
                Select from Various Sectors and from top Companies of India
              </h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
