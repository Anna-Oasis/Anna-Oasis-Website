import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyPage from "@/components/EmptyPage";
import { getRCDetails, type RCDetails } from "@/utils/RC/rcDetailsApi";

const imageFields = new Set(["passportPhotoUrl", "rcSignatureUrl"]);
const hiddenFields = new Set(["userId"]);

function formatKey(key: string) {
  return key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function RCDetailsPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<RCDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDetails = async () => {
    setLoading(true);
    try {
      setDetails(await getRCDetails());
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch RC details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">RC Details</h1>
          <p className="mt-2 text-slate-600">Your profile information used by the hostel workflow.</p>
        </div>
        <Button onClick={() => navigate("/RC/Details/Edit")}>
          <Pencil className="h-4 w-4" /> {details ? "Edit Details" : "Fill Details"}
        </Button>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center text-slate-600">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading details...
        </div>
      ) : !details ? (
        <EmptyPage title="No RC details found" description="Fill your details to complete your RC profile." />
      ) : (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(details)
                .filter(([key]) => !hiddenFields.has(key))
                .map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium text-slate-700">{formatKey(key)}</TableCell>
                    <TableCell className="text-slate-800">
                      {imageFields.has(key) && typeof value === "string" && value ? (
                        <img src={value} alt={formatKey(key)} className="h-24 w-24 rounded-md border object-contain" />
                      ) : value === null || value === undefined || value === "" ? (
                        <span className="text-slate-400">Not assigned yet</span>
                      ) : (
                        String(value)
                      )}
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
