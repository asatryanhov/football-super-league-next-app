import { create } from "zustand";

const useStore = create((set) => ({
  teamsData: {},
  setTeamData: (teamName, data) =>
    set((state) => ({
      teamsData: {
        ...state.teamsData,
        [teamName]: data,
      },
    })),
}));

export default useStore;
