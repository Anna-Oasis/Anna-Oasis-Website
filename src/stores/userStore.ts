import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  details: any | null;
  setDetails: (details: any) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      details: null,
      setDetails: (details) => set({ details }),
    }),
    { name: "user-details-store" }
  )
);

export default useUserStore;