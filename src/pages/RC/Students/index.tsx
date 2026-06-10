import { useEffect, useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import EmptyPage from "@/components/EmptyPage";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRCStudents, type RCStudent } from "@/utils/RC/rcStudentsApi";

export default function RCStudentsPage() {
  const [students, setStudents] = useState<RCStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRCStudents()
      .then(setStudents)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to fetch students"))
      .finally(() => setLoading(false));
  }, []);

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((student) => [student.name, student.rollNo, student.email, student.course, student.branch, student.hostelBlock]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q)));
  }, [students, query]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">RC Students</h1>
          <p className="mt-2 text-slate-600">Students mapped to your hostel block and assigned floors.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input className="pl-9" placeholder="Search name, roll no, email..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center text-slate-600">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading students...
        </div>
      ) : filteredStudents.length === 0 ? (
        <EmptyPage title="No students found" description={query ? "No students match your search." : "No students are currently mapped to you."} />
      ) : (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm text-slate-600">Showing {filteredStudents.length} of {students.length} students</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.rollNo}>
                  <TableCell className="font-medium">{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.roomNumber ?? <span className="text-slate-400">N/A</span>}</TableCell>
                  <TableCell>{student.floor ?? <span className="text-slate-400">N/A</span>}</TableCell>
                  <TableCell><Badge variant="secondary">{student.course}</Badge></TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{student.mobile}</div>
                      <div className="text-slate-500">{student.email}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
