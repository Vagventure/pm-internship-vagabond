import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import Image from "next/image";

export function EligibilitySection() {
  return (
    <div
      className="space-y-6 rounded-2xl p-6"
      style={{ backgroundColor: "#f7f8fc" }}
    >
      <h2 className="text-3xl font-manrope font-bold text-gray-800">
        Are you <span className="text-orange-500">Eligible ?</span>
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Age Card */}
        <Card className="p-6" style={{ backgroundColor: "#eceef6" }}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/1.svg" alt="Digital India" width={90} height={90} />
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">
                Age
              </h3>
              <p className="font-manrope">21-24 Years</p>
            </div>
          </div>
        </Card>

        {/* Job Status Card */}
        <Card className="p-6" style={{ backgroundColor: "#eceef6" }}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/2.svg" alt="Digital India" width={90} height={90} />
            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">
                Job Status
              </h3>
              <p className="font-manrope">Not Employed Full Time</p>
            </div>
          </div>
        </Card>

        {/* Education Card */}
        <Card className="p-6" style={{ backgroundColor: "#eceef6" }}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/3.svg" alt="Digital India" width={90} height={90} />

            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">
                Education
              </h3>
              <p className="font-manrope">Not Enrolled Full Time</p>
            </div>
          </div>
        </Card>

        {/* Family Income Card */}
        <Card className="p-6" style={{ backgroundColor: "#eceef6" }}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src="/4.svg" alt="Digital India" width={90} height={90} />

            <div>
              <h3 className="text-xl font-manrope font-semibold text-orange-500 mb-2">
                Family (Self/ Spouse / Parents)
              </h3>
              <div className="text-sm font-manrope space-y-1">
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
  );
}
