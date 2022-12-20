import create from "zustand";

interface INavbarState {
  title: string;
  setTitle: (title: string) => void;
}

export const useNavbarStore = create<INavbarState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
}));

interface INavbarExcelState {
  hasOptions: boolean;
  canDownload: boolean;
  setCanDownload: (canDownload: boolean) => void;
  setHasOptions: (hasOptions: boolean) => void;
}

export const useExcelNavbarStore = create<INavbarExcelState>((set) => ({
  hasOptions: false,
  canDownload: false,
  setCanDownload: (canDownload: boolean) => set({ canDownload }),
  setHasOptions: (hasOptions: boolean) => set({ hasOptions }),
}));
