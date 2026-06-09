/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Inbox } from "lucide-react";
import GrievanceCard from "@/components/deputyWarden/GrievanceCard";
import { getDeputyWardenGrievances } from "@/utils/deputyWarden/dwGrievanceApi";

const DeputyWardenGrievancesPage = () => {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState<any[]>([]);

  const loadGrievances = async () => {
    try {
      const data = await getDeputyWardenGrievances();
      setGrievances(Array.isArray(data) ? data : []);
    } catch {
      setGrievances([]);
    }
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {grievances.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Inbox size={48} className="mb-4" />
          <p className="text-base">No grievances found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {grievances.map((item) => (
            <GrievanceCard
              key={item.grievances.id}
              subject={item.grievances.subject}
              status={item.grievances.status}
              rollNo={item.student.rollNo}
              onView={() =>
                navigate(
                  `/DeputyWarden/Grievances/${item.grievances.id}`,
                  { state: item }
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeputyWardenGrievancesPage;
