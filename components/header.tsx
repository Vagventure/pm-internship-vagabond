"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, User, LogIn, Loader } from "lucide-react"
import Image from "next/image"
import { LoginModal } from "./login-modal"
import { RegistorModal } from "./registor-model"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
<<<<<<< HEAD
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  UserRoundPlus,
  CircleUserRound,
} from "lucide-react";
import Image from "next/image";
import { LoginModal } from "./login-modal";
import { RiHome9Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { FiVideo } from "react-icons/fi";
import { TbDeviceMobile } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { FaReadme } from "react-icons/fa6";
import { LanguageSelect } from "./languageSelect";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
=======
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
>>>>>>> 7c57821 (Fixed login/register + OTP functionality, updated files from local working copy)

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegistorModalOpen, setIsRegistorModalOpen] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()
  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase()

  const navItems = [
<<<<<<< HEAD
    {
      label: "HOME",
      href: "/",
      active: true,
      icon: <RiHome9Fill className="w-5 h-5 mr-1" />,
    },
    {
      label: "RECOMMENDATIONS",
      href: "#internship-recommendations",
      icon: <IoNewspaper className="w-5 h-5 mr-1" />,
    },
    {
      label: "GALLERY",
      href: "#gallery",
      icon: <FiVideo className="w-5 h-5 mr-1" />,
    },
    {
      label: "MOBILE APP",
      href: "#mobile",
      icon: <TbDeviceMobile className="w-5 h-5 mr-1" />,
    },
    {
      label: "SUPPORT",
      href: "#support",
      icon: <MdSupportAgent className="w-5 h-5 mr-1" />,
    },
    // {
    //   label: "COMPENDIUM",
    //   href: "/compendium",
    //   icon: <FaReadme className="w-5 h-5 mr-1" />,
    // },
  ];

  return (
    <>
      <div className="sticky top-0 w-full z-100 py-1 bg-white/70 backdrop-blur-sm">
        {/* Top Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/head1.svg"
                alt="Digital India"
                width={120}
                height={120}
              />
              <Image
                src="/head2.svg"
                alt="Digital India"
                width={120}
                height={120}
              />
            </div>
            <div className="flex items-center gap-3">
              {/* <Button className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]">
                <UserRoundPlus size={36} />
                Youth Registration
              </Button>
              <Button className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]">
                <CircleUserRound size={36} />
                Login
              </Button>
 */}
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]">
                    <UserRoundPlus size={36} />
                    Youth Registration
                  </Button>
                </SignUpButton>

                <SignInButton mode="modal">
                  <Button className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]">
                    <CircleUserRound size={36} />
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>

              <div className="ml-4">
                <Image
                  src="/digital-india-logo.png"
                  alt="Digital India"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
=======
    { label: "HOME", href: "/", active: true },
    { label: "GUIDELINES/DOCUMENTATIONS", href: "/guidelines", hasDropdown: true },
    { label: "GALLERY", href: "/gallery" },
    { label: "ELIGIBILITY", href: "/eligibility" },
    { label: "MOBILE APP", href: "/mobile-app" },
    { label: "SUPPORT", href: "/support", hasDropdown: true },
    { label: "COMPENDIUM", href: "/compendium" },
  ]

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <>
      <div className="bg-white">
        {/* Top Header */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left side logos */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GOI</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-blue-900">MINISTRY OF</div>
                    <div className="font-semibold text-blue-900">CORPORATE AFFAIRS</div>
                    <div className="text-xs text-gray-600">GOVERNMENT OF INDIA</div>
                  </div>
                </div>
                <div className="ml-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PM</span>
                    </div>
                    <div>
                      <div className="font-manrope-400 text-orange-500 text-lg">Internship</div>
                      <div className="font-manrope-400 text-xs text-gray-600">SCHEME FOR YOUTH</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side auth section */}
              <div className="flex items-center gap-3">
                {status === "loading" ? (
                  <Loader className="w-6 h-6 animate-spin text-orange-500" />
                ) : session ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="outline-none">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <span className="font-medium">{session.user?.name}</span>
                        <Avatar className="size-10 hover:opacity-75 transition">
                          <AvatarImage src={session.user?.image || undefined} />
                          <AvatarFallback className="bg-sky-900 text-white">
                            {avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleSignOut}>
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 font-manrope-400"
                      onClick={() => setIsRegistorModalOpen(true)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Youth Registration
                    </Button>
                    <Button
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 bg-transparent font-manrope-400"
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </>
                )}
                <div className="ml-4">
                  <Image
                    src="/digital-india-logo.png"
                    alt="Digital India"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
>>>>>>> 7c57821 (Fixed login/register + OTP functionality, updated files from local working copy)
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
<<<<<<< HEAD
        <nav className="bg-slate-800 text-white mx-6 mb-1 rounded-sm">
          <div className="container mx-auto px-4 flex justify-between">
            <div className="flex items-center gap-10">
=======
        <nav className="bg-slate-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
>>>>>>> 7c57821 (Fixed login/register + OTP functionality, updated files from local working copy)
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-4 text-sm font-khand-600 hover:bg-slate-700 transition-colors ${
                      item.active ? "bg-slate-700" : ""
                    }`}
                  >
                    {item.label}
<<<<<<< HEAD
=======
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
>>>>>>> 7c57821 (Fixed login/register + OTP functionality, updated files from local working copy)
                  </a>
                </div>
              ))}
            </div>
            <LanguageSelect />
          </div>
        </nav>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegistorModal isOpen={isRegistorModalOpen} onClose={() => setIsRegistorModalOpen(false)} />
    </>
  )
}
