"use client";
import Image from "next/image";
import "@/styles/TeamItem.css";

function getRatingColor(rating: number): string {
  if (rating >= 7.25) return "#1F3A44"; // Darker blue-green
  if (rating >= 7.2) return "#006F3C"; // Dark green
  if (rating >= 7.15) return "#3B6E00"; // Medium-dark yellow-green
  if (rating >= 7.1) return "#858C00"; // Olive green
  if (rating >= 7.05) return "#E09000"; // Golden yellow
  if (rating >= 7.0) return "#FF8200"; // Vivid orange
  if (rating >= 6.95) return "#FF5733"; // Bright orange-red
  if (rating >= 6.75) return "#F02A3D"; // Dark red
  return "#FFFFFF";
}

// Функция для получения цвета по позиции (градация от зеленого через желтый и оранжевый к красному)
function getPositionColor(position: number): string {
  if (!position || position < 1 || position > 20) return "#808080"; // Серый для некорректных позиций

  // Нормализуем позицию от 0 до 1 (1 место = 0, 20 место = 1)
  const normalized = (position - 1) / 19;

  let red, green, blue;

  if (normalized <= 0.33) {
    // Переход от темно-зеленого к более темному желто-зеленому (позиции 1-7)
    const t = normalized / 0.33;
    red = Math.round(0 + t * 140); // От 0 до 140 (более темный)
    green = Math.round(100 + t * 120); // От 100 до 220 (более темный)
    blue = 0;
  } else if (normalized <= 0.66) {
    // Переход от темного желто-зеленого к темному оранжевому (позиции 8-13)
    const t = (normalized - 0.33) / 0.33;
    red = Math.round(140 + t * 80); // От 140 до 220 (более темный)
    green = Math.round(220 - t * 100); // От 220 до 120 (более темный)
    blue = 0;
  } else {
    // Переход от темного оранжевого к темно-красному (позиции 14-20)
    const t = (normalized - 0.66) / 0.34;
    red = Math.round(220 - t * 81); // От 220 до 139
    green = Math.round(120 - t * 120); // От 120 до 0
    blue = 0;
  }

  return `rgb(${red}, ${green}, ${blue})`;
}

interface TeamItemProps {
  data?: {
    avgRating?: number;
    goalsScored?: number;
    assists?: number;
    // logo?: string;
    [key: string]: any;
  };
  teamName: string;
  logo?: string;
  teamRating?: any;
  position?: any;
  onTeamClick?: () => void;
}

const TeamItem: React.FC<TeamItemProps> = ({
  data,
  teamName,
  logo,
  teamRating,
  position,
  onTeamClick,
}) => {
  const rating = Number(teamRating);
  // Используем цвет по позиции вместо рейтинга
  const ratingBgColor = getPositionColor(position);
  if (!data) {
    return (
      // <div className="team-item">
      //   <h3>{teamName}</h3>
      //   <p>No statistics available.</p>
      // </div>
      // <div>Loading...</div>
      <></>
    );
  }
  // console.log(typeof logo);
  return (
    <div className="team-block-wrapper">
      <div className="team-block">
        <div
          className="position"
          style={{
            color: ratingBgColor,
            borderColor: ratingBgColor,
          }}>
          {position}
        </div>
        <div
          className="team-logo"
          onClick={onTeamClick}
          style={{ cursor: onTeamClick ? "pointer" : "default" }}>
          {logo && (
            <Image
              className="team-logo-img"
              src={logo}
              alt="logo"
              width={100}
              height={100}
            />
          )}
        </div>
        <div
          className="team-block-name"
          onClick={onTeamClick}
          style={{ cursor: onTeamClick ? "pointer" : "default" }}>
          {teamName}
        </div>
        <div className="team-statistics-numbers-block">
          {/* Team Performance Stats */}
          <div className="goal-per-game team-statistic-item">
            {(data.goalsScored! / data.matches).toFixed(2)}
          </div>
          <div className="missedgoalpergame team-statistic-item">
            {(data.goalsConceded / data.matches).toFixed(2)}
          </div>
          <div className=" team-statistic-item">{data.cleanSheets}</div>
          {/* Team Performance Stats END*/}
          {/* Shooting & Attacking Stats */}
          <div className=" team-statistic-item">
            {(data.shots / data.matches).toFixed(1)}
          </div>
          <div className="shootontarget team-statistic-item">
            {(data.shotsOnTarget / data.matches).toFixed(1)}
          </div>
          <div className="bigChances team-statistic-item">
            {(data.bigChances / data.matches).toFixed(1)}
          </div>
          <div className="bigchancesCreated team-statistic-item">
            {(data.bigChancesCreated / data.matches).toFixed(1)}
          </div>
          {/* <div className="bigchancesCreated team-statistic-item">
            {(data.bigChancesMissed / data.matches).toFixed(1)}
          </div> */}

          {/* Shooting & Attacking Stats END*/}

          {/* Passes & Possession */}
          <div className=" team-statistic-item">
            {data.averageBallPossession.toFixed(1)}
          </div>

          <div className=" team-statistic-item">
            {data.accuratePassesPercentage.toFixed(1)}
          </div>
          {/* Passes & Possession END*/}

          {/* Defensive Stats*/}
          <div className=" team-statistic-item">
            {(data.tackles / data.matches).toFixed(1)}
          </div>

          <div className=" team-statistic-item">
            {(data.interceptions / data.matches).toFixed(1)}
          </div>
          <div className=" team-statistic-item">
            {(data.clearances / data.matches).toFixed(1)}
          </div>
          <div className=" team-statistic-item">
            {(data.errorsLeadingToGoal / data.matches).toFixed(1)}
          </div>

          <div className=" team-statistic-item">
            {(data.fouls / data.matches).toFixed(1)}
          </div>
          {/* Defensive Stats END*/}

          {/* Duels & Challenges*/}
          <div className=" team-statistic-item">
            {data.duelsWonPercentage.toFixed(1)}
          </div>
          {/* Duels & Challenges END*/}
          {/* <div className=" team-statistic-item">{data.hitWoodwork}</div> */}
          {/* Goalkeeper & Defense Stats*/}
          <div className=" team-statistic-item">
            {(data.saves / data.matches).toFixed(1)}
          </div>
          <div className=" team-statistic-item">
            {(data.shotsAgainst / data.matches).toFixed(1)}
          </div>
          <div className=" team-statistic-item">
            {(data.shotsBlockedAgainst / data.matches).toFixed(1)}
          </div>
          <div className=" team-statistic-item">
            {(data.interceptionsAgainst / data.matches).toFixed(1)}
          </div>
          {/* Goalkeeper & Defense Stats END*/}
        </div>
        {/* Average Ball Possession */}
        {/* //------------------------------------------------------------------------ */}
        <div
          className="team-block-rating"
          style={{ backgroundColor: ratingBgColor }}>
          {teamRating ? Number(teamRating).toFixed(3) : "0.000"}
        </div>
      </div>
      <div
        className="team-block-underline"
        style={{ backgroundColor: ratingBgColor }}></div>
    </div>
  );
};

export default TeamItem;
