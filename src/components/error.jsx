import { FiAlertTriangle } from "react-icons/fi";

const ErrorPage = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="text-center">
        <FiAlertTriangle className="text-red-400 w-10 h-10 mb-4" />
        <h2 className="text-2xl font-semibold text-red-400">
          Oops, something went wrong!
        </h2>
        <p className="mt-2 text-gray-400">
          {message || "An unexpected error occurred."}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
