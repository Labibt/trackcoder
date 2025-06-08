import React, { useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground";

export default function ReportBugPage() {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/report-bug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, details }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit bug report");
      }

      showNotification("Bug report submitted successfully!", "success");
      setSubject("");
      setDetails("");
    } catch (error) {
      showNotification(
        "Failed to submit bug report. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-10">
      <MatrixBackground />

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                : "bg-red-500/20 border border-red-500/30 text-red-400"
            }`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() =>
                setNotification({ show: false, message: "", type: "" })
              }
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-xl bg-red-500/10 text-red-400">
              <FiAlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400">
                Report a Bug
              </h1>
              <p className="text-gray-400">
                Help us improve by reporting issues
              </p>
            </div>
          </div>
        </div>

        {/* Bug Report Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all"
                placeholder="Brief description of the issue"
              />
            </div>

            {/* Details Field */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                rows="6"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all resize-none"
                placeholder="Please provide detailed information about the bug..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-purple-500 text-white font-medium hover:from-red-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
