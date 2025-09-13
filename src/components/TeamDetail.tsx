"use client";
import Image from "next/image";
import React from "react";
import "@/styles/TeamDetail.css";

interface TeamDetailProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  logo?: string;
  data?: any;
  teamRating?: number;
}

const TeamDetail: React.FC<TeamDetailProps> = ({
  isOpen,
  onClose,
  teamName,
  logo,
  data,
  teamRating,
}) => {
  if (!isOpen || !data) return null;

  // Отладочный лог для проверки логотипа
  console.log("TeamDetail logo:", logo);
  console.log("TeamName:", teamName);

  const rating = Number(teamRating);

  const detailedStats = [
    {
      category: "🎯 Team Performance",
      color: "#e74c3c",
      stats: [
        {
          label: "Goals per Game",
          value: (data.goalsScored / data.matches).toFixed(2),
        },
        {
          label: "Goals Conceded per Game",
          value: (data.goalsConceded / data.matches).toFixed(2),
        },
        { label: "Clean Sheets", value: data.cleanSheets },
        { label: "Total Matches", value: data.matches },
        { label: "Awarded Matches", value: data.awardedMatches },
        { label: "Goals Scored", value: data.goalsScored },
        { label: "Goals Conceded", value: data.goalsConceded },
        { label: "Own Goals", value: data.ownGoals },
        { label: "Assists", value: data.assists },
        { label: "Average Rating", value: data.avgRating?.toFixed(3) || "N/A" },
      ],
    },
    {
      category: "⚽ Goal Scoring Analysis",
      color: "#ff6b6b",
      stats: [
        { label: "Goals from Inside Box", value: data.goalsFromInsideTheBox },
        { label: "Goals from Outside Box", value: data.goalsFromOutsideTheBox },
        { label: "Headed Goals", value: data.headedGoals },
        { label: "Left Foot Goals", value: data.leftFootGoals },
        { label: "Right Foot Goals", value: data.rightFootGoals },
        { label: "Penalty Goals", value: data.penaltyGoals },
        { label: "Penalties Taken", value: data.penaltiesTaken },
        { label: "Free Kick Goals", value: data.freeKickGoals },
        { label: "Free Kick Shots", value: data.freeKickShots },
      ],
    },
    {
      category: "🏹 Shooting & Attacking",
      color: "#3498db",
      stats: [
        {
          label: "Shots per Game",
          value: (data.shots / data.matches).toFixed(1),
        },
        {
          label: "Shots on Target per Game",
          value: (data.shotsOnTarget / data.matches).toFixed(1),
        },
        { label: "Total Shots", value: data.shots },
        { label: "Shots on Target", value: data.shotsOnTarget },
        { label: "Shots Off Target", value: data.shotsOffTarget },
        {
          label: "Shot Accuracy %",
          value:
            data.shots > 0
              ? ((data.shotsOnTarget / data.shots) * 100).toFixed(1)
              : "0",
        },
        { label: "Shots from Inside Box", value: data.shotsFromInsideTheBox },
        { label: "Shots from Outside Box", value: data.shotsFromOutsideTheBox },
        {
          label: "Blocked Scoring Attempts",
          value: data.blockedScoringAttempt,
        },
        { label: "Hit Woodwork", value: data.hitWoodwork },
      ],
    },
    {
      category: "💫 Big Chances & Fast Breaks",
      color: "#ff9f43",
      stats: [
        {
          label: "Big Chances per Game",
          value: (data.bigChances / data.matches).toFixed(1),
        },
        {
          label: "Big Chances Created per Game",
          value: (data.bigChancesCreated / data.matches).toFixed(1),
        },
        { label: "Big Chances", value: data.bigChances },
        { label: "Big Chances Created", value: data.bigChancesCreated },
        { label: "Big Chances Missed", value: data.bigChancesMissed },
        { label: "Fast Breaks", value: data.fastBreaks },
        { label: "Fast Break Goals", value: data.fastBreakGoals },
        { label: "Fast Break Shots", value: data.fastBreakShots },
      ],
    },
    {
      category: "🏃‍♂️ Dribbling & Movement",
      color: "#10ac84",
      stats: [
        { label: "Successful Dribbles", value: data.successfulDribbles },
        { label: "Dribble Attempts", value: data.dribbleAttempts },
        {
          label: "Dribble Success %",
          value:
            data.dribbleAttempts > 0
              ? (
                  (data.successfulDribbles / data.dribbleAttempts) *
                  100
                ).toFixed(1)
              : "0",
        },
        { label: "Possession Lost", value: data.possessionLost },
        { label: "Offsides", value: data.offsides },
      ],
    },
    {
      category: "⚽ Passes & Possession",
      color: "#f39c12",
      stats: [
        {
          label: "Average Ball Possession %",
          value: data.averageBallPossession?.toFixed(1) || "N/A",
        },
        { label: "Total Passes", value: data.totalPasses },
        { label: "Accurate Passes", value: data.accuratePasses },
        {
          label: "Accurate Passes %",
          value: data.accuratePassesPercentage?.toFixed(1) || "N/A",
        },
        { label: "Own Half Passes", value: data.totalOwnHalfPasses },
        {
          label: "Accurate Own Half Passes",
          value: data.accurateOwnHalfPasses,
        },
        {
          label: "Own Half Pass Accuracy %",
          value: data.accurateOwnHalfPassesPercentage?.toFixed(1) || "N/A",
        },
        {
          label: "Opposition Half Passes",
          value: data.totalOppositionHalfPasses,
        },
        {
          label: "Accurate Opposition Half Passes",
          value: data.accurateOppositionHalfPasses,
        },
        {
          label: "Opposition Half Pass Accuracy %",
          value:
            data.accurateOppositionHalfPassesPercentage?.toFixed(1) || "N/A",
        },
      ],
    },
    {
      category: "🎯 Long Balls & Crosses",
      color: "#6c5ce7",
      stats: [
        { label: "Total Long Balls", value: data.totalLongBalls },
        { label: "Accurate Long Balls", value: data.accurateLongBalls },
        {
          label: "Long Ball Accuracy %",
          value: data.accurateLongBallsPercentage?.toFixed(1) || "N/A",
        },
        { label: "Total Crosses", value: data.totalCrosses },
        { label: "Accurate Crosses", value: data.accurateCrosses },
        {
          label: "Cross Accuracy %",
          value: data.accurateCrossesPercentage?.toFixed(1) || "N/A",
        },
        { label: "Corners", value: data.corners },
      ],
    },
    {
      category: "🛡️ Defensive Stats",
      color: "#9b59b6",
      stats: [
        {
          label: "Tackles per Game",
          value: (data.tackles / data.matches).toFixed(1),
        },
        {
          label: "Interceptions per Game",
          value: (data.interceptions / data.matches).toFixed(1),
        },
        {
          label: "Clearances per Game",
          value: (data.clearances / data.matches).toFixed(1),
        },
        { label: "Total Tackles", value: data.tackles },
        { label: "Total Interceptions", value: data.interceptions },
        { label: "Total Clearances", value: data.clearances },
        { label: "Clearances Off Line", value: data.clearancesOffLine },
        { label: "Last Man Tackles", value: data.lastManTackles },
        { label: "Ball Recovery", value: data.ballRecovery },
      ],
    },
    {
      category: "🥊 Duels & Challenges",
      color: "#95a5a6",
      stats: [
        { label: "Total Duels", value: data.totalDuels },
        { label: "Duels Won", value: data.duelsWon },
        {
          label: "Duels Won %",
          value: data.duelsWonPercentage?.toFixed(1) || "N/A",
        },
        { label: "Ground Duels", value: data.totalGroundDuels },
        { label: "Ground Duels Won", value: data.groundDuelsWon },
        {
          label: "Ground Duels Won %",
          value: data.groundDuelsWonPercentage?.toFixed(1) || "N/A",
        },
        { label: "Aerial Duels", value: data.totalAerialDuels },
        { label: "Aerial Duels Won", value: data.aerialDuelsWon },
        {
          label: "Aerial Duels Won %",
          value: data.aerialDuelsWonPercentage?.toFixed(1) || "N/A",
        },
      ],
    },
    {
      category: "🥅 Goalkeeper & Defense",
      color: "#27ae60",
      stats: [
        {
          label: "Saves per Game",
          value: (data.saves / data.matches).toFixed(1),
        },
        { label: "Total Saves", value: data.saves },
        { label: "Goal Kicks", value: data.goalKicks },
        {
          label: "Save Percentage %",
          value:
            data.shotsAgainst > 0
              ? ((data.saves / data.shotsAgainst) * 100).toFixed(1)
              : "0",
        },
      ],
    },
    {
      category: "⚠️ Disciplinary & Errors",
      color: "#e55039",
      stats: [
        { label: "Yellow Cards", value: data.yellowCards },
        { label: "Yellow-Red Cards", value: data.yellowRedCards },
        { label: "Red Cards", value: data.redCards },
        {
          label: "Fouls per Game",
          value: (data.fouls / data.matches).toFixed(1),
        },
        { label: "Total Fouls", value: data.fouls },
        {
          label: "Errors Leading to Goal per Game",
          value: (data.errorsLeadingToGoal / data.matches).toFixed(1),
        },
        { label: "Errors Leading to Goal", value: data.errorsLeadingToGoal },
        { label: "Errors Leading to Shot", value: data.errorsLeadingToShot },
        { label: "Penalties Committed", value: data.penaltiesCommited },
        { label: "Penalty Goals Conceded", value: data.penaltyGoalsConceded },
      ],
    },
    {
      category: "📊 Set Pieces & Other",
      color: "#2d3436",
      stats: [
        { label: "Throw Ins", value: data.throwIns },
        { label: "Free Kicks", value: data.freeKicks },
        { label: "ID", value: data.id },
      ],
    },
    {
      category: "🔄 Opposition Statistics",
      color: "#fd79a8",
      stats: [
        { label: "Shots Against", value: data.shotsAgainst },
        { label: "Shots on Target Against", value: data.shotsOnTargetAgainst },
        {
          label: "Shots Off Target Against",
          value: data.shotsOffTargetAgainst,
        },
        { label: "Shots Blocked Against", value: data.shotsBlockedAgainst },
        {
          label: "Shots from Inside Box Against",
          value: data.shotsFromInsideTheBoxAgainst,
        },
        {
          label: "Shots from Outside Box Against",
          value: data.shotsFromOutsideTheBoxAgainst,
        },
        { label: "Big Chances Against", value: data.bigChancesAgainst },
        {
          label: "Big Chances Created Against",
          value: data.bigChancesCreatedAgainst,
        },
        {
          label: "Big Chances Missed Against",
          value: data.bigChancesMissedAgainst,
        },
        {
          label: "Blocked Scoring Attempts Against",
          value: data.blockedScoringAttemptAgainst,
        },
        { label: "Hit Woodwork Against", value: data.hitWoodworkAgainst },
      ],
    },
    {
      category: "🎯 Opposition Passing",
      color: "#a29bfe",
      stats: [
        { label: "Total Passes Against", value: data.totalPassesAgainst },
        { label: "Accurate Passes Against", value: data.accuratePassesAgainst },
        {
          label: "Own Half Passes Against",
          value: data.ownHalfPassesTotalAgainst,
        },
        {
          label: "Accurate Own Half Passes Against",
          value: data.accurateOwnHalfPassesAgainst,
        },
        {
          label: "Opposition Half Passes Against",
          value: data.oppositionHalfPassesTotalAgainst,
        },
        {
          label: "Accurate Opposition Half Passes Against",
          value: data.accurateOppositionHalfPassesAgainst,
        },
        {
          label: "Final Third Passes Against",
          value: data.totalFinalThirdPassesAgainst,
        },
        {
          label: "Accurate Final Third Passes Against",
          value: data.accurateFinalThirdPassesAgainst,
        },
        { label: "Long Balls Against", value: data.longBallsTotalAgainst },
        {
          label: "Successful Long Balls Against",
          value: data.longBallsSuccessfulAgainst,
        },
        { label: "Crosses Against", value: data.crossesTotalAgainst },
        {
          label: "Successful Crosses Against",
          value: data.crossesSuccessfulAgainst,
        },
        { label: "Key Passes Against", value: data.keyPassesAgainst },
      ],
    },
    {
      category: "🏃‍♂️ Opposition Actions",
      color: "#00b894",
      stats: [
        {
          label: "Dribble Attempts Against",
          value: data.dribbleAttemptsTotalAgainst,
        },
        {
          label: "Successful Dribbles Against",
          value: data.dribbleAttemptsWonAgainst,
        },
        { label: "Tackles Against", value: data.tacklesAgainst },
        { label: "Interceptions Against", value: data.interceptionsAgainst },
        { label: "Clearances Against", value: data.clearancesAgainst },
        { label: "Corners Against", value: data.cornersAgainst },
        { label: "Offsides Against", value: data.offsidesAgainst },
      ],
    },
    {
      category: "⚠️ Opposition Discipline",
      color: "#fab1a0",
      stats: [
        { label: "Yellow Cards Against", value: data.yellowCardsAgainst },
        { label: "Red Cards Against", value: data.redCardsAgainst },
        {
          label: "Errors Leading to Goal Against",
          value: data.errorsLeadingToGoalAgainst,
        },
        {
          label: "Errors Leading to Shot Against",
          value: data.errorsLeadingToShotAgainst,
        },
      ],
    },
  ];

  return (
    <div className="team-detail-overlay" onClick={onClose}>
      <div className="team-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-detail-header">
          <div className="team-detail-title">
            {logo ? (
              <Image
                src={logo}
                alt={`${teamName} logo`}
                width={60}
                height={60}
                className="team-detail-logo"
                onError={(e) => {
                  console.log("Error loading logo:", e);
                }}
              />
            ) : (
              <div className="team-detail-logo-placeholder">
                <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {teamName.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h2>{teamName}</h2>
              <div className="team-detail-rating">
                Rating:{" "}
                <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
                  {rating.toFixed(3)}
                </span>
              </div>
            </div>
          </div>
          <button className="team-detail-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="team-detail-content">
          {detailedStats.map((category, index) => (
            <div key={index} className="stat-category">
              <h3
                className="category-title"
                style={{ borderLeftColor: category.color }}>
                {category.category}
              </h3>
              <div className="stats-grid">
                {category.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="stat-item">
                    <span className="stat-label">{stat.label}:</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
