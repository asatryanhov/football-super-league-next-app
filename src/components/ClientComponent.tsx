"use client";

import useStore from "@/store/useStore";
import { useEffect } from "react";
// import TeamItem from "./TeamItem";

export default function ClientComponent({
  initialData,
  teamName,
  avarageAge,
  teamValue,
}) {
  const { teamsData, setTeamData } = useStore();
  const teamData = teamsData[teamName];

  useEffect(() => {
    if (!teamData) {
      setTeamData(teamName, initialData);
    }
  }, [initialData, teamName, teamData, setTeamData]);

  return <></>;
}
