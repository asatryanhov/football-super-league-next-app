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

  // Log when component mounts
  console.log(`ClientComponent mounted for ${teamName}:`, {
    hasInitialData: !!initialData,
    initialData: initialData,
    teamDataExists: !!teamData,
  });

  // Immediately set data without useEffect
  if (!teamData && initialData) {
    console.log(`Immediately setting data for ${teamName}`);
    setTeamData(teamName, initialData);
  }

  useEffect(() => {
    console.log(`useEffect triggered for ${teamName}:`, {
      hasTeamData: !!teamData,
      hasInitialData: !!initialData,
      initialDataDetails: initialData,
    });

    // Always set data, regardless of whether it exists or not
    console.log(`Forcefully setting data for ${teamName}`);
    setTeamData(teamName, initialData || { statistics: null });
  }, [initialData, teamName, setTeamData]); // Removed teamData from dependencies

  return <></>;
}
