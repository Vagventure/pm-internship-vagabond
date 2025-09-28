"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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

    // Fake upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          toast.success("File uploaded successfully");
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-4">
            Get Personalized Internship Recommendations
          </h2>
          <p className="text-lg text-gray-600 font-manrope max-w-2xl mx-auto">
            Choose how you'd like to create your profile and discover internships that match your skills and interests
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Upload Resume Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                {uploadComplete ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <Upload className="w-8 h-8 text-orange-600" />
                )}
              </div>

              <h3 className="text-xl font-manrope font-semibold text-gray-900 mb-4">
                Upload Resume
              </h3>
              <p className="text-gray-600 font-manrope mb-6">
                Already have a resume? Upload it and we'll automatically extract your information to find the best
                internship matches.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
             {!uploadComplete && <Button
                onClick={handleUploadResume}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >Upload File <ArrowRight className="w-4 h-4 ml-2" /></Button>
               }
             
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
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-manrope font-semibold text-gray-900 mb-4">
                Create from Scratch
              </h3>
              <p className="text-gray-600 font-manrope mb-6">
                Don't have a resume yet? No problem! We'll guide you through creating your profile step by step.
              </p>
              <Button
                onClick={handleCreateFromScratch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
