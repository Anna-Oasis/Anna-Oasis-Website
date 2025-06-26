import React, { useEffect, useState } from 'react';
import ApprovalCard, { badgeStatus, type BadgeStatusValue } from '@components/approvalCard';
import { getAllRCAdmissions, allocateRoomAdmission } from '../../../utils/RC/rcAdimissionApi';
import { getAdmissionBadgeStatus } from '@/utils/getBadgeStatus';
import { useNavigate } from 'react-router';
import EmptyPage from '@/components/EmptyPage';



const RoomAllocationPage: React.FC = () => {
  const [admissions, setAdmissions] = useState<any>([]);
  const navigate = useNavigate();

  const fetchAdmissions = async () => {
    try {
      const data = await getAllRCAdmissions();
      setAdmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching RC admissions:', err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleApprove = (admissionId: string) => {
    navigate(`/RC/RoomAllocation/Approve/${admissionId}`);
    console.log('Approved');
  };

  const handleDecline = async (admissionId: string) => {
    await allocateRoomAdmission(admissionId, {
      approve: false,
      comment: 'Declined',
      room: 99,
      floor: 99,
      hostel_block: 'Flora',
    });
    fetchAdmissions();
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <p className='text-2xl text-center'>RC Room Allocation</p>
      {admissions.length === 0 ? (
        <EmptyPage
          title="No pending room allocations"
          description="All admissions have been reviewed."
        />
      ) : (
        <div className="space-y-6">
          {admissions.map((item : any, idx : number) => (
            <ApprovalCard
              key={item.admission.id || idx}
              title={item.student.name}
              subTitle={`Roll: ${item.admission.roll_number}, Block: ${item.admission.hostelBlock}, Year: ${item.admission.academicYear}`}
              badge={getAdmissionBadgeStatus(item.admission.status) as BadgeStatusValue}
              data={{ ...item.admission, ...item.student }}
              onApprove={() => handleApprove(String(item.admission.id))}
              onDecline={() => handleDecline(String(item.admission.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomAllocationPage;
