"use client";
import images from "@/components/images";
import useStore from "@/store/useStore";
import TeamItem from "@/components/TeamItem";
import "@/styles/App.css";

export default function App() {
  const { teamsData } = useStore();

  if (!teamsData) {
    return <div>loading...</div>;
  }

  const teams = [
    {
      teamName: "Barcelona",
      logo: images.barcelonaLOGO,
      teamStatistics: teamsData.barcelona?.statistics,
      teamRating: teamsData.barcelona?.statistics?.avgRating || 0,
    },
    {
      teamName: "Man City",
      logo: images.mancityLOGO,
      teamStatistics: teamsData.mancity?.statistics,
      teamRating: teamsData.mancity?.statistics?.avgRating || 0,
    },
    {
      teamName: "Liverpool",
      logo: images.liverpoolLOGO,
      teamStatistics: teamsData.liverpool?.statistics,
      teamRating: teamsData.liverpool?.statistics?.avgRating || 0,
    },
    {
      teamName: "Real Madrid",
      logo: images.realLOGO,
      teamStatistics: teamsData.realmadrid?.statistics,
      teamRating: teamsData.realmadrid?.statistics?.avgRating || 0,
    },
    {
      teamName: "Arsenal",
      logo: images.arsenalLOGO,
      teamStatistics: teamsData.arsenal?.statistics,
      teamRating: teamsData.arsenal?.statistics?.avgRating || 0,
    },
    {
      teamName: "Atletico M.",
      logo: images.atmadridLOGO,
      teamStatistics: teamsData.atmadrid?.statistics,
      teamRating: teamsData.atmadrid?.statistics?.avgRating || 0,
    },
    {
      teamName: "Bayer",
      logo: images.bayerLOGO,
      teamStatistics: teamsData.bayer?.statistics,
      teamRating: teamsData.bayer?.statistics?.avgRating || 0,
    },
    {
      teamName: "Beyern M.",
      logo: images.bayernLOGO,
      teamStatistics: teamsData.bayern?.statistics,
      teamRating: teamsData.bayern?.statistics?.avgRating || 0,
    },
    {
      teamName: "Chelsea",
      logo: images.chelseaLOGO,
      teamStatistics: teamsData.chelsea?.statistics,
      teamRating: teamsData.chelsea?.statistics?.avgRating || 0,
    },
    {
      teamName: "Dortmund",
      logo: images.dortmundLOGO,
      teamStatistics: teamsData.dortmund?.statistics,
      teamRating: teamsData.dortmund?.statistics?.avgRating || 0,
    },
    {
      teamName: "Inter",
      logo: images.interLOGO,
      teamStatistics: teamsData.inter?.statistics,
      teamRating: teamsData.inter?.statistics?.avgRating || 0,
    },
    {
      teamName: "Juventus",
      logo: images.juventusLOGO,
      teamStatistics: teamsData.juventus?.statistics,
      teamRating: teamsData.juventus?.statistics?.avgRating || 0,
    },
    {
      teamName: "Man united",
      logo: images.manutdLOGO,
      teamStatistics: teamsData.manutd?.statistics,
      teamRating: teamsData.manutd?.statistics?.avgRating || 0,
    },
    {
      teamName: "Milan",
      logo: images.milanLOGO,
      teamStatistics: teamsData.milan?.statistics,
      teamRating: teamsData.milan?.statistics?.avgRating || 0,
    },
    {
      teamName: "PSG",
      logo: images.psgLOGO,
      teamStatistics: teamsData.psg?.statistics,
      teamRating: teamsData.psg?.statistics?.avgRating || 0,
    },
  ].sort((a, b) => b.teamRating - a.teamRating);

  return (
    <div>
      <div className="team-block-wrapper-header">
        <div className="team-block-header">
          {/* <div className="position-header"></div>
          <div className="team-logo"></div> */}
          <div className="regulate-width-block-header"></div>
          <div className="team-block-name-header">team</div>

          <div className="team-statistics-numbers-block-header">
            <div className="goal-per-game team-statistic-item-header red">
              goal per game
            </div>
            <div className="missedgoalpergame team-statistic-item-header blue">
              miss goal per game
            </div>
            <div className="bigChances team-statistic-item-header orange">
              big chances per game
            </div>
            <div className="bigchancesCreated team-statistic-item-header red">
              created big chances per game
            </div>
            <div className="shootontarget team-statistic-item-header blue">
              shoot on target per game
            </div>
            <div className=" team-statistic-item-header blue">
              average ball possession
            </div>

            <div className=" team-statistic-item-header blue">
              accurate passes percentage
            </div>
            <div className=" team-statistic-item-header blue">clean sheets</div>
            <div className=" team-statistic-item-header blue">hit woodwork</div>
            <div className=" team-statistic-item-header blue">
              duels won percentage
            </div>
          </div>

          <div className="team-block-rating-header">rating</div>
        </div>
      </div>
      {teams.map((team, index) => (
        <TeamItem
          key={team.teamName}
          data={team.teamStatistics}
          teamName={team.teamName}
          logo={team.logo}
          teamRating={team.teamRating}
          position={index + 1}
        />
      ))}
    </div>
  );
}
