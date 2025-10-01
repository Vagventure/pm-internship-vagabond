"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, User, Key, Eye, EyeOff } from "lucide-react"
import { signIn } from 'next-auth/react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaXbox } from "react-icons/fa";


interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const router = useRouter();
  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true)
    console.log(userEmail, "-------", password)
    const res = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password
    })
    if (res?.ok) {
      // router.push("/")
      console.log("1")
      toast.success("Login successfull")
      onClose()
      router.push("/create-profile")
    } else if (res?.status == 401) {
      setPending(false)
      console.log("2")
      toast.error("Error logging in")
      setError("Invalid Credentials")
    } else {
      setError("Something went wrong")
      toast.error("Error logging in2")
      console.log("3")

    }

  }

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" })

  }

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-100 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1d293d] mb-2">LOGIN</h2>
          <p className="text-gray-600 font-manrope-400">Login using Email / Mobile / CIN</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Enter Email / Mobile / CIN"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="pl-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Key className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-[#1d293d] hover:bg-[#141c2a] text-white py-3 text-base font-semibold rounded-lg font-manrope-400"
          >
            Login
          </Button>
        </form>

        {/* Forgot password link */}
        <div className="mt-6 text-center">
          <button className="text-gray-600 hover:text-gray-800 underline text-sm">Forgot / Reset Password</button>
        </div>


        <div className="flex flex-col items-center mt-1.5">
          <span>or</span>
          <div className='flex justify-evenly my-3'>
            <Button
              disabled={pending}
              onClick={(e) => handleProvider(e, "google")}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            ><FcGoogle className="mx-13 size-7" />
            </Button>

            <Button
              disabled={pending}
              onClick={(e) => handleProvider(e, "github")}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
            ><FaGithub className="mx-13 size-7" />
            </Button>

          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 space-y-4 text-sm text-gray-600">
          <p className="font-manrope-400">
            <strong>Note:</strong> User ID and One Time Password have been sent to the email address you provided.
            Please use them to log in to your account.
          </p>
          <p className="font-manrope-400">
            <strong>Note:</strong> Your account will be blocked for 15 minutes if you enter incorrect password in 3
            consecutive attempts. Please reset your password if your account is blocked.
          </p>
        </div>
      </div>
    </div>
  )
}
