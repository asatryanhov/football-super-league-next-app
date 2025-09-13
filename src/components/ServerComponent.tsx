import { fetchData } from "@/lib/fetchData";
import ClientComponent from "@/components/ClientComponent";

interface ServerComponentProps {
  teamName: string;
  teamId: number;
  tournamentId: number;
  seasonId: number;
}

export default async function ServerComponent({
  teamName,
  teamId,
  tournamentId,
  seasonId,
}: ServerComponentProps) {
  console.log(
    `Fetching data for ${teamName} (ID: ${teamId}, Tournament: ${tournamentId}, Season: ${seasonId})`
  );

  try {
    const data = await fetchData(teamId, tournamentId, seasonId);
    console.log(
      `Successfully fetched data for ${teamName}:`,
      data ? "Data received" : "No data"
    );
    return <ClientComponent initialData={data} teamName={teamName} />;
  } catch (error) {
    console.error(`Error fetching data for ${teamName}:`, error);
    return <ClientComponent initialData={null} teamName={teamName} />;
  }
}
