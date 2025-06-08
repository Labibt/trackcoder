import React, { useState } from "react";
import { FiUserPlus, FiCode, FiBook, FiCoffee } from "react-icons/fi";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { addFriend } from "../services/friendService";

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

    try {
      const result = await addFriend(formData);
      alert(result.message);

      if (result.success) {
        setFormData({
          name: "",
          leetcodeId: "",
          gfgId: "",
          codechefId: "",
        });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-6 pt-8">
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
              <FormInput
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
              <FormInput
                label="LeetCode ID"
                icon={FiCode}
                name="leetcodeId"
                type="text"
                value={formData.leetcodeId}
                onChange={handleInputChange}
                placeholder="Enter LeetCode ID"
              />
              <FormInput
                label="GeeksforGeeks ID"
                icon={FiBook}
                name="gfgId"
                type="text"
                value={formData.gfgId}
                onChange={handleInputChange}
                placeholder="Enter GeeksforGeeks ID"
              />
              <FormInput
                label="CodeChef ID"
                icon={FiCoffee}
                name="codechefId"
                type="text"
                value={formData.codechefId}
                onChange={handleInputChange}
                placeholder="Enter CodeChef ID"
              />
            </div>

            <FormButton type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Friend"}
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  );
}
