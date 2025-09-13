// Отладочный скрипт для проверки данных в store
console.log("=== STORE DEBUG ===");

// Примеры команд, которые не показывали рейтинг
const teamsToCheck = ["atmadrid", "newcastle", "bayer"];

teamsToCheck.forEach((teamKey) => {
  const teamData = useStore.getState().teamsData[teamKey];
  if (teamData) {
    console.log(`${teamKey}:`, {
      hasData: !!teamData,
      hasStatistics: !!teamData.statistics,
      avgRating: teamData.statistics?.avgRating,
      ratingType: typeof teamData.statistics?.avgRating,
    });
  } else {
    console.log(`${teamKey}: NO DATA`);
  }
});

console.log(
  "Total teams in store:",
  Object.keys(useStore.getState().teamsData).length
);
