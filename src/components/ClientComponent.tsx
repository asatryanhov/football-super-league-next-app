"use client";

import useStore from "@/store/useStore";
import { useEffect } from "react";
// import TeamItem from "./TeamItem";

interface ClientComponentProps {
  initialData: any; // замените SomeType на реальный тип initialData
  teamName: string;
}

export default function ClientComponent({
  initialData,
  teamName,
}: ClientComponentProps) {
  const { teamsData, setTeamData } = useStore();
  const teamData = teamsData[teamName];

  useEffect(() => {
    if (!teamData) {
      setTeamData(teamName, initialData);
    }
  }, [initialData, teamName, teamData, setTeamData]);

  return <></>;
}
