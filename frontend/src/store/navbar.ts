import create from "zustand";
import { INavbarOption } from "../types/navbar";

interface INavbarState {
  title: string;
  menuOptions: INavbarOption[];
  setTitle: (title: string) => void;
  setOptions: (options: INavbarOption[]) => void;
}

export const useNavbarStore = create<INavbarState>((set) => ({
  title: "",
  menuOptions: [],
  setTitle: (title: string) => set({ title }),
  setOptions: (options: INavbarOption[]) => set({ menuOptions: options }),
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
