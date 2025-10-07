"use client";

import React, { useState, ChangeEvent } from "react";
import { User, Shield, Camera, Mail } from "lucide-react";

interface ProfileData {
  username: string;
  email: string;
  bio: string;
  profileImage: string | null;
}

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<"account" | "security">("account");
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Frontend intern passionate about clean UI and smooth UX.",
    profileImage: null,
  });

  const [securityData, setSecurityData] = useState<SecurityData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // -------------------------------
  // Handlers
  // -------------------------------

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAccount = async () => {
    setIsSaving(true);
    // TODO: Connect API → PUT /api/user/profile
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleSecurityChange = (field: keyof SecurityData, value: string) => {
    setSecurityData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSaving(true);
    // TODO: Connect API → PUT /api/user/password
    setTimeout(() => {
      setIsSaving(false);
      setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password changed successfully!");
    }, 1000);
  };

  const handleToggle2FA = async () => {
    const newState = !twoFactorEnabled;
    setTwoFactorEnabled(newState);
    // TODO: Connect API → PUT /api/user/2fa
    alert(`Two-factor authentication ${newState ? "enabled" : "disabled"}`);
  };

  // -------------------------------
  // UI
  // -------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and security</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "account"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <User size={20} />
              Account
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "security"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Shield size={20} />
              Security
            </button>
          </div>

          <div className="p-6">
            {activeTab === "account" && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden">
                      {profileData.profileImage ? (
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        profileData.username[0].toUpperCase()
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Camera size={16} className="text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profileData.username}
                    </h3>
                    <p className="text-sm text-gray-600">{profileData.email}</p>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => handleProfileChange("username", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveAccount}
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab (unchanged) */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change password</h3>
                  <div className="space-y-4">
                    {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="password"
                          value={securityData[field as keyof SecurityData]}
                          onChange={(e) =>
                            handleSecurityChange(field as keyof SecurityData, e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleChangePassword}
                      disabled={isSaving}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Updating..." : "Update password"}
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Two-factor authentication
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Add an extra layer of security to your account using an authenticator app.
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          onClick={handleToggle2FA}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                            twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {twoFactorEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                    <Shield
                      className={`${twoFactorEnabled ? "text-green-600" : "text-gray-400"}`}
                      size={48}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
