import { useFormikContext } from "formik";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import useUserStore from "@/stores/userStore";
import Text from "@/components/ui/text";

const imageFields = [
  "passportPhotoUrl",
  "studentSignatureUrl",
  "parentGuardianSignatureUrl",
  "categoryProofUrl",
  "admissionSlipUrl",
];

function formatKey(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const PreviewPage = ({
  onEdit,
  onSubmit,
}: {
  onEdit: () => void;
  onSubmit: () => void;
}) => {
  const { values } = useFormikContext<any>();
  const details = useUserStore((state) => state.details);

  // Filter out empty values for cleaner preview
  const formEntries = Object.entries(values).filter(
    ([_, v]) => v !== undefined && v !== ""
  );

 return (
    <Text className="p-4 space-y-8">
        <Text bold className=" p-4 mb-4 text-center text-blue-700">
          Admission Form Preview
        </Text>
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="py-2 font-bold text-base">Field</TableHead>
              <TableHead className="py-2 font-bold text-base">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formEntries.map(([key, value], idx) => (
              <TableRow
                key={key}
                className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}
              >
                <TableCell className="py-2 font-bold text-gray-800">
                  {formatKey(key)}
                </TableCell>
                <TableCell className="py-2">
                  {imageFields.includes(key) && typeof value === "string" && value ? (
                    <img
                      src={value}
                      alt={key}
                      className="w-20 h-20 rounded-lg my-1 object-contain"
                    />
                  ) : (
                    <span
                      className={
                        value === null || value === undefined || value === ""
                          ? "text-gray-400"
                          : "text-gray-800"
                      }
                    >
                      {value === null || value === undefined || value === ""
                        ? "not assigned yet"
                        : String(value)}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      <Text className="bg-white rounded-xl shadow-md mb-4 p-8">
        <Text bold  className="mb-6 py-10 text-center text-blue-700">
          Personal Details
        </Text>
        <Table className="rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="py-2 font-bold text-base">Field</TableHead>
              <TableHead className="py-2 font-bold text-base">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details &&
              Object.entries(details).map(([key, value], idx) => (
                <TableRow
                  key={key}
                  className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}
                >
                  <TableCell className="py-2 font-bold text-gray-800">
                    {formatKey(key)}
                  </TableCell>
                  <TableCell className="py-2">
                    {imageFields.includes(key) && typeof value === "string" && value ? (
                      <img
                        src={value}
                        alt={key}
                        className="w-20 h-20 rounded-lg my-1 object-contain"
                      />
                    ) : (
                      <span
                        className={
                          value === null || value === undefined || value === ""
                            ? "text-gray-400"
                            : "text-gray-800"
                        }
                      >
                        {value === null || value === undefined || value === ""
                          ? "not assigned yet"
                          : String(value)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Text>

      <Text className="flex justify-between mt-6">
        <Button variant="outline" onClick={onEdit} className="transition-all duration-200">
          Back to form
        </Button>
        <Button onClick={onSubmit} className="transition-all duration-200">Submit</Button>
      </Text>
    </Text>
  );
};

export default PreviewPage;