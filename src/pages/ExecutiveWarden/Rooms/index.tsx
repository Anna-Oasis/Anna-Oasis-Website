import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Loader2 } from "lucide-react"; // Replaced ActivityIndicator
import { getAdmissionSessions } from "@/utils/executiveWarden/ewAdmissionSessionApi";
import { getRoomsByAcademicYear } from "@/utils/executiveWarden/ewRoomApi";
import SelectField from "@/components/formComponents/SelectField";
import HelperText from "@/components/HelperText";

const RoomView = () => {
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
      <div className="flex flex-col min-h-[60vh] w-full justify-center items-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 font-medium text-sm">
          Loading academic sessions...
        </p>
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
        <div className="min-h-screen w-full bg-white text-gray-900 px-4 py-6">
          <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
            {/* Header section */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Room View
              </h1>
              <div className="mt-2">
                <HelperText>
                  This feature is in development, soon you will be able to have
                  filters and search options to view room data for a specific
                  academic year.
                </HelperText>
              </div>
            </div>

            {/* Filter Configuration Controls Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-col md:flex-row md:items-end gap-4 max-w-2xl"
            >
              <div className="flex-1">
                <SelectField
                  label="Academic Year"
                  value="academicYear"
                  options={sessionOptions}
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors duration-200 text-sm h-10 flex items-center justify-center shrink-0"
              >
                View room data
              </button>
            </form>

            {/* Scrollable Data View Presentation Area */}
            <div className="flex-1 overflow-y-auto">
              {Object.keys(roomDetails).length === 0 && (
                <p className="text-center py-12 text-gray-400 font-medium text-sm">
                  No room data to display. Select an academic year above.
                </p>
              )}

              {Object.entries(roomDetails).map(
                ([block, floors], blockIdx, arr) => (
                  <div
                    key={block}
                    className="mb-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                  >
                    {/* Block Title Container */}
                    <div className="text-center mb-6">
                      <h2 className="font-bold text-xl text-gray-800 tracking-tight">
                        {block}
                      </h2>
                      {blockIdx !== arr.length - 1 && (
                        <div className="w-24 h-0.5 bg-gray-100 mx-auto mt-2" />
                      )}
                    </div>

                    {/* Floor Allocation Tree Mapping */}
                    {Object.entries(floors as Record<string, any[]>).map(
                      ([floor, rooms]) => (
                        <div key={floor} className="mb-6 last:mb-0">
                          <h3 className="text-sm font-semibold mb-3 text-slate-500 uppercase tracking-wider">
                            Floor {floor}
                          </h3>

                          {/* Responsive Room Box grid container */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {rooms.map((room, idx) => (
                              <div
                                key={room.roomNumber ?? idx}
                                className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-200 hover:border-slate-200"
                              >
                                <span className="font-bold text-sm text-slate-800">
                                  Room {room.roomNumber}
                                </span>
                                <span className="text-[11px] text-slate-500 font-medium mt-1 break-all line-clamp-2">
                                  {room.rollNo &&
                                  Array.isArray(room.rollNo) &&
                                  room.rollNo.length > 0
                                    ? room.rollNo.join(", ")
                                    : "Vacant"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RoomView;
