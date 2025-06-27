import React, { useEffect, useState } from "react";
import {
  getAllManagerAdmissions,
  managerApprove,
  managerDecline,
} from "../../utils/manager/managerAdmissionApi";
import ApprovalCard, { badgeStatus, type BadgeStatusValue } from "@/components/approvalCard";
import { getAdmissionBadgeStatus } from "@/utils/getBadgeStatus";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Inbox } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ManagerPaymentVerificationsPage: React.FC = () => {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineComment, setDeclineComment] = useState("");
  const [selectedAdmissionId, setSelectedAdmissionId] = useState<string | null>(
    null
  );

  const fetchAdmissions = async () => {
    try {
      const data = await getAllManagerAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching manager admissions:", err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleApprove = async (admissionId: string) => {
    try {
      await managerApprove(admissionId);
      fetchAdmissions();
    } catch (err) {
      alert("Approval failed.");
    }
  };

  const handleDecline = (admissionId: string) => {
    setSelectedAdmissionId(admissionId);
    setShowDeclineModal(true);
  };

  const handleDeclineSubmit = async () => {
    try {
      await managerDecline(selectedAdmissionId!, declineComment);
      setShowDeclineModal(false);
      setDeclineComment("");
      setSelectedAdmissionId(null);
      fetchAdmissions();
    } catch (err) {
      alert("Decline failed.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <p className='text-2xl text-center'>Manager Verfication</p>
      {admissions.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center text-gray-500">
          <Inbox className="w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold">No pending verifications</h2>
          <p className="text-sm mt-1">All admissions have been reviewed.</p>
        </div>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {admissions.map((admission) => (
            <ApprovalCard
              key={admission.id}
              title={admission.roll_number}
              subTitle={`Block: ${admission.hostelBlock}, Year: ${admission.academicYear}`}
              badge={getAdmissionBadgeStatus(admission.status) as BadgeStatusValue}
              data={admission}
              onApprove={() => handleApprove(admission.id)}
              onDecline={() => handleDecline(admission.id)}
            />
          ))}
        </div>
      )}

      {/* Decline Modal */}
      <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Decline Admission</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason for declining"
            value={declineComment}
            onChange={(e) => setDeclineComment(e.target.value)}
            className="mt-2"
          />
          <DialogFooter className="mt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeclineModal(false);
                setDeclineComment("");
                setSelectedAdmissionId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeclineSubmit}
              disabled={!declineComment.trim()}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagerPaymentVerificationsPage;
