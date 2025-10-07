"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { User, Shield, Camera, Mail, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface ProfileData {
    username: string;
    email: string;
    bio: string;
    profileImage: string | undefined;
}

interface SecurityData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<"account" | "security">("account");
    const [isSaving, setIsSaving] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        username: "",
        email: "",
        bio: "Frontend intern passionate about clean UI and smooth UX.",
        profileImage: "",
    });

    const [securityData, setSecurityData] = useState<SecurityData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { data: session , update} = useSession();

    useEffect(() => {
        if (session?.user) {
            setTwoFactorEnabled(Boolean(session.user.twoFactorEnabled));
            setProfileData((prev) => ({
                ...prev,
                username: session.user.name ?? "",
                email: session.user.email ?? "",
                profileImage: session.user.image ?? undefined
            }));
        }
    }, [session]);

    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();


    const handleProfileChange = (field: keyof ProfileData, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>
                setProfileData((prev) => ({
                    ...prev,
                    profileImage: reader.result as string,
                }));
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAccount = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });

            if (!res.ok) throw new Error("Failed to update profile");
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating your profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSecurityChange = (field: keyof SecurityData, value: string) => {
        setSecurityData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return alert("User not logged in");

        const res = await fetch("/api/user/password-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: session.user.email,
                securityData,
            }),
        });

        const data = await res.json();
        alert(data.message);

    };


    const handleToggle2FA = async () => {
        if (!session?.user?.email) return;

        const newState = !session.user.twoFactorEnabled;

        const res = await fetch("/api/user/security", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ enabled: newState }),
        });

        const data = await res.json();
        if (data.success) setTwoFactorEnabled(data.twoFactorEnabled);

        await update({
            ...session,
            user: {
                ...session?.user,
                twoFactorEnabled: data.twoFactorEnabled,
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("account")}
                        className={`flex items-center gap-2 px-5 py-3 font-medium transition-colors ${activeTab === "account"
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                    >
                        <User size={18} />
                        Account
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-2 px-5 py-3 font-medium transition-colors ${activeTab === "security"
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                    >
                        <Shield size={18} />
                        Security
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            {/* Profile Photo */}
                            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden">
                                        <Avatar className="size-10 hover:opacity-75 transition w-full h-full">
                                            <AvatarImage src={profileData.profileImage} />
                                            <AvatarFallback translate="no" className="bg-sky-900 text-white notranslate">{avatarFallback}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                                        <Camera size={14} className="text-gray-600" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {profileData.username}
                                    </h3>
                                    <p className="text-sm text-gray-600">{profileData.email}</p>
                                </div>
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={profileData.username}
                                    onChange={(e) =>
                                        handleProfileChange("username", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        disabled
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    rows={3}
                                    value={profileData.bio}
                                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Tell us a bit about yourself..."
                                />
                            </div>

                            {/* Save */}
                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleSaveAccount}
                                    disabled={isSaving}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6">
                            {/* Change Password */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-3">
                                    Change password
                                </h3>
                                <form onSubmit={handleChangePassword} className="space-y-3">
                                    {["currentPassword", "newPassword", "confirmPassword"].map(
                                        (field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                                    {field.replace(/([A-Z])/g, " $1")}
                                                </label>
                                                <input
                                                    type="password"
                                                    value={securityData[field as keyof SecurityData]}
                                                    onChange={(e) =>
                                                        handleSecurityChange(
                                                            field as keyof SecurityData,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                    placeholder={`Enter ${field
                                                        .replace(/([A-Z])/g, " $1")
                                                        .toLowerCase()}`}
                                                />
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? "Updating..." : "Update password"}
                                    </button>
                                </form>
                            </div>

                            {/* Two-Factor */}
                            <div className="pt-5 border-t border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                                            Two-factor authentication
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Add an extra layer of security using an authenticator app.
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div
                                                onClick={handleToggle2FA}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                        }`}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">
                                                {twoFactorEnabled ? "Enabled" : "Disabled"}
                                            </span>
                                        </div>
                                    </div>
                                    <Shield
                                        className={`${twoFactorEnabled ? "text-green-600" : "text-gray-400"
                                            }`}
                                        size={36}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
