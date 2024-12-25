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
  const data = await fetchData(teamId, tournamentId, seasonId);

  return <ClientComponent initialData={data} teamName={teamName} />;
}
