import React, { useContext, useEffect, useState } from "react";
import { FiUser, FiCode, FiBook, FiCoffee, FiBell } from "react-icons/fi";
import { UserContext } from "../context/contextAPI";
import { fetchUserProfile } from "../services/fetchUserProfile";
import { updateProfile } from "../services/profileService";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormSwitch from "../components/FormSwitch";

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
        friendUpdates: userData.notifications?.friendUpdates ?? true,
        contestReminders: userData.notifications?.contestReminders ?? false,
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
      const updatedData = await updateProfile(formData);
      setUserData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
      alert("Profile Updated Successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-12 py-12 px-4 ">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-5">
        <div className="px-6 py-8 pt-3">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">
            Profile Settings
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Name"
              icon={FiUser}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Email"
              icon={FiUser}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="LeetCode ID"
              icon={FiCode}
              name="leetcodeId"
              type="text"
              value={formData.leetcodeId}
              onChange={handleInputChange}
            />
            <FormInput
              label="GeeksforGeeks ID"
              icon={FiBook}
              name="gfgId"
              type="text"
              value={formData.gfgId}
              onChange={handleInputChange}
            />
            <FormInput
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
            <FormSwitch
              label="Get Friend Updates"
              icon={FiBell}
              checked={formData.friendUpdates}
              onChange={(value) => handleSwitchChange("friendUpdates", value)}
            />
            <FormSwitch
              label="Contest Reminders"
              icon={FiBell}
              checked={formData.contestReminders}
              onChange={(value) =>
                handleSwitchChange("contestReminders", value)
              }
            />

            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
}
