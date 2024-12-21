// // store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  teamsData: {}, // Хранение данных по каждой команде
  setTeamData: (teamName, data) =>
    set((state) => ({
      teamsData: {
        ...state.teamsData,
        [teamName]: data, // Добавляем или обновляем данные для команды
      },
    })),
}));

export default useStore;
