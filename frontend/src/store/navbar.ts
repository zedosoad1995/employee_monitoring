import create from "zustand";

interface IState {
  title: string;
  setTitle: (title: string) => void;
}

export const useNavbarStore = create<IState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
}));
