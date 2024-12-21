// Import necessary modules
import ManCityClient from "@/components/teamsClient/ManCityClient";

export default async function BarcelonaServer() {
  const teamId = 17;
  const tournamentId = 17;
  const seasonId = 61627;

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
    return <ManCityClient data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data. Please try again later.</p>;
  }
}
