import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import EmptyPage from "@/components/EmptyPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllRCStudentsForAttendance, getAttendanceHistory, submitRCAttendance, type AttendanceRecord } from "@/utils/RC/rcAttendanceApi";
import type { RCStudent } from "@/utils/RC/rcStudentsApi";

export default function RCAttendancePage() {
  const [activeTab, setActiveTab] = useState<"submit" | "history">("submit");
  const [students, setStudents] = useState<RCStudent[]>([]);
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [floor, setFloor] = useState<number | null>(null);
  const [presentRolls, setPresentRolls] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentData, historyData] = await Promise.all([getAllRCStudentsForAttendance(), getAttendanceHistory()]);
      setStudents(studentData);
      setHistory(historyData);
      const firstFloor = studentData.find((student) => student.floor !== null && student.floor !== undefined)?.floor;
      if (firstFloor !== undefined && firstFloor !== null) setFloor(Number(firstFloor));
      setPresentRolls(new Set(studentData.map((student) => student.rollNo)));
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to load attendance data");
      setStudents([]);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const floors = useMemo(() => Array.from(new Set(students.map((s) => s.floor).filter((v): v is number => v !== null && v !== undefined))).sort((a, b) => a - b), [students]);
  const hostelBlock = students[0]?.hostelBlock || "";
  const floorStudents = useMemo(() => students.filter((student) => Number(student.floor) === Number(floor)), [students, floor]);

  const studentsByRoom = useMemo(() => {
    return floorStudents.reduce<Record<string, RCStudent[]>>((acc, student) => {
      const room = String(student.roomNumber ?? "Not assigned");
      acc[room] = acc[room] || [];
      acc[room].push(student);
      return acc;
    }, {});
  }, [floorStudents]);

  const togglePresent = (rollNo: string) => {
    setPresentRolls((prev) => {
      const next = new Set(prev);
      if (next.has(rollNo)) next.delete(rollNo);
      else next.add(rollNo);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (floor === null || !hostelBlock) {
      toast.error("Select a floor with students before submitting attendance");
      return;
    }
    const absentee = floorStudents.filter((student) => !presentRolls.has(student.rollNo)).map((student) => student.rollNo);
    const payload = {
      date: new Date().toISOString().slice(0, 10),
      hostel: hostelBlock,
      floor,
      no_present: floorStudents.length - absentee.length,
      no_absent: absentee.length,
      absentee,
    };
    setSubmitting(true);
    try {
      await submitRCAttendance(payload);
      toast.success("Attendance submitted successfully");
      const historyData = await getAttendanceHistory();
      setHistory(historyData);
      setActiveTab("history");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to submit attendance");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Attendance</h1>
          <p className="mt-2 text-slate-600">Mark floor-wise student attendance and review submission history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={activeTab === "submit" ? "default" : "outline"} onClick={() => setActiveTab("submit")}>Submit Attendance</Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => setActiveTab("history")}>History</Button>
        </div>
      </div>

      {loading ? (
        <div className="mt-24 text-center text-slate-500">Loading attendance data...</div>
      ) : activeTab === "submit" ? (
        students.length === 0 ? <EmptyPage title="No students found" description="No students are mapped to your assigned floors." /> : (
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Floor</span>
              {floors.map((item) => <Button key={item} variant={floor === item ? "default" : "outline"} onClick={() => setFloor(item)}>Floor {item}</Button>)}
              <Badge variant="secondary">Hostel: {hostelBlock}</Badge>
            </div>
            <div className="space-y-4">
              {Object.entries(studentsByRoom).map(([room, roomStudents]) => (
                <div key={room} className="rounded-lg border bg-white p-4 shadow-sm">
                  <h2 className="mb-3 text-lg font-semibold text-slate-900">Room {room}</h2>
                  <div className="grid gap-2 md:grid-cols-2">
                    {roomStudents.map((student) => (
                      <label key={student.rollNo} className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-slate-50">
                        <input type="checkbox" checked={presentRolls.has(student.rollNo)} onChange={() => togglePresent(student.rollNo)} />
                        <span className="font-medium text-slate-800">{student.rollNo}</span>
                        <span className="text-slate-600">{student.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button onClick={handleSubmit} disabled={submitting || floorStudents.length === 0}>{submitting ? "Submitting..." : "Submit Attendance"}</Button>
              <span className="text-sm text-slate-600">Present: {floorStudents.filter((s) => presentRolls.has(s.rollNo)).length} | Absent: {floorStudents.filter((s) => !presentRolls.has(s.rollNo)).length}</span>
            </div>
          </div>
        )
      ) : history.length === 0 ? (
        <EmptyPage title="No attendance history found" description="Attendance submissions will appear here." />
      ) : (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Absentees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.hostel}</TableCell>
                  <TableCell>{item.floor}</TableCell>
                  <TableCell>{item.no_present}</TableCell>
                  <TableCell>{item.no_absent}</TableCell>
                  <TableCell className="max-w-[420px] whitespace-normal">{item.absentee?.length ? item.absentee.join(", ") : "None"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
