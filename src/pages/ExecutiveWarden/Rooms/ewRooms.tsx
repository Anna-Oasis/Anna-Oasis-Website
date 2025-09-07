import { useEffect, useState } from "react";
import { Formik } from "formik";
import { getAdmissionSessions } from "@/utils/executiveWarden/ewAdmissionSessionApi";
import { getRoomsByAcademicYear } from "@/utils/executiveWarden/ewRoomApi";
import SelectField from "@/components/formComponents/SelectField";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HelperText from "@/components/HelperText";

const RoomView: React.FC = () => {
  const [sessionOptions, setSessionOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [roomDetails, setRoomDetails] = useState<any>({});

  useEffect(() => {
    getAdmissionSessions()
      .then((data) => {
        const options = data.map((item: any) => ({
          label: item.academic_year,
          value: item.academic_year,
        }));
        setSessionOptions(options);
      })
      .catch((err) => {
        console.error("Error fetching admission sessions:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ academicYear: "" }}
      onSubmit={async (values) => {
        try {
          const data = await getRoomsByAcademicYear(values.academicYear);
          const grouped: Record<string, Record<string, any[]>> = {};
          data.forEach((room: any) => {
            const block = room.hostelBlock || "Unknown Block";
            const floor = String(room.floor ?? "Unknown Floor");
            if (!grouped[block]) grouped[block] = {};
            if (!grouped[block][floor]) grouped[block][floor] = [];
            grouped[block][floor].push(room);
          });
          setRoomDetails(grouped);
        } catch (err) {
          console.error("Error fetching room details:", err);
        }
      }}
    >
      {({ handleSubmit }) => (
        <div className="min-h-screen bg-white p-4">
          <h1 className="text-xl font-bold mb-4">RoomView</h1>
          <HelperText>
            This feature is in development, soon you will be able to have
            filters and search options to view room data for a specific academic
            year.
          </HelperText>

          <SelectField
            label="Academic Year"
            value="academicYear"
            options={sessionOptions}
          />

          <Button onClick={handleSubmit as any} className="mt-3 mb-4">
            View room data
          </Button>

          <div className="space-y-8">
            {Object.keys(roomDetails).length === 0 && (
              <p className="text-center mt-8 text-gray-400">
                No room data to display.
              </p>
            )}

            {Object.entries(roomDetails).map(
              ([block, floors], blockIdx, arr) => (
                <div key={block} className="mb-8">
                  <div className="flex justify-center">
                    <h2 className="font-bold text-lg mb-1">{block}</h2>
                  </div>

                  {blockIdx !== arr.length - 1 && (
                    <Separator className="my-2" />
                  )}

                  {Object.entries(floors as Record<string, any[]>).map(
                    ([floor, rooms]) => (
                      <div key={floor} className="mb-5">
                        <h3 className="text-base font-semibold mb-2 text-slate-700">
                          Floor {floor}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {rooms.map((room, idx) => (
                            <div
                              key={room.roomNumber ?? idx}
                              className="w-[30%] bg-slate-100 rounded-xl py-3 px-2 shadow-sm"
                            >
                              <p className="font-bold text-base text-slate-900 mb-1">
                                Room {room.roomNumber}
                              </p>
                              <p className="text-xs text-slate-500 text-center">
                                {room.rollNo &&
                                Array.isArray(room.rollNo) &&
                                room.rollNo.length > 0
                                  ? room.rollNo.join(", ")
                                  : "Vacant"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RoomView;
