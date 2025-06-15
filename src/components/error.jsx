import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error, showLoginButton = false }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4 text-center">
      <FiAlertTriangle className="text-red-400 w-12 h-12 mb-4" />
      <h2 className="text-2xl font-semibold text-red-400">
        Oops, something went wrong!
      </h2>
      <p className="mt-2 text-gray-400 max-w-md">
        {error || "An unexpected error occurred."}
      </p>

      {showLoginButton && (
        <button
          onClick={() => navigate("/auth")}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition z-50"
        >
          Login to Continue
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
