"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from '@/components/ui/button'
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const searchParams = useSearchParams();
  const router = useRouter()
  
  const email = searchParams.get("email");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true)

    const res = await fetch("/api/auth/verifyUser", {
      method: "POST",
      headers: { "Content-type": "application-json" },
      body: JSON.stringify({
        verifyCode:value,
        email:decodeURIComponent(email as string)
      })
    })

    const data = await res.json()
    if (res.ok) {
      toast.success(data.message)
      router.push("/sign-in")
    }else if(res.status==409){
      toast.success(data.message)
      router.push("/sign-in")
    }else {
      console.log(data.message)
      toast.error(data.message)
      setValue("")
      setPending(false)
    }
  }

  const handleResendOtp = async()=>{
    setPending(true)
  const res = await fetch("/api/resendOtp",{
    method: "POST",
    headers: {"Content-Type":"application-json"},
    body: JSON.stringify({email:decodeURIComponent(email as string)})
  })

  const data = await res.json()
  if(res.ok){
    toast.success(data.message)
    setPending(false)
  }else{
    toast.error(data.message)
    setPending(false)
  }
  }

  return (
    <div className="w-screen h-screen flex items-center">
      <Card className="h-80 w-80 mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-lg">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            Enter the one-time password sent to your email to proceed further
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-1">
          <form onSubmit={handleSubmit} className="p-2 space-y-2 m-auto">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="m-auto">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">
              {value === "" ? (
                <>Enter your one-time password.</>
              ) : (
                <>You entered: {value}</>
              )}
            </div>
            <Button className="w-full" disabled={pending}>Submit</Button>
          </form>
          <button onClick={handleResendOtp} disabled={pending} className="text-sm mx-auto text-sky-500 hover:underline">Resend code</button>
          <p className="text-[12px] text-center">If you didn't order this code, you may ignore it.</p>
        </CardContent>
      </Card>

    </div>

  )
}
