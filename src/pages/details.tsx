import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/userStore";
import { Button } from "@/components/ui/button";
import api from "@/api";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!details) {
      navigate("/detailsedit", { replace: true });
    }
  }, [details, navigate]);

  if (!details) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>No Details Found</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(details).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-semibold">{formatKey(key)}</TableCell>
              <TableCell>
                {imageFields.includes(key) && typeof value === "string" && value ? (
                  <img
                    src={value}
                    alt={key}
                    style={{ width: 80, height: 80, borderRadius: 8, objectFit: "contain" }}
                  />
                ) : (
                  <span className={!value ? "text-muted-foreground" : ""}>
                    {value === null || value === undefined || value === "" ? "not assigned yet" : String(value)}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-end">
        <Button onClick={() => navigate("/details-edit")}>Edit Details</Button>
      </div>
    </div>
  );
}