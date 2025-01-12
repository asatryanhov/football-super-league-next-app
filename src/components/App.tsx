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
    {
      teamName: "Newcastle",
      logo: images.newcastleLOGO,
      teamStatistics: teamsData.newcastle?.statistics,
      teamRating: teamsData.newcastle?.statistics?.avgRating || 0,
    },
    {
      teamName: "Lazio",
      logo: images.lazioLOGO,
      teamStatistics: teamsData.lazio?.statistics,
      teamRating: teamsData.lazio?.statistics?.avgRating || 0,
    },
    {
      teamName: "Atalanta",
      logo: images.atalantaLOGO,
      teamStatistics: teamsData.atalanta?.statistics,
      teamRating: teamsData.atalanta?.statistics?.avgRating || 0,
    },
    {
      teamName: "Napoli",
      logo: images.napoliLOGO,
      teamStatistics: teamsData.napoli?.statistics,
      teamRating: teamsData.napoli?.statistics?.avgRating || 0,
    },
    {
      teamName: "Atletic Bilbao",
      logo: images.atbilbaoLOGO,
      teamStatistics: teamsData.atbilbao?.statistics,
      teamRating: teamsData.atbilbao?.statistics?.avgRating || 0,
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
            {/* Team Performance Stats */}
            <div className="goal-per-game team-statistic-item-header red">
              goal pg
            </div>
            <div className="missedgoalpergame team-statistic-item-header red">
              miss goal pg
            </div>
            <div className=" team-statistic-item-header red">clean sheets</div>
            {/* Team Performance Stats END*/}
            {/* Shooting & Attacking Stats */}
            <div className=" team-statistic-item-header blue">shots pg</div>
            <div className="shootontarget team-statistic-item-header blue">
              shoot on target pg
            </div>
            <div className="bigChances team-statistic-item-header blue">
              big chances pg
            </div>
            <div className="bigchancesCreated team-statistic-item-header blue">
              created big chances pg
            </div>
            {/* Shooting & Attacking Stats END */}

            {/* Passes & Possession */}
            <div className=" team-statistic-item-header orange">
              avg ball poss ession
            </div>

            <div className=" team-statistic-item-header orange">
              accurate passes %
            </div>
            {/* Passes & Possession END*/}

            {/* Defensive Stats*/}
            <div className=" team-statistic-item-header violet">tackles pg</div>
            <div className=" team-statistic-item-header violet">
              inter ceptions pg
            </div>

            <div className=" team-statistic-item-header violet">
              clear ances pg
            </div>
            <div className=" team-statistic-item-header violet">
              errors leading to goal pg
            </div>

            <div className=" team-statistic-item-header violet">fouls pg</div>

            {/* Defensive Stats END*/}

            {/* Duels & Challenges*/}
            <div className=" team-statistic-item-header grey">duels won %</div>
            {/* Duels & Challenges END*/}

            {/* Goalkeeper & Defense Stats*/}
            <div className=" team-statistic-item-header green">gk saves pg</div>
            <div className=" team-statistic-item-header green">
              shots against pg
            </div>
            <div className=" team-statistic-item-header green">
              shots blocked against pg
            </div>
            <div className=" team-statistic-item-header green">
              inter ceptions against pg
            </div>
            {/* Goalkeeper & Defense Stats END*/}

            {/* <div className=" team-statistic-item-header blue">hit woodwork</div> */}
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

      {teamsData && (
        <div className="team-block-wrapper">
          <div className="stats-container">
            <strong>Goal PG (Goals per Game):</strong> This represents the
            average number of goals scored per game by a player or team.
            <br />
            <strong>Miss Goal PG (Missed Goals per Game):</strong> The average
            number of goal-scoring opportunities that a player or team fails to
            convert into a goal per game.
            <br />
            <strong>Clean Sheets:</strong> The number of games in which a
            goalkeeper (or team) does not concede any goals.
            <br />
            <strong>Shots PG (Shots per Game):</strong> The average number of
            shots taken by a player or team in a match.
            <br />
            <strong>Shot on Target PG (Shots on Target per Game):</strong> The
            average number of shots that are on target per game. A shot on
            target is one that would have gone into the goal if not for a save
            or block.
            <br />
            <strong>Big Chances PG:</strong> The average number of &quot;big
            chances&quot; created or missed per game. A &quot;big chance&quot;
            is a clear opportunity to score, typically close to the goal and
            often unchallenged.
            <br />
            <strong>Created Big Chances PG:</strong> The average number of big
            scoring opportunities created by a player or team per game.
            <br />
            <strong>Avg Ball Possession:</strong> The average percentage of the
            total game time a team controls the ball. Higher possession
            generally suggests more control over the game.
            <br />
            <strong>Accurate Passes %:</strong> The percentage of passes made by
            a player or team that successfully reach their intended target.
            <br />
            <strong>Tackles PG (Tackles per Game):</strong> The average number
            of tackles made by a player or team per game. Tackles are attempts
            to take the ball away from an opponent.
            <br />
            <strong>Interceptions PG:</strong> The average number of times a
            player or team intercepts the ball per game, typically by
            anticipating passes or breaking up plays.
            <br />
            <strong>Clearances PG:</strong> The average number of times a player
            or team clears the ball from their defensive zone, typically to
            avoid a goal-scoring threat.
            <br />
            <strong>Errors Leading to Goal PG:</strong> The average number of
            mistakes made by a player or team that directly result in the
            opposition scoring a goal.
            <br />
            <strong>Fouls PG:</strong> The average number of fouls committed by
            a player or team per game.
            <br />
            <strong>Duels Won %:</strong> The percentage of individual duels
            (1v1 situations) won by a player. This can include aerial duels,
            tackles, or challenges for the ball.
            <br />
            <strong>GK Saves PG (Goalkeeper Saves per Game):</strong> The
            average number of saves made by a goalkeeper per game.
            <br />
            <strong>Shots Against PG:</strong> The average number of shots faced
            by a goalkeeper or team per game.
            <br />
            <strong>Shots Blocked Against PG:</strong> The average number of
            shots blocked by a player or team in a game to prevent the
            opposition from scoring.
            <br />
            <strong>Interceptions Against PG:</strong> The average number of
            interceptions made by a player or team in defense per game.
            <br />
            <strong>Rating:</strong> The player&apos;s or team&apos;s overall
            performance score, typically based on a combination of various stats
            like goals, assists, passes, tackles, etc. Ratings can vary
            depending on the source or system used (e.g., 1-10 scale or other
            criteria).
          </div>
        </div>
      )}
    </div>
  );
}
