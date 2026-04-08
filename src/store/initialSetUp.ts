import { create } from "zustand";

interface InitialSetUpState {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (status: boolean) => void;
  userLoginData: any;
  setUserLoginData: (status: any) => void;
}

export const useInitialSetUpStore = create<InitialSetUpState>((set) => ({
  isSideBarOpen: true,
  setIsSideBarOpen: (status) => set({ isSideBarOpen: status }),
  userLoginData: "",
  setUserLoginData: (status) => set({ userLoginData: status }),
}));
