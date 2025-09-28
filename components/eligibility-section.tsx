import { Card } from "@/components/ui/card"
import { GraduationCap, Briefcase, Users } from "lucide-react"

export function EligibilitySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-manrope font-bold text-gray-800">
        Are you <span className="text-orange-500">Eligible</span> ?
      </h2>

      <div className="grid gap-6">
        {/* Age Card */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl font-manrope font-bold text-gray-800">21</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-manrope font-bold">+</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">Age</h3>
              <p className="text-gray-600 font-manrope">21-24 Years</p>
            </div>
          </div>
        </Card>

        {/* Job Status Card */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">Job Status</h3>
              <p className="text-gray-600 font-manrope">Not Employed Full Time</p>
            </div>
          </div>
        </Card>

        {/* Education Card */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">Education</h3>
              <p className="text-gray-600 font-manrope">Not Enrolled Full Time</p>
            </div>
          </div>
        </Card>

        {/* Family Income Card */}
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-yellow-400 rounded-lg flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">
                Family (Self/ Spouse / Parents)
              </h3>
              <div className="text-sm text-gray-600 font-manrope space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>No one is Earning more than ₹8 Lakhs PA</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>No Member has a Govt. Job</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
