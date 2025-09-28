import { Card } from "@/components/ui/card"
import { Briefcase, IndianRupee, Award, Target } from "lucide-react"
import Image from "next/image"

export function BenefitsSection() {
  return (
    <div className="space-y-6 rounded-2xl p-6" style={{ backgroundColor: '#f7f8fc' }}>
      <h2 className="text-3xl font-manrope font-bold text-gray-800">
        Core Benefits <span className="text-orange-500">for PM Internship Scheme</span>
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Real-life Experience */}
        <Card className="p-6" style={{backgroundColor: '#eceef6'}}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/5.svg" alt="Digital India" width={90} height={90} />
            <div>
              <p className="font-manrope">12 months real-life experience in India's top companies</p>
            </div>
          </div>
        </Card>

        {/* Monthly Assistance */}
        <Card className="p-6" style={{backgroundColor: '#eceef6'}}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/6.svg" alt="Digital India" width={90} height={90} />
            <div>
              <p className="font-manrope">Monthly assistance of ₹4500 by Government of India and ₹500 by Industry</p>
            </div>
          </div>
        </Card>

        {/* One-time Grant */}
        <Card className="p-6" style={{backgroundColor: '#eceef6'}}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/7.svg" alt="Digital India" width={90} height={90} />
            <div>
              <p className="font-manrope">One-time Grant of ₹6000 for incidentals</p>
            </div>
          </div>
        </Card>

        {/* Sector Selection */}
        <Card className="p-6" style={{backgroundColor: '#eceef6'}}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/8.svg" alt="Digital India" width={90} height={90} />
            <div>
              <p className="font-manrope">Select from Various Sectors and from top Companies of India</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
