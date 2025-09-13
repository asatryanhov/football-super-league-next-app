import { create } from "zustand";

interface TeamData {
  statistics?: any;
}

interface StoreState {
  teamsData: Record<string, TeamData>;
  setTeamData: (teamName: string, data: TeamData) => void;
  clearAllData: () => void;
  refreshData: () => void;
}

const useStore = create<StoreState>((set) => ({
  teamsData: {},
  setTeamData: (teamName, data) => {
    console.log(`Store: Setting data for ${teamName}:`, data);
    set((state) => {
      const newState = {
        teamsData: {
          ...state.teamsData,
          [teamName]: data,
        },
      };
      console.log(
        `Store: Updated state, total teams:`,
        Object.keys(newState.teamsData).length
      );
      return newState;
    });
  },
  clearAllData: () => {
    console.log("Store: Clearing all data for refresh");
    set(() => ({ teamsData: {} }));
  },
  refreshData: () => {
    console.log("Store: Triggering data refresh");
    // Очищаем данные, что заставит компоненты перезагрузиться
    set(() => ({ teamsData: {} }));
    // Перезагружаем страницу для полного обновления
    window.location.reload();
  },
}));

export default useStore;
