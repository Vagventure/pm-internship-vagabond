import { Youtube, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white font-manrope">
      {/* Partner Organizations Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-16">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-32 h-16 bg-blue-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">CII</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-32 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  <span className="text-orange-500">F</span>
                  <span className="text-green-600">I</span>
                  <span className="text-orange-500">C</span>
                  <span className="text-green-600">C</span>
                  <span className="text-orange-500">I</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Government Logos & Social Media */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-white p-3 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-900 rounded-full"></div>
                    <div>
                      <div className="text-xs text-gray-600 font-semibold">MINISTRY OF</div>
                      <div className="text-xs text-gray-600 font-semibold">CORPORATE AFFAIRS</div>
                      <div className="text-xs text-blue-600">GOVERNMENT OF INDIA</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-sm">BISAG-N</div>
                    <div className="text-blue-600 font-bold text-sm">MeitY</div>
                    <div className="text-xs text-gray-600">Empowering India Digitally</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Social Media</h3>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">X</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Get to Know */}
            <div>
              <h3 className="font-semibold mb-4">Get to Know</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Partner Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Manuals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us & Download App */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Contact Us</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      A Wing, 5th Floor, Shastri Bhawan, Dr
                      <br />
                      Rajendra Prasad Rd, New Delhi-110001
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span>pminternship[at]mca.gov.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-lg font-semibold">1800 11 6090</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Download Mobile App</h3>
                <p className="text-sm mb-4">
                  Click the button below to download the app or scan the QR code with your phone.
                </p>
                <div className="flex items-center gap-4">
                  <div className="bg-black rounded-lg p-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded"></div>
                    <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-orange-500 rounded flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded grid grid-cols-3 gap-px p-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-black rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Build Info & Stats */}
            <div className="space-y-6">
              <div className="text-sm">
                <div className="mb-2">Build Version: 175855885355</div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-center font-semibold">
                  4,16,15,476 <span className="text-xs">Total Visitors</span>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <div>
                  This site is owned by <strong>Ministry of Corporate Affairs.</strong>
                </div>
                <div>
                  © 2025 <strong>PM-INTERNSHIP</strong>, All Rights Reserved.
                </div>
                <div>
                  Technical collaboration with <strong>BISAG-N</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
