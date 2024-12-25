import { fetchData } from "@/lib/fetchData";
import ClientComponent from "@/components/ClientComponent";

export default async function ServerComponent({
  teamName,
  teamId,
  tournamentId,
  seasonId,
}) {
  const data = await fetchData(teamId, tournamentId, seasonId);

  return <ClientComponent initialData={data} teamName={teamName} />;
}
