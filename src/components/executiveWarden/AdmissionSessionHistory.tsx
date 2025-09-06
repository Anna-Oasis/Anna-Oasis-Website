import { useEffect, useState } from "react";
import { Pencil, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import AdmissionSessionForm from "./AdmissionSessionForm";
import EmptyPage from "@/components/EmptyPage";
import {
  getAdmissionSessions,
  editAdmissionSession,
} from "@/utils/executiveWarden/ewAdmissionSessionApi";
import { Alert } from "@/components/ui/alert";

const AdmissionSessionHistory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editSession, setEditSession] = useState<any | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    getAdmissionSessions()
      .then((data) => {
        if (data) setSessions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      const data = await getAdmissionSessions();
      if (data) setSessions(data);

      setAlertMessage("Admission session updated successfully.");
      setShowSuccessModal(true);
    } catch (e) {
      setAlertMessage(
        "Edit Error: An error occurred while editing the admission session. Please try again."
      );
      setShowSuccessModal(true);
    }
    setShowModal(false);
    setEditSession(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {sessions.length === 0 ? (
        <EmptyPage
          title="No admission sessions found."
          description="There are currently no admission sessions to display."
        />
      ) : (
        sessions.map((session) => (
          <div
            key={session.id ?? Math.random()}
            className="bg-white rounded-2xl p-5 mb-4 border border-gray-200 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2">
              Academic Year:{" "}
              <span className="font-normal">{session.academic_year}</span>
            </h2>
            <p className="mb-1">
              From: <span className="font-semibold">{session.from}</span>
            </p>
            <p className="mb-1">
              To: <span className="font-semibold">{session.to}</span>
            </p>
            <p className="mb-3">
              Semesters:{" "}
              <span className="font-semibold">
                {Array.isArray(session.semesters)
                  ? session.semesters.join(", ")
                  : ""}
              </span>
            </p>
            <Button
              size="sm"
              onClick={() => {
                setEditSession(session);
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-[#022B60] hover:bg-[#022B60] text-white"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </div>
        ))
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Admission Session</DialogTitle>
            <DialogClose className="absolute right-4 top-4">
              <CloseIcon className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          {editSession && (
            <AdmissionSessionForm
              initialValues={{
                from: editSession.from,
                to: editSession.to,
                semesters: editSession.semesters.map((s: number) => String(s)),
                academic_year: editSession.academic_year,
              }}
              onSubmit={handleEdit}
              editMode
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowModal(false);
                setEditSession(null);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Status</DialogTitle>
          </DialogHeader>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <DialogFooter>
            <Button onClick={() => setShowSuccessModal(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdmissionSessionHistory;
