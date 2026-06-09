import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getHistoryOfGrievance } from "@/utils/student/studentGrievanceApi";

type Grievance = {
  id: number;
  grievance_type: string;
  subject: string;
  description: string;
  status: string | number;
  created_at: string;
  resolved_at: string | null;
};

const getStatusInfo = (status: string | number) => {
  switch (Number(status)) {
    case 2:
      return {
        label: "Approved",
        badge: "bg-green-100 text-green-700 border-green-200",
      };

    case -1:
      return {
        label: "Rejected",
        badge: "bg-red-100 text-red-700 border-red-200",
      };

    default:
      return {
        label: "Pending Approval",
        badge: "bg-amber-100 text-amber-700 border border-amber-300 px-3 py-1",
      };
  }
};

export default function GrievanceHistory() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [selected, setSelected] = useState<Grievance | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistoryOfGrievance();

      if (!Array.isArray(data)) return;

      setGrievances(data);

      setStats({
        total: data.length,

        approved: data.filter((item) => Number(item.status) === 2).length,

        rejected: data.filter((item) => Number(item.status) === -1).length,

        pending: data.filter(
          (item) => Number(item.status) !== 2 && Number(item.status) !== -1,
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (grievances.length === 0) {
    return (
      <Card>
        <CardContent className="py-24 text-center">
          <h3 className="text-2xl font-bold text-[#0F2F6E]">
            No Grievances Submitted
          </h3>

          <p className="text-slate-500 mt-3">
            You have not raised any grievances yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Stats */}
      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Requests
            </p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold text-[#0F2F6E]">
                {stats.total}
              </h2>

              <div className="h-10 w-1 rounded-full bg-[#0F2F6E]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-yellow-700">
              Pending
            </p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold text-yellow-700">
                {stats.pending}
              </h2>

              <div className="h-10 w-1 rounded-full bg-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-green-50 border-green-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-green-700">
              Approved
            </p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold text-green-700">
                {stats.approved}
              </h2>

              <div className="h-10 w-1 rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-red-700">
              Rejected
            </p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold text-red-700">
                {stats.rejected}
              </h2>

              <div className="h-10 w-1 rounded-full bg-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Cards */}
      <div className="space-y-5">
        {grievances.map((item) => {
          const statusInfo = getStatusInfo(item.status);

          return (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-4">
                  <div>
                    <h3 className="font-semibold text-lg text-[#0F2F6E]">
                      {item.subject}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.grievance_type}
                    </p>
                  </div>

                  <Badge className={statusInfo.badge}>{statusInfo.label}</Badge>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-xs text-slate-400">Submitted On</p>

                      <p className="font-medium text-slate-700">
                        {new Date(item.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <Button variant="outline" onClick={() => setSelected(item)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#0F2F6E]">
              {selected?.subject}
            </DialogTitle>

            <DialogDescription>
              Complete grievance information
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="grid gap-6 mt-4">
              <div>
                <p className="text-sm text-slate-500">Category</p>

                <p className="font-semibold">{selected.grievance_type}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Description</p>

                <div className="mt-2 rounded-lg bg-slate-50 p-4 border">
                  {selected.description}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>

                <div className="mt-2">
                  <Badge className={getStatusInfo(selected.status).badge}>
                    {getStatusInfo(selected.status).label}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Submitted On</p>

                  <p className="font-medium">
                    {new Date(selected.created_at).toLocaleString("en-IN")}
                  </p>
                </div>

                {selected.resolved_at && (
                  <div>
                    <p className="text-sm text-slate-500">Resolved On</p>

                    <p className="font-medium">
                      {new Date(selected.resolved_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
