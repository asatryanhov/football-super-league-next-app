export async function fetchData(teamId: any, tournamentId: any, seasonId: any) {
  if (!process.env.RAPIDAPI_KEY) {
    throw new Error("Missing RAPIDAPI_KEY in environment variables");
  }

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "sofascore.p.rapidapi.com",
    },
    next: { revalidate: 604800 }, // Revalidate every 7 days
  };

  const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}&type=overall`;

  try {
    const res = await fetch(url, options);

    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType?.includes("application/json")) {
      console.error(`Error: ${res.status} - ${res.statusText}`);
      console.error("Response headers:", res.headers);
      throw new Error("Invalid response or content type is not JSON");
    }

    const data = await res.json();
    if (!data || typeof data !== "object") {
      throw new Error("API returned an empty or invalid response");
    }

    return data;
  } catch (error) {
    console.error("Fetch data error:", error.message);
    throw error;
  }
}
