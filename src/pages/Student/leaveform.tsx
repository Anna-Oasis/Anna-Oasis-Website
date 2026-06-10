import useUserStore from "@/stores/userStore";
import { useState } from "react";
import { submitLeaveForm } from "@/utils/student/studentLeaveApi";
import { fetchLeaveForms } from "@/utils/student/studentLeaveApi";
import { useEffect } from "react";
import ApprovalCard, { badgeStatus } from "@/components/approvalCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Formik } from "formik";
import leaveValidation from "@/constants/leaveValidation";

export default function LeaveFormPage() {
    const details = useUserStore((state) => state.details);
    const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<"form" | "history">("form");

    
    const handleFormikSubmit = async (values: any, { resetForm }: any) => {
    try {
        const payload = {
        roll_number: details?.rollNo,
        leave_type: values.leave_type,
        from_date: values.from_date,
        to_date: values.to_date,
        reason: values.reason,
        address_of_stay: values.address_of_stay,
        mobile: values.mobile,
        email: values.email,
        };

        await submitLeaveForm(payload);
        await loadHistory();

        toast.success("Leave Application Submitted Successfully");

        resetForm();
    } catch (error) {
        console.error(error);
        toast.error("Failed to submit leave application");
    }
    };
    const loadHistory = async () => {
        try {
            if (!details?.rollNo) return;

            const data = await fetchLeaveForms(details.rollNo);

            console.log("Leave History:", data);

            setLeaveHistory(data);
        } catch (error) {
            console.error("Failed to load leave history", error);
        }
    };
    useEffect(() => {
    loadHistory();
    }, []);
  return (
    <div className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-8 transition-all duration-300">
        <div className="mb-6">
            <div className="text-2xl font-bold text-blue-700 mb-2">
                Leave Application
            </div>

            <div className="text-gray-500 text-sm">
                Submit a leave request and track its approval status.
            </div>
        </div>
        <div className="flex gap-2 mb-6">
            <button
                onClick={() => setActiveTab("form")}
                className={`px-4 py-2 rounded ${
                activeTab === "form"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
            >
                Leave Form
            </button>

            <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded ${
                activeTab === "history"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
            >
                History
            </button>
        </div>
        {activeTab === "form" && (
            <Formik
                initialValues={{
                leave_type: "",
                from_date: "",
                to_date: "",
                reason: "",
                address_of_stay: "",
                mobile: "",
                email: "",
                }}
                validationSchema={leaveValidation}
                onSubmit={handleFormikSubmit}
            >
                {({ values,
                    errors,
                    touched,
                    handleBlur,
                    setTouched,
                    validateForm,
                    setFieldValue,
                    submitForm,
                }) => (
                <div>
                    
                    <p>Roll Number: {details?.rollNo}</p>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            Leave Type
                        </label>

                        <select
                            className="border p-2 rounded w-full"
                            value={values.leave_type}
                            name="leave_type"
                            onBlur={handleBlur}
                            onChange={(e) =>
                            setFieldValue("leave_type", e.target.value)
                            }
                            >
                            <option value="">Select Leave Type</option>
                            <option value="medical">Medical Leave</option>
                            <option value="emergency">Emergency Leave</option>
                            <option value="specialVacation">
                                Special Vacation Leave
                            </option>
                            <option value="personal">Personal Leave</option>
                            <option value="other">Other</option>
                        </select>
                        {touched.leave_type && errors.leave_type && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.leave_type}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            From Date
                        </label>

                        <input
                            type="date"
                            name="from_date"
                            onBlur={handleBlur}
                            className="border p-2 rounded w-full"
                            value={values.from_date}
                            onChange={(e) =>
                            setFieldValue("from_date", e.target.value)
                            }
                        />
                        {touched.from_date && errors.from_date && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.from_date}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            To Date
                        </label>

                        <input
                            type="date"
                            name="to_date"
                            onBlur={handleBlur}
                            className="border p-2 rounded w-full"
                            value={values.to_date}
                            onChange={(e) =>
                            setFieldValue("to_date", e.target.value)
                            }
                        />
                        {touched.to_date && errors.to_date && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.to_date}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            Reason
                        </label>

                        <input
                            className="border p-2 rounded w-full"
                            value={values.reason}
                            name="reason"
                            onBlur={handleBlur}
                            onChange={(e) =>
                            setFieldValue("reason", e.target.value)
                            }
                            placeholder="Enter reason for leave"
                        />
                        {touched.reason && errors.reason && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.reason}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            Address of Stay
                        </label>

                        <textarea
                            className="border p-2 rounded w-full min-h-[100px]"
                            value={values.address_of_stay}
                            name="address_of_stay"
                            onBlur={handleBlur}
                            onChange={(e) =>
                            setFieldValue("address_of_stay", e.target.value)
                            }
                            placeholder="Enter full address with door no, street, area, district, country"
                        />
                        {touched.address_of_stay && errors.address_of_stay && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address_of_stay}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            Emergency Contact Number
                        </label>

                        <input
                            type="tel"
                            name="mobile"
                            onBlur={handleBlur}
                            className="border p-2 rounded w-full"
                            value={values.mobile}
                            onChange={(e) =>
                            setFieldValue("mobile", e.target.value)
                            }
                            placeholder="Enter emergency contact number"
                        />
                        {touched.mobile && errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.mobile}
                        </p>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-medium">
                            Guardian Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            onBlur={handleBlur}
                            className="border p-2 rounded w-full"
                            value={values.email}
                            onChange={(e) =>
                            setFieldValue("email", e.target.value)
                            }
                            placeholder="Enter guardian email address"
                        />
                        {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <Button
                            type="button"
                            onClick={async () => {
                            const formErrors = await validateForm();

                            setTouched({
                                leave_type: true,
                                from_date: true,
                                to_date: true,
                                reason: true,
                                address_of_stay: true,
                                mobile: true,
                                email: true,
                            });

                            if (Object.keys(formErrors).length > 0) {
                                toast.error(
                                Object.values(formErrors)[0] as string
                                );
                                return;
                            }

                            submitForm();
                            }}
                            >
                            Submit Leave Application
                        </Button>
                    </div>
                </div>
                )}
            </Formik>
        )}
        
        {activeTab === "history" && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Leave History</h2>

            {leaveHistory.length === 0 ? (
                <p>No leave applications found.</p>
            ) : (
                leaveHistory.map((leave) => (
                <ApprovalCard
                    key={leave.id}
                    title={`${leave.leave_type} Leave`}
                    subTitle={`${leave.from_date} to ${leave.to_date}`}
                    badge={
                    leave.status === "2"
                        ? badgeStatus.Approved
                        : leave.status === "-1"
                        ? badgeStatus.Rejected
                        : badgeStatus.Pending
                    }
                    data={{
                    "Leave Type": leave.leave_type,
                    "From Date": leave.from_date,
                    "To Date": leave.to_date,
                    Reason: leave.reason,
                    "Address of Stay": leave.address_of_stay,
                    Mobile: leave.mobile,
                    Email: leave.email,
                    Status:
                        leave.status === "2"
                        ? "Approved"
                        : leave.status === "-1"
                        ? "Rejected"
                        : "Pending",
                    }}
                />
                ))
            )}
        </div>
        )}
    </div>
  );
}