import { cn } from "@/lib/utils";
import Image from "next/image";

export function DownloadHero({ className }: { className?: string }) {
  return (
    <section id="mobile" aria-labelledby="download-heading">
      <div
        className={cn(
          "pmis-theme relative overflow-hidden",
          // layout
          "m-4 md:m-4 rounded-[20px] ring-1 ring-ring/15",
          className
        )}
      >
        <div className="container mx-auto px-20 py-4 md:py-8 lg:py-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Left content */}
            <div className="space-y-6">
              <header>
                <h1
                  id="download-heading"
                  className="font-khand-700 text-pretty font-display text-4xl leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-7xl"
                >
                  Download PMIS
                </h1>
                <p className="font-manrope mt-4 text-2xl font-bold text-primary-foreground/90">
                  Mobile Application
                </p>
              </header>

              <p className="text-white font-manrope max-w-2xl text-base leading-relaxed">
                Register, complete your profile, explore and apply for paid
                internships in top companies of India seamlessly.
              </p>

              <div className="flex items-center align-middle gap-6">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="inline-flex"
                >
                  <Image
                    src="/googleplay.png"
                    alt="Get it on Google Play"
                    width={300}
                    height={80}
                    className="rounded-md"
                  />
                </a>
                <Image
                  src="/scanner.png"
                  alt="QR code to download the app"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Right visual */}
            <div className="relative mx-auto w-full max-w-[700px]">
              <div className="pointer-events-none relative">
                <Image
                  src="/phone.png"
                  alt="Phone"
                  width={1200}
                  height={1200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadHero;
