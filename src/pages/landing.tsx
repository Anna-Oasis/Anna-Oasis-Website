import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGooglePlay } from "react-icons/fa";
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 z-50">
      <div className="flex flex-col items-center">
        <img src="/vite.svg" alt="Anna Oasis" className="w-20 h-20 animate-bounce mb-4" />
        <div className="text-2xl font-bold text-blue-700 animate-pulse">Anna Oasis</div>
        <div className="mt-2 text-blue-500">Loading...</div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl rounded-2xl overflow-hidden bg-white animate-fade-in">
        {/* Left: Download App */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 p-10">
        <img src="/vite.svg" alt="Anna Oasis" className="w-24 h-24 mb-6 drop-shadow-lg" />
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Get the Anna Oasis App</h2>
        <p className="text-gray-600 mb-6 text-center">
            Download our Android app for a seamless hostel experience. Manage admissions, view status, and more right from your phone!
        </p>
        <div className="flex gap-4">
            <a
            href="/apk/anna-oasis-latest.apk"
            download
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:scale-105 transition-transform"
            >
            <FaGooglePlay className="text-xl" />
            <span className="font-semibold">Download APK</span>
            </a>
        </div>
        <div className="mt-8 text-xs text-gray-400 text-center">
            Works on Android devices. iOS coming soon!
        </div>
        </div>
        {/* Right: Login */}
        <div className="flex flex-col justify-center items-center p-10 bg-white">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-4 animate-fade-in-down">Welcome to Anna Oasis</h2>
          <p className="text-gray-600 mb-8 text-center">
            Manage your hostel life, admissions, and more with ease.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-200 animate-fade-in-up"
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
}