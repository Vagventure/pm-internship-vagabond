"use client"
import React, { useState } from 'react';
import { Mail, Lock, KeyRound, Shield, ArrowRight, RefreshCw, Eye, EyeOff } from 'lucide-react';

import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const PasswordResetPage = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpass, setConfirmpass] = useState<string>("");
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [pending, setPending] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        const res = await fetch("/api/resendOtp", {
            method: 'POST',
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ email, type: "VerifyIdentityEmail" })
        })
        const data = await res.json()
        if (res?.ok) {
            toast.success(data.message)
            setStep(2);
            setPending(false);
        } else if (res?.status == 401) {
            setPending(false)
            toast.error(data.message)
        } else {
            toast.error(data.message)
            setPending(false)
        }

    }

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        try {
            const res = await fetch("/api/auth/verifyOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    verifyCode: otp.join(""),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message);
                setStep(3);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setPending(false);
        }
    };



    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true)
        const res = await fetch("/api/auth/resetpassword", {
            method: 'POST',
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                password,
                confirmPassword: confirmpass,
                email
            })
        })
        const data = await res.json()
        if (res?.ok) {
            toast.success(data.message)
            router.push("/")
        } else if (res?.status == 401) {
            setPending(false)
            toast.error(data.message)
        } else {
            toast.error(data.message)
            setPending(false)
        }

    }

    const handleResendOtp = async () => {
        setPending(true)
        const res = await fetch("/api/resendOtp", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({ email, type: "VerifyIdentityEmail" })
        })

        const data = await res.json()
        if (res.ok) {
            toast.success(data.message)
            setPending(false)
        } else {
            toast.error(data.message)
            setPending(false)
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

            <div className="w-full max-w-md relative z-10">
                {/* Progress Indicator */}
                <div className="mb-8 fade-in-up">
                    <div className="flex justify-between items-center mb-2 px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 1 ? 'bg-[#1d293d] text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'
                            }`}>
                            1
                        </div>
                        <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${step > 1 ? 'bg-[#1d293d] hover:bg-[#161f2e]' : 'bg-gray-200'
                            }`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 2 ? 'bg-[#1d293d] text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'
                            }`}>
                            2
                        </div>
                        <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${step > 2 ? 'bg-[#1d293d] hover:bg-[#161f2e]' : 'bg-gray-200'
                            }`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step >= 3 ? 'bg-[#1d293d] text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-200'
                            }`}>
                            3
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2 px-2">
                        <span>Email</span>
                        <span>Verify</span>
                        <span>Reset</span>
                    </div>
                </div>

                {/* Step 1: Email */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-95 fade-in-up border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Mail className="w-8 h-8 text-[#1d293d]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                            <p className="text-gray-600">Enter your email to receive a verification code</p>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit(e)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleEmailSubmit}
                                disabled={pending || !email}
                                className="w-full bg-[#1d293d] hover:bg-[#161f2e] text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <a href="/" className="text-sm text-gray-500 hover:underline font-medium">Back to home</a>
                        </div>
                    </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-95 fade-in-up border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-[#1d293d]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify It's You</h2>
                            <p className="text-gray-600">Enter the 6-digit code sent to</p>
                            <p className="text-gray-600 font-medium">{email}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-2 justify-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors bg-white"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleOtpSubmit}
                                disabled={pending || otp.join('').length !== 6}
                                className="w-full bg-[#1d293d] hover:bg-[#161f2e] text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700"
                            >
                                Verify Code <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-6 text-center space-y-2">
                            <button onClick={handleResendOtp} className="text-sm text-gray-600 hover:underline flex items-center gap-1 mx-auto font-medium">
                                <RefreshCw className="w-4 h-4" /> Resend code
                            </button>
                            <p className="text-xs text-gray-400">If you didn't request this code, you may ignore it.</p>
                        </div>
                    </div>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-95 fade-in-up border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <KeyRound className="w-8 h-8 text-[#1d293d]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Create New Password
                            </h2>
                            <p className="text-gray-600">
                                Choose a strong password to secure your account
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Password Field with Eye */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                            {/* Confirm Password Field with Eye */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmpass}
                                    onChange={(e) => setConfirmpass(e.target.value)}
                                    className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                <p className="text-sm text-gray-800 mb-2 font-medium">
                                    Password must contain:
                                </p>
                                <ul className="text-xs text-gray-700 space-y-1">
                                    <li>✓ At least 8 characters</li>
                                    <li>✓ One uppercase letter</li>
                                    <li>✓ One lowercase letter</li>
                                    <li>✓ One number</li>
                                </ul>
                            </div>

                            <button
                                onClick={handlePasswordSubmit}
                                disabled={pending || !password || !confirmpass}
                                className="w-full bg-[#1d293d] hover:bg-[#161f2e] text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700"
                            >
                                Reset Password <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordResetPage;