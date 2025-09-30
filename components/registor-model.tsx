"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, User, Key, Eye, EyeOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";


interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RegistorModal({ isOpen, onClose }: LoginModalProps) {
    const [showOtp, setShowOtp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [pending, setPending] = useState(false)
    // const [email, setEmail] = useState(false)
    const [error, setError] = useState("")
    const [value, setValue] = useState("");
    const searchParams = useSearchParams();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // const email = searchParams.get("email");

    if (!isOpen) return null

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })

        const data = await res.json();
        if (res.ok) {
            console.log("Sign up success")
            toast.success(data.message)
            setPending(false)
            // setShowOtp(true)
            onClose();
            // router.push(`/verify`)
           
        } else if (res.status === 400) {
            toast.error(data.message)
            setError(data.message);
            setPending(false);
        } else if (res.status == 409) {
            toast.error(data.message)
            router.push("/sign-in")
        } else if (res.status === 500) {
            setError(data.message);
            setPending(false);
        }

    }

    const handleSubmitOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        console.log("This is your email : ", form.email)
    
        const res = await fetch("/api/auth/verifyUser", {
          method: "POST",
          headers: { "Content-type": "application-json" },
          body: JSON.stringify({
            verifyCode: value,
            email: decodeURIComponent(form.email)
          }),
        });
    
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
          onClose();
        } else if (res.status == 409) {
          toast.success(data.message);
          router.push("/sign-in");
        } else {
          toast.error(data.message);
          setValue("");
          setPending(false);
        }
      };

    const handleResendOtp = async () => {
        setPending(true);
        const res = await fetch("/api/resendOtp", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ email: decodeURIComponent(form.email as string) }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success(data.message);
            setPending(false);
        } else {
            toast.error(data.message);
            setPending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center mt-24 z-50 p-4">
            {!showOtp ? (<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#1d293d] mb-2">Registor</h2>
                    <p className="text-gray-600 font-manrope-400">Registor using Email / Mobile / CIN</p>
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
                            placeholder="Enter Username"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="pl-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter Email / Phone Number"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
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


                    {/* Confirm Password field */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Key className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
                        className="w-full bg-[#1d293d] hover:bg-[#161f2e] text-white py-3 text-base font-semibold rounded-lg font-manrope-400"
                    >
                        Registor
                    </Button>
                </form>

                {/* Forgot password link */}
                <div className="mt-6 text-center">
                    <button className="text-gray-600 hover:text-gray-800 underline text-sm">Forgot / Reset Password</button>
                </div>

                {/* Notes */}
                <div className="mt-8 space-y-4 text-sm text-gray-600">
                    <p className="font-manrope-400">
                        <strong>Note:</strong> User ID and One Time Password have been sent to the email address you provided.
                        Please use them to log in to your account.
                    </p>
                    
                </div>
            </div>) : (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white/95 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#1d293d] mb-2">VERIFY EMAIL</h2>
                            <p className="text-gray-600">
                                Enter the one-time password sent to your email.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmitOtp} className="space-y-6">
                            <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value) => setValue(value)}
                            >
                                <InputOTPGroup className="mx-auto space-x-2">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <Button
                                type="submit"
                                disabled={pending}
                                className="w-full bg-[#1d293d] hover:bg-[#141c2a] text-white py-3 text-base font-semibold rounded-lg"
                            >
                                Submit
                            </Button>
                        </form>

                        {/* Resend code and additional info */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleResendOtp}
                                disabled={pending}
                                className="text-gray-600 hover:text-gray-800 underline text-sm"
                            >
                                Resend code
                            </button>
                        </div>
                        <div className="mt-8 space-y-4 text-sm text-gray-600 text-center">
                            <p>
                                This code will expire in 5 minutes.
                                <p>If you didn't order this code, you may ignore it.</p>
                            </p>
                        </div>
                    </div>
                </div>)}

        </div>
    )
}
