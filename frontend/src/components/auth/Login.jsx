const Login = ({ switchToSignup }) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
      <p className="text-sm text-gray-600 mb-6">
        Don't have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-orange-600 font-semibold hover:text-orange-700"
        >
          Create one
        </button>
      </p>

      <form className="space-y-4">
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button 
          type="button"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors duration-200"
        >
          Login
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          By clicking on Login, I accept the{" "}
          <span className="text-gray-700 font-semibold cursor-pointer hover:underline">
            Terms & Conditions & Privacy Policy
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;