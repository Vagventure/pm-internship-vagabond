"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowRight, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdCloudUpload } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import Image from "next/image";
import { useRef } from "react";
import UploadResumeButton from "./uploadResume";

export function ResumeUploadSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFromScratch = () => {
    router.push("/create-profile");
  };

  return (
    <section id="internship-recommendations" className="pt-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-4">
            Get Personalized Internship Recommendations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 bg-[#F7F8FC] rounded-lg">
          {/* Upload Resume Card */}
          <Card className="group bg-[#ECEEF6] m-5">
            <CardContent className="p-5 text-center">
              <Image
                src="/upload.png"
                alt="Upload"
                width={90}
                height={90}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                Upload Resume
              </h3>
              <p className="font-manrope mb-6">
                Already have a resume? Upload it and we'll automatically extract
                your information to find the best internship matches.
              </p>
                <UploadResumeButton/>
            </CardContent>
          </Card>

          {/* Create from Scratch Card */}
          <Card className="group bg-[#ECEEF6] m-5">
            <CardContent className="p-5 text-center">
              <Image
                src="/create.png"
                alt="create"
                width={90}
                height={90}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                Create from Scratch
              </h3>
              <p className="font-manrope mb-6">
                Don't have a resume yet? No problem! We'll guide you through
                creating your profile step by step.
              </p>
              <Button
                onClick={handleCreateFromScratch}
                className="w-full bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent font-manrope font-bold shadow-[0_4px_0_#c65b00]"
              >
                <FaFilePen />
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
