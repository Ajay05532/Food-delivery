import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-gray-200 select-none">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </h2>

        <p className="mt-3 text-base text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Go back
          </button>

          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
