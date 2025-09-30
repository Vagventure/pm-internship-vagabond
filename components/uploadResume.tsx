"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { MdCloudUpload } from "react-icons/md"

type UploadResumeButtonProps = {
  // Endpoint that receives the file (multipart/form-data, field name: "file")
  uploadUrl?: string
  // Optional extra form data to send along with the file
  additionalData?: Record<string, string>
  // Max size in MB (client-side check only)
  maxSizeMB?: number
  // Optional className for the button
  className?: string
  // Callback after successful upload
  onUploaded?: (response: any) => void
  // Button label
  label?: string
}

export function UploadResumeButton({
  uploadUrl = "http://localhost:8000/upload",
  additionalData,
  maxSizeMB = 10,
  className,
  onUploaded,
  label = "Upload Resume",
}: UploadResumeButtonProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const { toast } = useToast()

  const onPickFile = () => {
    inputRef.current?.click()
  }

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // allow selecting the same file twice
    e.target.value = ""

    if (!file) return

    // Simple client-side validation
    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ])
    const allowedExtensions = [".pdf", ".doc", ".docx"]
    const hasAllowedExt = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))

    if (!allowedTypes.has(file.type) && !hasAllowedExt) {
      toast({
        title: "Unsupported file",
        description: "Please upload a PDF or Word document (.pdf, .doc, .docx).",
        variant: "destructive",
      })
      return
    }

    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      toast({
        title: "File too large",
        description: `Maximum allowed size is ${maxSizeMB}MB.`,
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)

      const form = new FormData()
      form.append("file", file)
      if (additionalData) {
        for (const [k, v] of Object.entries(additionalData)) {
          form.append(k, v)
        }
      }

      const res = await fetch(uploadUrl, {
        method: "POST",
        body: form,
        // For cross-origin backend; ensure your server allows CORS
        mode: "cors",
      })

      const isJson = res.headers.get("content-type")?.includes("application/json") ?? false
      const payload = isJson ? await res.json() : await res.text()

      if (!res.ok) {
        throw new Error(typeof payload === "string" ? payload : payload?.error || "Upload failed")
      }

      toast({
        title: "Upload complete",
        description: "Your resume has been uploaded successfully.",
      })
      onUploaded?.(payload)
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onFileSelected}
      />
      <Button type="button" onClick={onPickFile} disabled={isUploading} aria-busy={isUploading} className="w-full bg-[#1D293D] hover:bg-[#111827] text-white px-6 border border-transparent font-manrope font-bold shadow-[0_4px_0_#000000]">
        <MdCloudUpload />
        {isUploading ? "Uploading..." : label}
      </Button>
    </div>
  )
}

export default UploadResumeButton
