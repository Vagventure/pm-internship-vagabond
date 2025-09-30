"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdCloudUpload } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function ResumeUploadSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const handleCreateFromScratch = () => {
    router.push("/create-profile");
  };

  const handleUploadResume = () => {
    fileInputRef.current?.click();
  };

  const simulateUpload = (file: File) => {
    setUploadProgress(0);
    setUploadComplete(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          // toast.success("File uploaded successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      simulateUpload(file);
    }
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

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />

              {!uploadComplete && (
                <Button
                  onClick={handleUploadResume}
                  className="w-full bg-[#1D293D] hover:bg-[#111827] text-white px-6 border border-transparent font-manrope font-bold shadow-[0_4px_0_#000000]"
                >
                  <MdCloudUpload />
                  Upload Resume
                </Button>
              )}

              {fileName && (
                <div className="mt-4">
                  {!uploadComplete && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  {uploadComplete && (
                    <p className="text-green-600 mt-2 font-medium">
                      Upload complete!
                    </p>
                  )}
                </div>
              )}
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
