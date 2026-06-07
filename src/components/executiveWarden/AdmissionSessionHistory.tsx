import { useEffect, useState } from "react";
import { Pencil, X as CloseIcon } from "lucide-react"; // Standard web Lucide icons
import AdmissionSessionForm from "./AdmissionSessionForm";
import EmptyPage from "@/components/EmptyPage";
import {
  getAdmissionSessions,
  editAdmissionSession,
} from "@/utils/executiveWarden/ewAdmissionSessionApi";
import ModalCallable from "@/components/modals/ModalCallable";

const AdmissionSessionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editSession, setEditSession] = useState<any | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchSessions = async () => {
    try {
      const data = await getAdmissionSessions();
      if (data) setSessions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleEdit = async (values: any) => {
    if (!editSession) return;
    try {
      await editAdmissionSession(editSession.id, {
        from: values.from,
        to: values.to,
        semesters: values.semesters.map((s: string) => Number(s)),
        academic_year: values.academic_year,
      });
      await fetchSessions();
      setShowSuccessModal(true);
      setShowModal(false);
      setEditSession(null);
    } catch (e) {
      alert(
        "An error occurred while editing the admission session. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 max-w-4xl mx-auto">
      {sessions.length === 0 ? (
        <EmptyPage
          title="No admission sessions found."
          description="There are currently no admission sessions to display."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id ?? Math.random()}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  Academic Year:{" "}
                  <span className="font-normal text-gray-600">
                    {session.academic_year}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  From:{" "}
                  <span className="font-semibold text-gray-900">
                    {session.from}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  To:{" "}
                  <span className="font-semibold text-gray-900">
                    {session.to}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Semesters:{" "}
                  <span className="font-semibold text-gray-900">
                    {Array.isArray(session.semesters)
                      ? session.semesters.join(", ")
                      : ""}
                  </span>
                </p>
              </div>

              <button
                className="self-end inline-flex items-center gap-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 text-gray-700 font-medium py-1.5 px-3.5 rounded-lg transition-colors text-sm"
                onClick={() => {
                  setEditSession(session);
                  setShowModal(true);
                }}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modern Web Overlay Modal Component */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Edit Admission Session
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditSession(null);
                }}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              {editSession && (
                <AdmissionSessionForm
                  initialValues={{
                    from: editSession.from,
                    to: editSession.to,
                    semesters: editSession.semesters.map((s: number) =>
                      String(s),
                    ),
                    academic_year: editSession.academic_year,
                  }}
                  onSubmit={handleEdit}
                  editMode
                />
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditSession(null);
                }}
                className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalCallable
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message="Admission session updated successfully."
      />
    </div>
  );
};

export default AdmissionSessionHistory;
