/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  fetchAllRCs,
  addRC,
  removeRC,
  assignFloors,
} from "@/utils/deputyWarden/dwRCManagementApi";
import RCCard from "@/components/deputyWarden/RCCard";
import AddRCModal from "@/components/deputyWarden/modals/AddRCModal";
import AssignFloorsModal from "@/components/deputyWarden/modals/AssignFloorsModal";
import {
  Plus,
  Search,
  Users,
  Building2,
  Layers3,
  Loader2,
  UserCheck,
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
    } catch {
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
    email: string;
    password: string;
    hostel: string;
    floors: number[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
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

  const activeRCs = rcs.filter((rc) => !rc.onLeave).length;
  const totalFloors = rcs.reduce((sum, rc) => sum + (rc.floor?.length || 0), 0);
  const totalHostels = new Set(rcs.map((rc) => rc.hostel)).size;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#022B60]">RC Management</h1>
        <p className="mt-2 text-slate-500">
          Manage Resident Counsellors and floor allocations
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Users size={20} className="text-[#022B60]" />
            </div>
            <span className="text-xs text-slate-400">Total</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#022B60]">{rcs.length}</h2>
          <p className="mt-1 text-sm text-slate-500">Resident Counsellors</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <UserCheck size={20} className="text-green-600" />
            </div>
            <span className="text-xs text-slate-400">Status</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-green-600">{activeRCs}</h2>
          <p className="mt-1 text-sm text-slate-500">Active RCs</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Building2 size={20} className="text-purple-600" />
            </div>
            <span className="text-xs text-slate-400">Coverage</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-purple-600">{totalHostels}</h2>
          <p className="mt-1 text-sm text-slate-500">Hostels Covered</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Layers3 size={20} className="text-amber-600" />
            </div>
            <span className="text-xs text-slate-400">Assignments</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-amber-600">{totalFloors}</h2>
          <p className="mt-1 text-sm text-slate-500">Floors Assigned</p>
        </div>
      </div>

      {/* Search + Action */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name or hostel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#022B60]"
          />
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#022B60] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#033c84]"
        >
          <Plus size={18} />
          Create Resident Counsellor
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 shadow-sm">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#022B60]" />
          <p className="text-sm text-slate-500">Loading RC data...</p>
        </div>
      ) : filteredRCs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <Users size={52} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-700">No RC Records Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            {search
              ? "No RCs match your search."
              : "Create a new Resident Counsellor to get started."}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRCs.map((rc, index) => (
            <RCCard
              key={rc.id || index}
              id={String(rc.id)}
              name={rc.name || "—"}
              email={rc.email}
              hostel={rc.hostel || "—"}
              floors={rc.floor || []}
              isOnLeave={!!rc.onLeave}
              onEditFloors={() => {
                setSelectedRC(rc);
                setAssignModalOpen(true);
              }}
              onDelete={() => handleDeleteRC(String(rc.id))}
            />
          ))}
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
