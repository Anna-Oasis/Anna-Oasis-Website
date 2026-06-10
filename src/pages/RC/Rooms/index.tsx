import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import EmptyPage from "@/components/EmptyPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdmissionSessions, getAllRooms, type AdmissionSession, type Room } from "@/utils/RC/rcAdimissionApi";

export default function RCRoomsPage() {
  const [sessions, setSessions] = useState<AdmissionSession[]>([]);
  const [academicYear, setAcademicYear] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdmissionSessions()
      .then((data) => {
        setSessions(data);
        if (data[0]?.academic_year) setAcademicYear(data[0].academic_year);
      })
      .catch((error) => toast.error(error.response?.data?.message || "Failed to fetch admission sessions"));
  }, []);

  const loadRooms = async () => {
    if (!academicYear) {
      toast.error("Select an academic year first");
      return;
    }
    setLoading(true);
    try {
      setRooms(await getAllRooms(academicYear));
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (academicYear) loadRooms();
  }, [academicYear]);

  const grouped = useMemo(() => {
    return rooms.reduce<Record<number, Room[]>>((acc, room) => {
      const floor = Number(room.floor ?? 0);
      acc[floor] = acc[floor] || [];
      acc[floor].push(room);
      return acc;
    }, {});
  }, [rooms]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Room List</h1>
          <p className="mt-2 text-slate-600">View room occupancy by academic year and floor.</p>
        </div>
        <div className="flex gap-2">
          <select className="h-9 rounded-md border bg-white px-3 text-sm" value={academicYear} onChange={(event) => setAcademicYear(event.target.value)}>
            <option value="">Select academic year</option>
            {sessions.map((session) => <option key={session.id} value={session.academic_year}>{session.academic_year}</option>)}
          </select>
          <Button onClick={loadRooms} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>
        </div>
      </div>

      {!loading && rooms.length === 0 ? (
        <EmptyPage title="No rooms found" description="Select an academic year to load room details." />
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([floor, floorRooms]) => (
            <div key={floor} className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Floor {floor}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Roll Numbers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {floorRooms.map((room) => {
                    const occupants = room.rollNo || [];
                    return (
                      <TableRow key={`${room.hostelBlock}-${room.roomNumber}-${room.academicYear}`}>
                        <TableCell className="font-medium">{room.roomNumber}</TableCell>
                        <TableCell>{room.hostelBlock}</TableCell>
                        <TableCell><Badge variant="secondary">{occupants.length}</Badge></TableCell>
                        <TableCell className="max-w-[520px] whitespace-normal">{occupants.length ? occupants.join(", ") : <span className="text-slate-400">Vacant</span>}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
