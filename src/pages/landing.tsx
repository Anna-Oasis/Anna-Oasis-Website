import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGooglePlay } from "react-icons/fa";
import { LogIn } from "lucide-react";

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 z-50"
      style={{
        background: "linear-gradient(to bottom right, #e8f2ff, #c9e1ff)",
      }}
    >
      <div className="flex flex-col items-center px-4 text-center">
        <img
          src="/images/no_text_logo.png"
          alt="Anna Oasis"
          className="w-20 h-20 animate-bounce mb-4"
        />
        <div
          className="text-2xl font-bold animate-pulse"
          style={{ color: "#022B60" }}
        >
          Anna Oasis
        </div>
        <div className="mt-2 text-sm sm:text-base" style={{ color: "#4a6fa5" }}>
          Loading...
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white"
      style={{
        background: "linear-gradient(to bottom right, #f8fbff, #ffffff)",
      }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 shadow-2xl rounded-2xl overflow-hidden bg-white animate-fade-in">
        {/* Left: APK Download */}
        <div
          className="flex flex-col justify-center items-center p-6 sm:p-10 text-center"
          style={{
            background: "linear-gradient(to bottom right, #e8f2ff, #d1e7ff)",
          }}
        >
          <img
            src="/images/no_text_logo.png"
            alt="Anna Oasis"
            className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 drop-shadow-lg"
          />
          <h2
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: "#022B60" }}
          >
            Get the Anna Oasis App
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Download our Android app for a seamless hostel experience. Manage
            admissions, view status, and more right from your phone!
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/anna_oasis_apk.apk"
              download
              className="flex items-center gap-2 px-4 sm:px-5 py-3 text-white rounded-lg shadow hover:scale-105 transition-transform text-sm sm:text-base"
              style={{ backgroundColor: "#022B60" }}
            >
              <FaGooglePlay className="text-lg sm:text-xl" />
              <span className="font-semibold">Download APK</span>
            </a>
          </div>
          <div className="mt-6 sm:mt-8 text-xs text-gray-400">
            Works on Android devices. iOS coming soon!
          </div>
        </div>

        {/* Right: Login */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-10 bg-white text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 animate-fade-in-down"
            style={{ color: "#022B60" }}
          >
            Welcome to Anna Oasis
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Manage your hostel life, admissions, and more with ease.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-white text-sm sm:text-lg font-bold rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 animate-fade-in-up"
            style={{ backgroundColor: "#022B60" }}
          >
            <LogIn className="text-lg sm:text-xl" />
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
}
