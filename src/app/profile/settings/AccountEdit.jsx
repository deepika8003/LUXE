"use client";

import React, { useState, useEffect } from "react";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function AccountSettingsUI() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const currentUser = useSelector((state) => state.auth.currentUser);
  const addresses = useSelector((state) => state.address.addresses);

  // Account edit state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser);

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");

  // Language state
  const [language, setLanguage] = useState("English");

  // Load user from localStorage
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user && !currentUser) {
      setFormData(JSON.parse(user));
    }
    // Load saved language
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, [currentUser]);

  // Sync formData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  // Account update handler
  const handleUpdate = () => {
    dispatch(setUser(formData));
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setIsEditing(false);
  };

  // Password update
  const handlePasswordUpdate = () => {
    setPasswordError("");

    if (passwords.current !== currentUser?.password) {
      setPasswordError("Current password is incorrect ");
      return;
    }

    if (passwords.new === passwords.current) {
      setPasswordError("New password must be different from current password ");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match ");
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: passwords.new,
    };

    dispatch(setUser(updatedUser));

    dispatch(logout());
    localStorage.removeItem("token");

    alert("Password updated. Please login again");
    router.push("/");
  };
  // Delete account
  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible.",
      )
    ) {
      dispatch(logout());
      localStorage.clear();
      router.push("/");
    }
  };

  // Logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of all sessions?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  // Address edit navigation
  const handleEditAddress = () => {
    router.push("/profile/shippingDetails");
  };

  // Language change handler
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // Get default address from Redux
  const defaultAddress = addresses?.[0];

  // Notification preferences
  const [emailNewsletter, setEmailNewsletter] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen pt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-2xl sm:text-4xl text-center font-semibold text-gray-900 mb-2 tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2 text-center max-w-xl mx-auto mb-6">
          Update your profile, control your security, and customize your
          experience effortlessly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Information  */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Account Information
                </h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center cursor-pointer gap-2 text-xs font-medium tracking-wider text-blue-600 hover:text-blue-800 transition"
                >
                  <FaPencilAlt size={12} />
                  EDIT DETAILS
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl font-medium text-blue-800 shadow-sm">
                    {formData?.name?.charAt(0) || "U"}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData?.name || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm focus:outline-none focus:ring-1 transition-all ${
                        isEditing
                          ? "border-gray-300 text-black focus:border-blue-500 focus:ring-blue-200"
                          : "border-gray-200 cursor-not-allowed"
                      }`}
                    />
                  </div>

                  {/* Email Address  */}
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData?.email || ""}
                      disabled
                      className="w-full  px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData?.mobile || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-600 text-sm focus:outline-none focus:ring-1 transition-all ${
                        isEditing
                          ? "border-gray-300 text-black focus:border-blue-500 focus:ring-blue-200"
                          : "border-gray-200 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Save Changes Button */}
              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleUpdate}
                    className="px-6 cursor-pointer py-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold tracking-wider rounded-lg transition shadow-sm"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              )}
            </div>

            {/* Password & Security Card  */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Password & Security
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={show.current ? "text" : "password"}
                      placeholder="••••••••"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className="w-full  px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow({ ...show, current: !show.current })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {show.current ? (
                        <FaEyeSlash size={14} />
                      ) : (
                        <FaEye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={show.new ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      className="w-full  px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShow({ ...show, new: !show.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {show.new ? (
                        <FaEyeSlash size={14} />
                      ) : (
                        <FaEye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={show.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      className="w-full  px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShow({ ...show, confirm: !show.confirm })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {show.confirm ? (
                        <FaEyeSlash size={14} />
                      ) : (
                        <FaEye size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handlePasswordUpdate}
                  className="px-6 py-2 cursor-pointer bg-black hover:bg-gray-800 text-white text-xs font-semibold tracking-wider rounded-lg transition shadow-sm"
                >
                  UPDATE PASSWORD
                </button>
              </div>
            </div>

            {/* Shipping Address  */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>
                <button
                  onClick={handleEditAddress}
                  className="flex cursor-pointer items-center gap-2 text-xs font-medium tracking-wider text-blue-600 hover:text-blue-800 transition"
                >
                  <FaPencilAlt size={12} />
                  EDIT
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                {defaultAddress ? (
                  <div>
                    <p className="font-semibold text-gray-900">
                      {defaultAddress.name}
                      <span className="text-xs font-normal text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded ml-1">
                        Default
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {defaultAddress.street}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {defaultAddress.city}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {defaultAddress.region}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {defaultAddress.country}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No address added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Preferences  */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-bold tracking-wider text-gray-800 uppercase mb-5">
                Preferences
              </h2>

              <div className="space-y-4">
                {/* Notifications */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    <label className="flex justify-between items-center cursor-pointer">
                      <span className="text-sm text-gray-700">
                        Email Newsletter
                      </span>
                      <input
                        type="checkbox"
                        checked={emailNewsletter}
                        onChange={(e) => setEmailNewsletter(e.target.checked)}
                        className="h-4 w-4 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex justify-between items-center cursor-pointer">
                      <span className="text-sm text-gray-700">
                        SMS Order Alerts
                      </span>
                      <input
                        type="checkbox"
                        checked={smsAlerts}
                        onChange={(e) => setSmsAlerts(e.target.checked)}
                        className="h-4 w-4 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* Language & Region */}
                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Language & Region
                  </h3>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option>English</option>
                    <option>Tamil</option>
                    <option>Hindi</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Selected: {language}
                  </p>
                </div>
              </div>
            </div>

            {/* Danger Zone  */}
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
              <h2 className="text-sm font-bold tracking-wider text-red-600 uppercase mb-4">
                Danger Zone
              </h2>
              <div className="space-y-4">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full cursor-pointer flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition text-red-700 group"
                >
                  <span className="text-sm font-medium">DELETE MY ACCOUNT</span>
                  <FaTrashAlt className="text-red-500 group-hover:text-red-700 text-sm" />
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-gray-700 group"
                >
                  <span className="text-sm font-medium">
                    Logout of All Sessions
                  </span>
                  <FaSignOutAlt className="text-gray-500 group-hover:text-gray-700 text-sm" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 border-t border-gray-100 pt-3">
                These actions are irreversible. Please proceed with caution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
