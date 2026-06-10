import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ApprovalCard, { type BadgeStatusValue } from "@/components/approvalCard";
import EmptyPage from "@/components/EmptyPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRCLeaveBadgeStatus } from "@/utils/getBadgeStatus";
import { completeRCLeave, getRCLeaves, getRCList, submitRCLeaveForm, type RCInfo, type RCLeave } from "@/utils/RC/rcLeaveApi";

const schema = Yup.object({
  leaving: Yup.string().required("Leaving date is required"),
  arrival: Yup.string().required("Arrival date is required"),
  reason: Yup.string().required("Reason is required"),
  alternate: Yup.string().required("Alternate RC is required"),
});

export default function RCApplyForLeavePage() {
  const [activeTab, setActiveTab] = useState<"form" | "history" | "close">("form");
  const [alternateRCs, setAlternateRCs] = useState<RCInfo[]>([]);
  const [leaveHistory, setLeaveHistory] = useState<RCLeave[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadLeaveData = async () => {
    try {
      const [rcs, leaves] = await Promise.all([getRCList(), getRCLeaves()]);
      setAlternateRCs(rcs);
      setLeaveHistory(leaves);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to load RC leave data");
    }
  };

  useEffect(() => {
    loadLeaveData();
  }, []);

  const refreshHistory = async () => {
    setLoadingHistory(true);
    try {
      setLeaveHistory(await getRCLeaves());
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch leave history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleCloseLeave = async () => {
    try {
      await completeRCLeave();
      toast.success("Alternate RC relieved successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to close leave");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">RC Leave</h1>
          <p className="mt-2 text-slate-600">Apply for leave, check approval history, and close alternate RC duty.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={activeTab === "form" ? "default" : "outline"} onClick={() => setActiveTab("form")}>Leave Form</Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => { setActiveTab("history"); refreshHistory(); }}>History</Button>
          <Button variant={activeTab === "close" ? "default" : "outline"} onClick={() => setActiveTab("close")}>Close Leave</Button>
        </div>
      </div>

      {activeTab === "form" && (
        <div className="max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
          <Formik
            initialValues={{ leaving: "", arrival: "", reason: "", alternate: "" }}
            validationSchema={schema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await submitRCLeaveForm({
                  leaving: values.leaving,
                  arrival: values.arrival,
                  reason: values.reason,
                  alternate: Number(values.alternate),
                });
                toast.success("RC leave form submitted successfully");
                resetForm();
                await refreshHistory();
                setActiveTab("history");
              } catch (error: any) {
                toast.error(error.response?.data?.message || error.message || "Failed to submit RC leave form");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="leaving">Leaving Date</Label>
                  <Input id="leaving" name="leaving" type="date" value={values.leaving} onChange={handleChange} onBlur={handleBlur} />
                  {touched.leaving && errors.leaving && <p className="mt-1 text-sm text-red-600">{errors.leaving}</p>}
                </div>
                <div>
                  <Label htmlFor="arrival">Arrival Date</Label>
                  <Input id="arrival" name="arrival" type="date" value={values.arrival} onChange={handleChange} onBlur={handleBlur} />
                  {touched.arrival && errors.arrival && <p className="mt-1 text-sm text-red-600">{errors.arrival}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea id="reason" name="reason" value={values.reason} onChange={handleChange} onBlur={handleBlur} />
                  {touched.reason && errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="alternate">Alternate RC</Label>
                  <select id="alternate" name="alternate" value={values.alternate} onChange={handleChange} onBlur={handleBlur} className="h-9 w-full rounded-md border bg-white px-3 text-sm">
                    <option value="">Select alternate RC</option>
                    {alternateRCs.map((rc) => <option key={rc.id} value={rc.id}>{rc.name} - {rc.hostel}</option>)}
                  </select>
                  {touched.alternate && errors.alternate && <p className="mt-1 text-sm text-red-600">{errors.alternate}</p>}
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Leave Form"}</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {activeTab === "history" && (
        loadingHistory ? <div className="mt-24 text-center text-slate-500">Loading leave history...</div> : leaveHistory.length === 0 ? (
          <EmptyPage title="No leave history found" description="You have not applied for any RC leave yet." />
        ) : (
          <div className="space-y-4">
            {leaveHistory.map((leave, index) => {
              const id = leave.Id ?? leave.id ?? index;
              return (
                <ApprovalCard
                  key={id}
                  title={`Leave #${id}`}
                  subTitle={`${leave.leaving} to ${leave.arrival}`}
                  badge={getRCLeaveBadgeStatus(leave.approved) as BadgeStatusValue}
                  data={{
                    Reason: leave.reason,
                    Leaving: leave.leaving,
                    Arrival: leave.arrival,
                    Status: leave.approved,
                    "Created At": leave.createdAt || leave.created_at,
                  }}
                />
              );
            })}
          </div>
        )
      )}

      {activeTab === "close" && (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Relieve Alternate RC</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">Use this after returning from leave to remove the alternate RC duty assignment.</p>
          <Button className="mt-6" onClick={handleCloseLeave}>Close Leave</Button>
        </div>
      )}
    </div>
  );
}
