import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import { getStudentDetails } from "@/utils/student/studentDetailsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const imageFields = [
  "passportPhotoUrl",
  "studentSignatureUrl",
  "parentGuardianSignatureUrl",
  "categoryProofUrl",
  "admissionSlipUrl"
];

function formatKey(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DetailsPage() {
  const details = useUserStore((state) => state.details);
  const setDetails = useUserStore((state) => state.setDetails);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetails() {
      if (!details) {
        const response = await getStudentDetails();
        if (response && response.data) {
          setDetails(response.data);
        } else {
          navigate("/User/Student/details/edit", { replace: true });
        }
      }
    }
    fetchDetails();
  }, [details, setDetails, navigate]);

  if (!details) {
    navigate("/User/Student/details/edit", { replace: true });
    return null;
  }

  return (
    <div className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-8 transition-all duration-300">
      <div className="text-2xl font-bold text-blue-700 mb-6">Student Details</div>
      <Table className="rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="py-2 font-bold text-base">Field</TableHead>
            <TableHead className="py-2 font-bold text-base">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(details).map(([key, value], idx) => (
            <TableRow key={key} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
              <TableCell className="py-2 font-bold text-gray-800">{formatKey(key)}</TableCell>
              <TableCell className="py-2">
                {imageFields.includes(key) && typeof value === "string" && value ? (
                  <img
                    src={value}
                    alt={key}
                    className="w-20 h-20 rounded-lg my-1 object-contain"
                  />
                ) : (
                  <span className={!value ? "text-gray-400" : "text-gray-800"}>
                    {value === null || value === undefined || value === "" ? "not assigned yet" : String(value)}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-end">
        <Button onClick={() => navigate("/User/Student/details/edit")} className="transition-all duration-200">
          Edit Details
        </Button>
      </div>
    </div>
  );
}