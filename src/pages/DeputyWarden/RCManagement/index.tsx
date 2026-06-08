/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  fetchAllRCs,
  addRC,
  removeRC,
  assignFloors,
} from "@/utils/deputyWarden/dwRCManagementApi";
import RCRow from "@/components/deputyWarden/RCRow";
import AddRCModal from "@/components/deputyWarden/modals/AddRCModal";
import AssignFloorsModal from "@/components/deputyWarden/modals/AssignFloorsModal";
import {
  Plus,
  Search,
  Users,
  Building2,
  Layers3,
} from "lucide-react";

const RCManagementPage = () => {
  const [rcs, setRcs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [selectedRC, setSelectedRC] = useState<any>(null);

  const loadRCs = async () => {
    try {
      setLoading(true);

      const data = await fetchAllRCs();

      setRcs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setRcs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRCs();
  }, []);

  const handleAddRC = async (data: {
    name: string;
    hostel: string;
    floors: number[];
  }) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("hostel", data.hostel);
      formData.append("floor", JSON.stringify(data.floors));

      await addRC(formData);

      setAddModalOpen(false);

      await loadRCs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRC = async (id: string) => {
    try {
      await removeRC(id);
      await loadRCs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignFloors = async (floors: number[]) => {
    if (!selectedRC) return;

    try {
      await assignFloors(String(selectedRC.id), {
        name: selectedRC.name,
        hostel: selectedRC.hostel,
        floor: floors,
      });

      setAssignModalOpen(false);
      setSelectedRC(null);

      await loadRCs();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRCs = rcs.filter(
    (rc) =>
      rc.name?.toLowerCase().includes(search.toLowerCase()) ||
      rc.hostel?.toLowerCase().includes(search.toLowerCase())
  );

  const totalFloors = rcs.reduce(
    (sum, rc) => sum + (rc.floor?.length || 0),
    0
  );

  const totalHostels = new Set(
    rcs.map((rc) => rc.hostel)
  ).size;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">
          RC Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage Resident Counsellors and floor allocations
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <Users className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Total
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {rcs.length}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Resident Counsellors
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <Building2 className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Coverage
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {totalHostels}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Hostels Assigned
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <Layers3 className="text-[#022B60]" />
            <span className="text-xs text-slate-400">
              Floors
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">
            {totalFloors}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Assignments
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search RC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#022B60]"
          />
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#022B60] px-5 py-3 text-white transition hover:bg-[#033c84]"
        >
          <Plus size={18} />
          Add RC
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm border border-slate-200">
          Loading RC data...
        </div>
      ) : filteredRCs.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-200">
          <Users
            size={60}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="text-xl font-semibold text-slate-700">
            No RC Records Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try adjusting your search or add a new RC.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Hostel
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Floors
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRCs.map((rc, index) => (
                <RCRow
                  key={rc.id || index}
                  id={String(rc.id)}
                  name={rc.name || "-"}
                  hostel={rc.hostel || "-"}
                  floors={rc.floor || []}
                  onEdit={() => {
                    setSelectedRC(rc);
                    setAssignModalOpen(true);
                  }}
                  onDelete={() =>
                    handleDeleteRC(String(rc.id))
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddRCModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddRC}
      />

      <AssignFloorsModal
        open={assignModalOpen}
        currentFloors={selectedRC?.floor || []}
        onClose={() => {
          setAssignModalOpen(false);
          setSelectedRC(null);
        }}
        onSubmit={handleAssignFloors}
      />
    </div>
  );
};

export default RCManagementPage;