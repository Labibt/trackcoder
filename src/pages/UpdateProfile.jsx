import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiCode,
  FiBook,
  FiCoffee,
  FiBell,
  FiLock,
  FiEye,
} from "react-icons/fi";
import { UserContext } from "../context/contextAPI";
import { fetchUserProfile } from "../services/fetchUserProfile";
import { baseUri } from "../data/constantData";

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
      {Icon && <Icon className="mr-2 text-blue-400" />}
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Button = ({ children, isLoading, ...props }) => (
  <button
    {...props}
    className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isLoading}
  >
    {isLoading ? "Updating..." : children}
  </button>
);

const Switch = ({ label, icon: Icon, checked, onChange }) => (
  <label className="flex items-center cursor-pointer mb-4">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`block w-14 h-8 rounded-full ${
          checked ? "bg-blue-500" : "bg-gray-600"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
          checked ? "transform translate-x-6" : ""
        }`}
      ></div>
    </div>
    <div className="ml-3 text-gray-300 font-medium flex items-center">
      {Icon && <Icon className="mr-2 text-blue-400" />}
      {label}
    </div>
  </label>
);

export default function UpdateProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    leetcodeId: "",
    gfgId: "",
    codechefId: "",
    friendUpdates: true,
    contestReminders: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) {
          const data = await fetchUserProfile();
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, [userData, setUserData]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        leetcodeId: userData.leetcode_data?.user_id || "",
        gfgId: userData.gfg_data?.user_id || "",
        codechefId: userData.codechef_data?.user_id || "",
        friendUpdates: userData.notifications?.friendUpdates || true,
        contestReminders: userData.notifications?.contestReminders || false,
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUri}/user/update`, formData, {
        withCredentials: true,
      });

      alert("Profile Updated Successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 mt-10 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">
            Profile Settings
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              icon={FiUser}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              icon={FiUser}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="LeetCode ID"
              icon={FiCode}
              name="leetcodeId"
              type="text"
              value={formData.leetcodeId}
              onChange={handleInputChange}
            />
            <Input
              label="GeeksforGeeks ID"
              icon={FiBook}
              name="gfgId"
              type="text"
              value={formData.gfgId}
              onChange={handleInputChange}
            />
            <Input
              label="CodeChef ID"
              icon={FiCoffee}
              name="codechefId"
              type="text"
              value={formData.codechefId}
              onChange={handleInputChange}
            />

            <h3 className="text-xl font-semibold text-blue-400">
              Notifications
            </h3>
            <Switch
              label="Get Friend Updates"
              icon={FiBell}
              checked={formData.friendUpdates}
              onChange={(value) => handleSwitchChange("friendUpdates", value)}
            />
            <Switch
              label="Contest Reminders"
              icon={FiBell}
              checked={formData.contestReminders}
              onChange={(value) =>
                handleSwitchChange("contestReminders", value)
              }
            />

            <Button type="submit" isLoading={isLoading}>
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
