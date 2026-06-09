/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  fetchAllRCs,
  addRC,
  removeRC,
  assignFloors,
} from "@/utils/deputyWarden/dwRCManagementApi";
import AddRCModal from "@/components/deputyWarden/modals/AddRCModal";
import AssignFloorsModal from "@/components/deputyWarden/modals/AssignFloorsModal";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";

const FLOOR_LABELS: Record<number, string> = {
  0: "GF",
  1: "FF",
  2: "SF",
  3: "TF",
};

const RCManagementPage = () => {
  const [rcs, setRcs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedRC, setSelectedRC] = useState<any>(null);
  const [deleteMode, setDeleteMode] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-white pb-24">
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16">
          <Loader2 className="h-8 w-8 animate-spin text-[#022B60]" />
        </div>
      ) : rcs.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          No resident counsellors found.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-xs font-medium text-slate-500">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Hostel</th>
              <th className="px-4 py-3 text-left">Floors</th>
              <th className="px-4 py-3 text-left">Assign</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rcs.map((rc, index) => (
              <tr key={rc.id || index}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {rc.name || "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {rc.hostel || "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(rc.floor || []).map((f: number) => (
                      <span
                        key={f}
                        className="rounded-lg bg-[#022B60] px-2 py-0.5 text-xs font-semibold text-white"
                      >
                        {FLOOR_LABELS[f] ?? `F${f}`}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {deleteMode ? (
                    <button
                      onClick={() => handleDeleteRC(String(rc.id))}
                      className="text-red-500 transition hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedRC(rc);
                        setAssignModalOpen(true);
                      }}
                      className="text-[#022B60] transition hover:text-[#033b83]"
                    >
                      <Pencil size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete FAB */}
      <div className="fixed bottom-6 left-6 z-10">
        <button
          onClick={() => setDeleteMode(!deleteMode)}
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:brightness-110 ${
            deleteMode ? "bg-red-700" : "bg-red-500"
          } text-white`}
        >
          <Trash2 size={22} />
        </button>
      </div>

      {/* Add FAB */}
      <div className="fixed bottom-6 right-6 z-10">
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#022B60] text-white shadow-lg transition hover:brightness-110"
        >
          <Plus size={24} />
        </button>
      </div>

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
