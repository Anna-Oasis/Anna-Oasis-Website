import { useState } from "react";

import GrievanceForm from "./GrievanceForm";
import GrievanceHistory from "./GrievanceHistory";

import { Button } from "@/components/ui/button";

export default function GrievancesPage() {
  const [tab, setTab] = useState<"file" | "history">("file");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#0F2F6E]">Grievance Portal</h1>

        <p className="text-slate-500 text-lg mt-2">
          Submit grievances and track their approval status.
        </p>
      </div>

      <div className="flex gap-3 mb-8">
        <Button
          variant={tab === "file" ? "default" : "outline"}
          className={
            tab === "file"
              ? "bg-[#0F2F6E] hover:bg-[#0B2454] text-white"
              : "border-slate-300"
          }
          onClick={() => setTab("file")}
        >
          File Grievance
        </Button>

        <Button
          variant={tab === "history" ? "default" : "outline"}
          className={
            tab === "history"
              ? "bg-[#0F2F6E] hover:bg-[#0B2454] text-white"
              : "border-slate-300"
          }
          onClick={() => setTab("history")}
        >
          History
        </Button>
      </div>

      {tab === "file" ? <GrievanceForm /> : <GrievanceHistory />}
    </div>
  );
}
