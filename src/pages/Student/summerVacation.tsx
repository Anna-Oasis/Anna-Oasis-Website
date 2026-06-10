import { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "sonner";

import useUserStore from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import ApprovalCard, { badgeStatus } from "@/components/approvalCard";

import summerVacationValidation from "@/constants/summerVacationValidation";

import {
  submitSummerVacationRequest,
  fetchSummerVacationForms,
  type SummerVacationForm,
  VacationStatusMap,
} from "@/utils/student/summerVacationApi";

export default function SummerVacationPage() {
  const details = useUserStore((state) => state.details);

  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [history, setHistory] = useState<SummerVacationForm[]>([]);

  const hostelItemsOptions = [
    "AC Remote",
    "Room Keys",
    "Lan Cable",
    "Cupboard Keys",
  ];

  const loadHistory = async () => {
    try {
      if (!details?.rollNo) return;

      const response = await fetchSummerVacationForms(
        details.rollNo
      );

      if (response?.data) {
        setHistory(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const getBadge = (status: string) => {
    if (status === "2") return badgeStatus.Approved;
    if (status === "-1") return badgeStatus.Rejected;
    return badgeStatus.Pending;
  };

  return (
    <div className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-8 transition-all duration-300">
      <div className="mb-6">
        <div className="text-2xl font-bold text-blue-700 mb-2">
          Summer Vacation
        </div>

        <div className="text-gray-500 text-sm">
          Submit your vacation request and track approval status.
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
          Vacation Form
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Submitted Requests
        </button>
      </div>

      {activeTab === "form" && (
        <Formik
          initialValues={{
            email: "",
            mobile: "",
            vacation_from: "",
            address_of_stay: "",
            returned_items: [] as string[],
          }}
          validationSchema={summerVacationValidation}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (values, { resetForm }) => {
            try {
              await submitSummerVacationRequest({
                roll_number: details?.rollNo,
                email: values.email,
                mobile: values.mobile,
                vacation_from: values.vacation_from,
                address_of_stay: values.address_of_stay,
                returned_items: values.returned_items,
              });

              await loadHistory();

              toast.success(
                "Summer Vacation Request Submitted Successfully"
              );

              resetForm();
            } catch (error) {
              toast.error(
                "Failed to submit vacation request"
              );
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            setFieldValue,
            setFieldTouched,
            setTouched,
            validateForm,
            submitForm,
          }) => (
            <div>
              <p className="mb-4">
                Roll Number: {details?.rollNo}
              </p>

              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Parent Email
                </label>

                <input
                    name="email"
                    type="email"
                    className="border p-2 rounded w-full"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={(e) =>
                        setFieldValue("email", e.target.value)
                    }
                    />

                    {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>
                    )}
              </div>

              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Mobile Number
                </label>

                <input
                  name="mobile"
                  className="border p-2 rounded w-full"
                  value={values.mobile}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue(
                      "mobile",
                      e.target.value
                    )
                  }
                />
                {touched.mobile && errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.mobile}
                </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Vacation From
                </label>

                <input
                  type="date"
                  name="vacation_from"
                  onBlur={handleBlur}
                  className="border p-2 rounded w-full"
                  value={values.vacation_from}
                  onChange={(e) =>
                    setFieldValue(
                      "vacation_from",
                      e.target.value
                    )
                  }
                />
                {touched.vacation_from && errors.vacation_from && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.vacation_from}
                </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Address Of Stay
                </label>

                <textarea
                  className="border p-2 rounded w-full min-h-[100px]"
                  value={values.address_of_stay}
                  name="address_of_stay"
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue(
                      "address_of_stay",
                      e.target.value
                    )
                  }
                />
                {touched.address_of_stay && errors.address_of_stay && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.address_of_stay}
                </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Returned Items
                </label>

                {hostelItemsOptions.map((item) => (
                  <label
                    key={item}
                    className="flex gap-2 mb-2"
                  >
                    <input
                      name="returned_items"
                      type="checkbox"
                      checked={values.returned_items.includes(
                        item
                      )}
                      onBlur={() =>
                        setFieldTouched("returned_items", true)
                        }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue(
                            "returned_items",
                            [
                              ...values.returned_items,
                              item,
                            ]
                          );
                        } else {
                          setFieldValue(
                            "returned_items",
                            values.returned_items.filter(
                              (x) => x !== item
                            )
                          );
                        }
                      }}
                    />
                    {item}
                  </label>
                ))}
                {touched.returned_items && errors.returned_items && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.returned_items}
                </p>
                )}
              </div>

              <div className="mt-6">
                
                <Button
                  type="button"
                  onClick={async () => {
                    const formErrors = await validateForm();

                    setTouched({
                    email: true,
                    mobile: true,
                    vacation_from: true,
                    address_of_stay: true,
                    returned_items: true,
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
                  Submit Vacation Request
                </Button>
              </div>
            </div>
          )}
        </Formik>
      )}

      {activeTab === "history" && (
        <div>
          {history.length === 0 ? (
            <p>No vacation requests found.</p>
          ) : (
            history.map((form) => (
              <ApprovalCard
                key={form.id}
                title={`Form #${form.id}`}
                subTitle={`Vacation From: ${new Date(
                    form.vacation_from
                    ).toLocaleDateString()}`}
                badge={getBadge(form.status)}
                data={{
                  "Address of Stay":
                    form.address_of_stay,
                  "Returned Items":
                    form.returned_items.join(", "),
                  Status:
                    VacationStatusMap[
                      form.status
                    ],
                  SubmittedOn: new Date(
                    form.created_at
                    ).toLocaleString(),
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}