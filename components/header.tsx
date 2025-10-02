"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, CircleUserRound, Loader } from "lucide-react";
import Image from "next/image";
import { LoginModal } from "./login-modal";
import { RegistorModal } from "./registor-model";
import { RiHome9Fill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";
import { FiVideo } from "react-icons/fi";
import { TbDeviceMobile } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { LanguageSelect } from "./languageSelect";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistorModalOpen, setIsRegistorModalOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(true);


  const { data: session, status } = useSession();
  // if (!session && status === "loading") return null;

  const router = useRouter();
  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const navItems = [
    { label: "HOME", href: "/", icon: <RiHome9Fill className="w-5 h-5 mr-1" /> },
    { label: "RECOMMENDATIONS", href: "#internship-recommendations", icon: <IoNewspaper className="w-5 h-5 mr-1" /> },
    { label: "GALLERY", href: "#gallery", icon: <FiVideo className="w-5 h-5 mr-1" /> },
    { label: "MOBILE APP", href: "#mobile", icon: <TbDeviceMobile className="w-5 h-5 mr-1" /> },
    { label: "SUPPORT", href: "#support", icon: <MdSupportAgent className="w-5 h-5 mr-1" /> },
  ];


  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      <div className="sticky top-0 w-full z-100 py-1 bg-white/70 backdrop-blur-sm">
        {/* Top Header */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/head1.svg" alt="Digital India" width={120} height={120} />
            <Image src="/head2.svg" alt="Digital India" width={120} height={120} />
          </div>

          <div className="flex items-center gap-3">
            {status === "loading" ? (
              <Loader className="w-6 h-6 animate-spin text-orange-500" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <span translate="no" className="font-medium notranslate">{session.user?.name}</span>
                    <Avatar className="size-10 hover:opacity-75 transition">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback translate="no" className="bg-sky-900 text-white notranslate">{avatarFallback}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[9999]">
                  <DropdownMenuItem onClick={handleSignOut}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]"
                  onClick={() => setIsRegistorModalOpen(true)}
                >
                  <UserRoundPlus size={36} />
                  Youth Registration
                </Button>
                <Button
                  className="bg-[#ff7500] hover:bg-orange-600 text-white px-6 border border-transparent text-[17px] shadow-[0_4px_0_#c65b00]"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <CircleUserRound size={36} />
                  Login
                </Button>
              </>
            )}
            <div className="ml-4">
              <Image src="/digital-india-logo.png" alt="Digital India" width={120} height={40} className="h-10 w-auto" />
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
                    {item.icon}
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
            <LanguageSelect />
          </div>
        </nav>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegistorModal isOpen={isRegistorModalOpen} onClose={() => setIsRegistorModalOpen(false)} openLogin={() => {
        setIsRegistorModalOpen(false);
        setIsLoginModalOpen(true);
      }} />
    </>
  );
}
