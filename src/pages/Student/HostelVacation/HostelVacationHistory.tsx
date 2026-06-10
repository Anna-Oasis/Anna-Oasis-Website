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

import { getVacatingHistory } from "@/utils/student/studentVacatingHostelApi";

type VacationRecord = {
  vacating: {
    id: number;
    roll_number: string;
    vacating_date: string;
    vacating_time: string;
    future_address: string;
    returned_items: string[];
    endeavour: string;
    endeavourDescription: string;
    feedback: string;
    status: string;
    created_at: string;
  };

  caution: {
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    addressOfTheBank: string;
    IFSCode: string;
    refund_amount?: string;
    deductions?: string;
  };
};

const getStatusInfo = (status: string | number) => {
  const value = Number(status);

  if (value >= 4) {
    return {
      label: "Approved",
      badge: "bg-green-100 text-green-700 border-green-200",
    };
  }

  if (value === -1) {
    return {
      label: "Rejected",
      badge: "bg-red-100 text-red-700 border-red-200",
    };
  }

  return {
    label: "Pending Approval",
    badge: "bg-amber-100 text-amber-700 border border-amber-300 px-3 py-1",
  };
};

export default function HostelVacationHistory() {
  const [history, setHistory] = useState<VacationRecord[]>([]);
  const [selected, setSelected] = useState<VacationRecord | null>(null);

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
      const data = await getVacatingHistory();

      if (!Array.isArray(data)) return;

      setHistory(data);

      setStats({
        total: data.length,

        approved: data.filter((item) => Number(item.vacating.status) >= 4)
          .length,

        rejected: data.filter((item) => Number(item.vacating.status) === -1)
          .length,

        pending: data.filter(
          (item) =>
            Number(item.vacating.status) < 4 &&
            Number(item.vacating.status) !== -1,
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-24 text-center">
          <h3 className="text-2xl font-bold text-[#0F2F6E]">
            No Vacation Requests
          </h3>

          <p className="text-slate-500 mt-3">
            You haven't submitted any hostel vacation requests yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Requests
            </p>

            <h2 className="text-3xl font-bold text-[#0F2F6E] mt-3">
              {stats.total}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-yellow-700">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-700 mt-3">
              {stats.pending}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-green-700">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-3">
              {stats.approved}
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-red-700">
              Rejected
            </p>

            <h2 className="text-3xl font-bold text-red-700 mt-3">
              {stats.rejected}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {history.map((item) => {
          const status = getStatusInfo(item.vacating.status);

          return (
            <Card
              key={item.vacating.id}
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#0F2F6E]"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-4">
                  <div>
                    <h3 className="font-semibold text-lg text-[#0F2F6E]">
                      Hostel Vacation Request
                    </h3>

                    <p className="text-sm text-slate-500">
                      Roll No: {item.vacating.roll_number}
                    </p>
                  </div>

                  <Badge className={status.badge}>{status.label}</Badge>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Vacating Date</p>

                      <p className="font-medium">
                        {item.vacating.vacating_date}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Vacating Time</p>

                      <p className="font-medium">
                        {item.vacating.vacating_time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-500">Future Address</p>

                    <p className="font-medium">
                      {item.vacating.future_address}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-xs text-slate-400">Submitted On</p>

                      <p className="font-medium text-slate-700">
                        {new Date(item.vacating.created_at).toLocaleDateString(
                          "en-IN",
                        )}
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

      {/* Details Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#0F2F6E] text-2xl">
              Hostel Vacation Details
            </DialogTitle>

            <DialogDescription>Complete request information</DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="grid gap-6 mt-4">
              <div>
                <p className="text-sm text-slate-500">Future Address</p>

                <p className="font-medium">
                  {selected.vacating.future_address}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Future Endeavour</p>

                <p className="font-medium">{selected.vacating.endeavour}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Description</p>

                <p className="font-medium">
                  {selected.vacating.endeavourDescription}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Feedback</p>

                <p className="font-medium">{selected.vacating.feedback}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Returned Items</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {selected.vacating.returned_items?.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-5">
                <h3 className="font-semibold text-lg text-[#0F2F6E] mb-4">
                  Caution Deposit Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Account Holder</p>

                    <p>{selected.caution.accountHolderName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Account Number</p>

                    <p>{selected.caution.accountNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Bank Name</p>

                    <p>{selected.caution.bankName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">IFSC</p>

                    <p>{selected.caution.IFSCode}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Refund Amount</p>

                    <p className="font-semibold text-green-700">
                      ₹{selected.caution.refund_amount || "0"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Deductions</p>

                    <p className="font-semibold text-red-600">
                      ₹{selected.caution.deductions || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
