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

  const rating = Number(teamRating);

  const detailedStats = [
    {
      category: "Team Performance",
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
        { label: "Goals Scored", value: data.goalsScored },
        { label: "Goals Conceded", value: data.goalsConceded },
      ],
    },
    {
      category: "Shooting & Attacking",
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
        {
          label: "Big Chances per Game",
          value: (data.bigChances / data.matches).toFixed(1),
        },
        {
          label: "Big Chances Created per Game",
          value: (data.bigChancesCreated / data.matches).toFixed(1),
        },
        { label: "Total Shots", value: data.shots },
        { label: "Shots on Target", value: data.shotsOnTarget },
        {
          label: "Shot Accuracy %",
          value: ((data.shotsOnTarget / data.shots) * 100).toFixed(1),
        },
      ],
    },
    {
      category: "Passes & Possession",
      color: "#f39c12",
      stats: [
        {
          label: "Average Ball Possession %",
          value: data.averageBallPossession.toFixed(1),
        },
        {
          label: "Accurate Passes %",
          value: data.accuratePassesPercentage.toFixed(1),
        },
        { label: "Total Passes", value: data.passes || "N/A" },
        { label: "Accurate Passes", value: data.accuratePasses || "N/A" },
      ],
    },
    {
      category: "Defensive Stats",
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
        {
          label: "Errors Leading to Goal per Game",
          value: (data.errorsLeadingToGoal / data.matches).toFixed(1),
        },
        {
          label: "Fouls per Game",
          value: (data.fouls / data.matches).toFixed(1),
        },
        { label: "Total Tackles", value: data.tackles },
        { label: "Total Interceptions", value: data.interceptions },
      ],
    },
    {
      category: "Duels & Challenges",
      color: "#95a5a6",
      stats: [
        { label: "Duels Won %", value: data.duelsWonPercentage.toFixed(1) },
        {
          label: "Aerial Duels Won %",
          value: data.aerialDuelsWonPercentage?.toFixed(1) || "N/A",
        },
      ],
    },
    {
      category: "Goalkeeper & Defense",
      color: "#27ae60",
      stats: [
        {
          label: "Saves per Game",
          value: (data.saves / data.matches).toFixed(1),
        },
        {
          label: "Shots Against per Game",
          value: (data.shotsAgainst / data.matches).toFixed(1),
        },
        {
          label: "Shots Blocked Against per Game",
          value: (data.shotsBlockedAgainst / data.matches).toFixed(1),
        },
        {
          label: "Interceptions Against per Game",
          value: (data.interceptionsAgainst / data.matches).toFixed(1),
        },
        { label: "Total Saves", value: data.saves },
        {
          label: "Save Percentage %",
          value: ((data.saves / data.shotsAgainst) * 100).toFixed(1),
        },
      ],
    },
  ];

  return (
    <div className="team-detail-overlay" onClick={onClose}>
      <div className="team-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-detail-header">
          <div className="team-detail-title">
            {logo && (
              <Image
                src={logo}
                alt={`${teamName} logo`}
                width={60}
                height={60}
                className="team-detail-logo"
              />
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
