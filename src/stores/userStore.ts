import { create } from "zustand";


interface UserStore {
  details: any | null;
  setDetails: (details: any) => void;
}

const useUserStore = create<UserStore>((set) => ({
  details: null,
  setDetails: (details) => set({ details }),
}));

export default useUserStore;
