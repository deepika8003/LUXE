import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Title + Tabs */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>

        <div className="flex gap-6">
          <button className="px-4 py-2 bg-[#155dfc] text-white rounded-md text-sm font-medium">
            Edit Profile
          </button>
          <button className="text-gray-600 text-sm font-medium">
            Preferences
          </button>
          <button className="text-gray-600 text-sm font-medium">
            Security
          </button>
          <button className="text-gray-600 text-sm font-medium">
            Data Privacy
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-8 sm:flex gap-10  shadow-sm">
        {/* Profile Image */}
        <div className="mb-5">
          <div className="w-24 h-24 border-2 border-gray-300 rounded-full"></div>
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <form className="space-y-4">
            {/* First & Last Name */}
            <div className="sm:grid grid-cols-2 space-y-6 sm:space-y-0 gap-6">
              <div className="">
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="Mystery"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="bubu"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>
            </div>
            {/* Email + Phone */}
            <div className="sm:grid grid-cols-2 space-y-6 sm:space-y-0 gap-6">
              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Mysterybubu@gmail.com"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 9890909090"
                  min={10}
                  max={10}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Personal Info Title */}
            <h2 className="text-md font-semibold text-gray-800 ">
              Personal Information
            </h2>

            {/* Country & City */}
            <div className="sm:grid grid-cols-2 space-y-6 sm:space-y-0 gap-6">
              <div>
                <label className="text-sm text-gray-600">Country</label>
                <input
                  type="text"
                  placeholder="Inida"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  placeholder="Dharmapuri"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Address & Zip */}
            <div className="sm:grid grid-cols-2 space-y-6 sm:space-y-0 gap-6">
              <div>
                <label className="text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  placeholder="RS Street"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Zip Code</label>
                <input
                  type="tell"
                  placeholder="635112"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-2 bg-black  hover:bg-gray-800 text-white rounded-md transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
