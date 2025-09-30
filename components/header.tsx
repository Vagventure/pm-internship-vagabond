"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
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

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = [
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
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-slate-800 text-white mx-6 mb-1 rounded-sm">
          <div className="container mx-auto px-4 flex justify-between">
            <div className="flex items-center gap-10">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <a
                    href={item.href}
                    className={`relative flex items-center gap-1 py-1 text-md font-khand-600 transition-colors 
              after:content-[''] after:block after:h-0.5 after:bg-[#e87817] 
              after:absolute after:bottom-0 after:left-0 after:right-0 
              after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
                  >
                    {item.icon && item.icon}
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
            <LanguageSelect />
          </div>
        </nav>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
