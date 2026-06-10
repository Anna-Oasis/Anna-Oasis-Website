interface AttendanceCardProps {
  date: string;
  hostel: string;
  floor: number;
  presentCount: number;
  absentCount: number;
  absentees: string[];
}

const AttendanceCard = ({
  date,
  hostel,
  floor,
  presentCount,
  absentCount,
  absentees,
}: AttendanceCardProps) => {
  const formattedDate = date ? date.split("T")[0] : "";

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">
        {formattedDate} - {hostel} - Floor {floor}
      </h3>
      <p className="mt-2 text-sm text-slate-700">Present: {presentCount}</p>
      <p className="mt-1 text-sm text-slate-700">Absent: {absentCount}</p>
      <p className="mt-1 text-sm text-slate-700">
        Absentees: {absentees.length > 0 ? absentees.join(", ") : "None"}
      </p>
    </div>
  );
};

export default AttendanceCard;
