import React from "react";

export default function ManagerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Manager Dashboard
      </h1>
      <p className="text-slate-600">
        Welcome back! Select an option from the sidebar to manage hostel
        operations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          "Payment Verifications",
          "Caution Deposits",
          "Grievances",
          "Profile Verifications",
        ].map((item) => (
          <div
            key={item}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm"
          >
            <h3 className="font-semibold text-slate-700">{item}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Click in sidebar to view details
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
