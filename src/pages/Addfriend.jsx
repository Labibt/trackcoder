import axios from "axios";
import React, { useState } from "react";
import { FiUserPlus, FiCode, FiBook, FiCoffee } from "react-icons/fi";

const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center">
      {Icon && <Icon className="mr-2 text-teal-400" />}
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
    />
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full px-5 py-3 bg-teal-500 text-white rounded-lg font-semibold shadow-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    {children}
  </button>
);

export default function AddFriendPage() {
  const [formData, setFormData] = useState({
    name: "",
    leetcodeId: "",
    gfgId: "",
    codechefId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Friend added:", formData);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/friend/add",
        formData,
        { withCredentials: true }
      );
      if (res.data.status === 201) {
        alert(res.data.message || "Friend added successfully!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error adding friend:", err);
      alert(
        "Failed to add friend. Please check your network or try again later."
      );
    } finally {
      setLoading(false);
    }

    setFormData({
      name: "",
      leetcodeId: "",
      gfgId: "",
      codechefId: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-teal-400">Add a Friend</h2>
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl">
              <FiUserPlus className="text-teal-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-400">
                Friend's Information
              </h3>
              <Input
                label="Friend's Name"
                icon={FiUserPlus}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your friend's name"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-400">
                Coding Platforms
              </h3>
              <Input
                label="LeetCode ID"
                icon={FiCode}
                name="leetcodeId"
                type="text"
                value={formData.leetcodeId}
                onChange={handleInputChange}
                placeholder="Enter LeetCode ID"
              />
              <Input
                label="GeeksforGeeks ID"
                icon={FiBook}
                name="gfgId"
                type="text"
                value={formData.gfgId}
                onChange={handleInputChange}
                placeholder="Enter GeeksforGeeks ID"
              />
              <Input
                label="CodeChef ID"
                icon={FiCoffee}
                name="codechefId"
                type="text"
                value={formData.codechefId}
                onChange={handleInputChange}
                placeholder="Enter CodeChef ID"
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Friend"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
