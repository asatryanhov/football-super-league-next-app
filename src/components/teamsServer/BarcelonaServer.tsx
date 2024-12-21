// Import necessary modules
import BarcelonaClient from "@/components/teamsClient/BarcelonaClient";

export default async function BarcelonaServer() {
  const teamId = 2817;
  const tournamentId = 8;
  const seasonId = 61643;

  const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}&type=overall`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "sofascore.p.rapidapi.com",
    },
    next: { revalidate: 604800 }, // Revalidate every 7 days
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return <BarcelonaClient data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data. Please try again later.</p>;
  }
}
