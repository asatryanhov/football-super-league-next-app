"use client";
import React, { useState } from "react";
import "../styles/TeamComparison.css";

interface Team {
  teamName: string;
  logo: string;
  teamStatistics?: any;
  teamRating: number;
}

interface TeamComparisonProps {
  teams: Team[];
  onClose: () => void;
}

const TeamComparison: React.FC<TeamComparisonProps> = ({ teams, onClose }) => {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);

  const handleTeamSelect = (team: Team, position: 1 | 2) => {
    if (position === 1) {
      setTeam1(team);
    } else {
      setTeam2(team);
    }
  };

  const getComparisonValue = (
    value1: number,
    value2: number,
    higherIsBetter: boolean = true
  ) => {
    if (!value1 && !value2) return { class: "equal", diff: 0 };

    const diff = value1 - value2;

    if (diff === 0) return { class: "equal", diff: 0 };

    if (higherIsBetter) {
      return {
        class: diff > 0 ? "better" : "worse",
        diff: Math.abs(diff),
      };
    } else {
      return {
        class: diff < 0 ? "better" : "worse",
        diff: Math.abs(diff),
      };
    }
  };

  const renderStatComparison = (
    label: string,
    value1: number,
    value2: number,
    higherIsBetter: boolean = true,
    showAsInteger: boolean = false
  ) => {
    const comp1 = getComparisonValue(value1, value2, higherIsBetter);
    const comp2 = getComparisonValue(value2, value1, higherIsBetter);

    const formatValue = (value: number) => {
      if (!value) return 0;
      return showAsInteger ? Math.round(value) : value;
    };

    return (
      <div className="stat-comparison-row">
        <div className={`stat-value team1 ${comp1.class}`}>
          {formatValue(value1)}
        </div>
        <div className="stat-label">{label}</div>
        <div className={`stat-value team2 ${comp2.class}`}>
          {formatValue(value2)}
        </div>
      </div>
    );
  };

  return (
    <div className="team-comparison-overlay">
      <div className="team-comparison-modal">
        <div className="comparison-header">
          <h2>Сравнение команд</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="team-selection">
          <div className="team-selector">
            <h3>Команда 1</h3>
            <select
              value={team1?.teamName || ""}
              onChange={(e) => {
                const selectedTeam = teams.find(
                  (t) => t.teamName === e.target.value
                );
                if (selectedTeam) handleTeamSelect(selectedTeam, 1);
              }}>
              <option value="">Выберите команду</option>
              {teams.map((team) => (
                <option key={team.teamName} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>

          <div className="vs-separator">VS</div>

          <div className="team-selector">
            <h3>Команда 2</h3>
            <select
              value={team2?.teamName || ""}
              onChange={(e) => {
                const selectedTeam = teams.find(
                  (t) => t.teamName === e.target.value
                );
                if (selectedTeam) handleTeamSelect(selectedTeam, 2);
              }}>
              <option value="">Выберите команду</option>
              {teams.map((team) => (
                <option key={team.teamName} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {team1 && team2 && (
          <div className="comparison-content">
            <div className="team-headers">
              <div className="team-header">
                <img
                  src={team1.logo}
                  alt={team1.teamName}
                  className="team-logo"
                />
                <h3>{team1.teamName}</h3>
              </div>
              <div className="team-header">
                <img
                  src={team2.logo}
                  alt={team2.teamName}
                  className="team-logo"
                />
                <h3>{team2.teamName}</h3>
              </div>
            </div>

            <div className="stats-section">
              <h4>⚽ Голы и забитие</h4>
              {renderStatComparison(
                "Голы забитые",
                team1.teamStatistics.goalsScored,
                team2.teamStatistics.goalsScored
              )}
              {renderStatComparison(
                "Пропущенные голы",
                team1.teamStatistics.goalsConceded,
                team2.teamStatistics.goalsConceded,
                false
              )}
              {renderStatComparison(
                "Автоголы",
                team1.teamStatistics.ownGoals,
                team2.teamStatistics.ownGoals,
                false
              )}
              {renderStatComparison(
                "Голевые передачи",
                team1.teamStatistics.assists,
                team2.teamStatistics.assists
              )}
              {renderStatComparison(
                "Пенальти забитые",
                team1.teamStatistics.penaltyGoals,
                team2.teamStatistics.penaltyGoals
              )}
              {renderStatComparison(
                "Пенальти исполненные",
                team1.teamStatistics.penaltiesTaken,
                team2.teamStatistics.penaltiesTaken
              )}
              {renderStatComparison(
                "Голы со штрафных",
                team1.teamStatistics.freeKickGoals,
                team2.teamStatistics.freeKickGoals
              )}
            </div>

            <div className="stats-section">
              <h4>📍 Голы по зонам</h4>
              {renderStatComparison(
                "Голы из штрафной",
                team1.teamStatistics.goalsFromInsideTheBox,
                team2.teamStatistics.goalsFromInsideTheBox
              )}
              {renderStatComparison(
                "Голы вне штрафной",
                team1.teamStatistics.goalsFromOutsideTheBox,
                team2.teamStatistics.goalsFromOutsideTheBox
              )}
              {renderStatComparison(
                "Голы головой",
                team1.teamStatistics.headedGoals,
                team2.teamStatistics.headedGoals
              )}
              {renderStatComparison(
                "Голы левой ногой",
                team1.teamStatistics.leftFootGoals,
                team2.teamStatistics.leftFootGoals
              )}
              {renderStatComparison(
                "Голы правой ногой",
                team1.teamStatistics.rightFootGoals,
                team2.teamStatistics.rightFootGoals
              )}
            </div>

            <div className="stats-section">
              <h4>🎯 Удары и атака</h4>
              {renderStatComparison(
                "Всего ударов",
                team1.teamStatistics.shots,
                team2.teamStatistics.shots
              )}
              {renderStatComparison(
                "Удары в створ",
                team1.teamStatistics.shotsOnTarget,
                team2.teamStatistics.shotsOnTarget
              )}
              {renderStatComparison(
                "Удары мимо",
                team1.teamStatistics.shotsOffTarget,
                team2.teamStatistics.shotsOffTarget,
                false
              )}
              {renderStatComparison(
                "Удары из штрафной",
                team1.teamStatistics.shotsFromInsideTheBox,
                team2.teamStatistics.shotsFromInsideTheBox
              )}
              {renderStatComparison(
                "Удары вне штрафной",
                team1.teamStatistics.shotsFromOutsideTheBox,
                team2.teamStatistics.shotsFromOutsideTheBox
              )}
              {renderStatComparison(
                "Заблокированные удары",
                team1.teamStatistics.blockedScoringAttempt,
                team2.teamStatistics.blockedScoringAttempt,
                false
              )}
              {renderStatComparison(
                "Попадания в штангу/перекладину",
                team1.teamStatistics.hitWoodwork,
                team2.teamStatistics.hitWoodwork
              )}
              {renderStatComparison(
                "Удары со штрафных",
                team1.teamStatistics.freeKickShots,
                team2.teamStatistics.freeKickShots
              )}
            </div>

            <div className="stats-section">
              <h4>⭐ Большие моменты</h4>
              {renderStatComparison(
                "Большие моменты",
                team1.teamStatistics.bigChances,
                team2.teamStatistics.bigChances
              )}
              {renderStatComparison(
                "Созданные большие моменты",
                team1.teamStatistics.bigChancesCreated,
                team2.teamStatistics.bigChancesCreated
              )}
              {renderStatComparison(
                "Упущенные большие моменты",
                team1.teamStatistics.bigChancesMissed,
                team2.teamStatistics.bigChancesMissed,
                false
              )}
              {renderStatComparison(
                "Быстрые атаки",
                team1.teamStatistics.fastBreaks,
                team2.teamStatistics.fastBreaks
              )}
              {renderStatComparison(
                "Голы с быстрых атак",
                team1.teamStatistics.fastBreakGoals,
                team2.teamStatistics.fastBreakGoals
              )}
              {renderStatComparison(
                "Удары с быстрых атак",
                team1.teamStatistics.fastBreakShots,
                team2.teamStatistics.fastBreakShots
              )}
            </div>

            <div className="stats-section">
              <h4>🏃‍♂️ Дриблинг и владение</h4>
              {renderStatComparison(
                "Средний % владения мячом",
                team1.teamStatistics.averageBallPossession,
                team2.teamStatistics.averageBallPossession,
                true,
                true
              )}
              {renderStatComparison(
                "Успешные дриблинги",
                team1.teamStatistics.successfulDribbles,
                team2.teamStatistics.successfulDribbles
              )}
              {renderStatComparison(
                "Попытки дриблинга",
                team1.teamStatistics.dribbleAttempts,
                team2.teamStatistics.dribbleAttempts
              )}
              {renderStatComparison(
                "% успешного дриблинга",
                team1.teamStatistics.dribbleAttempts > 0
                  ? (team1.teamStatistics.successfulDribbles /
                      team1.teamStatistics.dribbleAttempts) *
                      100
                  : 0,
                team2.teamStatistics.dribbleAttempts > 0
                  ? (team2.teamStatistics.successfulDribbles /
                      team2.teamStatistics.dribbleAttempts) *
                      100
                  : 0,
                true,
                true
              )}
              {renderStatComparison(
                "Потери мяча",
                team1.teamStatistics.possessionLost,
                team2.teamStatistics.possessionLost,
                false
              )}
              {renderStatComparison(
                "Офсайды",
                team1.teamStatistics.offsides,
                team2.teamStatistics.offsides,
                false
              )}
            </div>

            <div className="stats-section">
              <h4>📈 Передачи</h4>
              {renderStatComparison(
                "Всего передач",
                team1.teamStatistics.totalPasses,
                team2.teamStatistics.totalPasses
              )}
              {renderStatComparison(
                "Точные передачи",
                team1.teamStatistics.accuratePasses,
                team2.teamStatistics.accuratePasses
              )}
              {renderStatComparison(
                "% точных передач",
                team1.teamStatistics.accuratePassesPercentage,
                team2.teamStatistics.accuratePassesPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Передачи на своей половине",
                team1.teamStatistics.totalOwnHalfPasses,
                team2.teamStatistics.totalOwnHalfPasses
              )}
              {renderStatComparison(
                "Точные передачи на своей половине",
                team1.teamStatistics.accurateOwnHalfPasses,
                team2.teamStatistics.accurateOwnHalfPasses
              )}
              {renderStatComparison(
                "% точности на своей половине",
                team1.teamStatistics.accurateOwnHalfPassesPercentage,
                team2.teamStatistics.accurateOwnHalfPassesPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Передачи на чужой половине",
                team1.teamStatistics.totalOppositionHalfPasses,
                team2.teamStatistics.totalOppositionHalfPasses
              )}
              {renderStatComparison(
                "Точные передачи на чужой половине",
                team1.teamStatistics.accurateOppositionHalfPasses,
                team2.teamStatistics.accurateOppositionHalfPasses
              )}
              {renderStatComparison(
                "% точности на чужой половине",
                team1.teamStatistics.accurateOppositionHalfPassesPercentage,
                team2.teamStatistics.accurateOppositionHalfPassesPercentage,
                true,
                true
              )}
            </div>

            <div className="stats-section">
              <h4>🎯 Длинные передачи и кроссы</h4>
              {renderStatComparison(
                "Всего длинных передач",
                team1.teamStatistics.totalLongBalls,
                team2.teamStatistics.totalLongBalls
              )}
              {renderStatComparison(
                "Точные длинные передачи",
                team1.teamStatistics.accurateLongBalls,
                team2.teamStatistics.accurateLongBalls
              )}
              {renderStatComparison(
                "% точных длинных передач",
                team1.teamStatistics.accurateLongBallsPercentage,
                team2.teamStatistics.accurateLongBallsPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Всего кроссов",
                team1.teamStatistics.totalCrosses,
                team2.teamStatistics.totalCrosses
              )}
              {renderStatComparison(
                "Точные кроссы",
                team1.teamStatistics.accurateCrosses,
                team2.teamStatistics.accurateCrosses
              )}
              {renderStatComparison(
                "% точных кроссов",
                team1.teamStatistics.accurateCrossesPercentage,
                team2.teamStatistics.accurateCrossesPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Угловые",
                team1.teamStatistics.corners,
                team2.teamStatistics.corners
              )}
            </div>

            <div className="stats-section">
              <h4>🛡️ Оборона</h4>
              {renderStatComparison(
                "Сухие матчи",
                team1.teamStatistics.cleanSheets,
                team2.teamStatistics.cleanSheets
              )}
              {renderStatComparison(
                "Отборы",
                team1.teamStatistics.tackles,
                team2.teamStatistics.tackles
              )}
              {renderStatComparison(
                "Перехваты",
                team1.teamStatistics.interceptions,
                team2.teamStatistics.interceptions
              )}
              {renderStatComparison(
                "Сейвы",
                team1.teamStatistics.saves,
                team2.teamStatistics.saves
              )}
              {renderStatComparison(
                "Ошибки, приведшие к голу",
                team1.teamStatistics.errorsLeadingToGoal,
                team2.teamStatistics.errorsLeadingToGoal,
                false
              )}
              {renderStatComparison(
                "Ошибки, приведшие к удару",
                team1.teamStatistics.errorsLeadingToShot,
                team2.teamStatistics.errorsLeadingToShot,
                false
              )}
              {renderStatComparison(
                "Пенальти нарушенные",
                team1.teamStatistics.penaltiesCommited,
                team2.teamStatistics.penaltiesCommited,
                false
              )}
              {renderStatComparison(
                "Голы с пенальти пропущенные",
                team1.teamStatistics.penaltyGoalsConceded,
                team2.teamStatistics.penaltyGoalsConceded,
                false
              )}
              {renderStatComparison(
                "Прочистки",
                team1.teamStatistics.clearances,
                team2.teamStatistics.clearances
              )}
              {renderStatComparison(
                "Прочистки с линии ворот",
                team1.teamStatistics.clearancesOffLine,
                team2.teamStatistics.clearancesOffLine
              )}
              {renderStatComparison(
                "Отборы последним защитником",
                team1.teamStatistics.lastManTackles,
                team2.teamStatistics.lastManTackles
              )}
              {renderStatComparison(
                "Возвраты мяча",
                team1.teamStatistics.ballRecovery,
                team2.teamStatistics.ballRecovery
              )}
            </div>

            <div className="stats-section">
              <h4>🥊 Единоборства</h4>
              {renderStatComparison(
                "Всего единоборств",
                team1.teamStatistics.totalDuels,
                team2.teamStatistics.totalDuels
              )}
              {renderStatComparison(
                "Выигранные единоборства",
                team1.teamStatistics.duelsWon,
                team2.teamStatistics.duelsWon
              )}
              {renderStatComparison(
                "% выигранных единоборств",
                team1.teamStatistics.duelsWonPercentage,
                team2.teamStatistics.duelsWonPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Наземные единоборства",
                team1.teamStatistics.totalGroundDuels,
                team2.teamStatistics.totalGroundDuels
              )}
              {renderStatComparison(
                "Выигранные наземные единоборства",
                team1.teamStatistics.groundDuelsWon,
                team2.teamStatistics.groundDuelsWon
              )}
              {renderStatComparison(
                "% выигранных наземных единоборств",
                team1.teamStatistics.groundDuelsWonPercentage,
                team2.teamStatistics.groundDuelsWonPercentage,
                true,
                true
              )}
              {renderStatComparison(
                "Воздушные единоборства",
                team1.teamStatistics.totalAerialDuels,
                team2.teamStatistics.totalAerialDuels
              )}
              {renderStatComparison(
                "Выигранные воздушные единоборства",
                team1.teamStatistics.aerialDuelsWon,
                team2.teamStatistics.aerialDuelsWon
              )}
              {renderStatComparison(
                "% выигранных воздушных единоборств",
                team1.teamStatistics.aerialDuelsWonPercentage,
                team2.teamStatistics.aerialDuelsWonPercentage,
                true,
                true
              )}
            </div>

            <div className="stats-section">
              <h4>⚠️ Дисциплина</h4>
              {renderStatComparison(
                "Нарушения",
                team1.teamStatistics.fouls,
                team2.teamStatistics.fouls,
                false
              )}
              {renderStatComparison(
                "Желтые карточки",
                team1.teamStatistics.yellowCards,
                team2.teamStatistics.yellowCards,
                false
              )}
              {renderStatComparison(
                "Желто-красные карточки",
                team1.teamStatistics.yellowRedCards,
                team2.teamStatistics.yellowRedCards,
                false
              )}
              {renderStatComparison(
                "Красные карточки",
                team1.teamStatistics.redCards,
                team2.teamStatistics.redCards,
                false
              )}
            </div>

            <div className="stats-section">
              <h4>🆚 Статистика соперника</h4>
              {renderStatComparison(
                "Удары против",
                team1.teamStatistics.shotsAgainst,
                team2.teamStatistics.shotsAgainst,
                false
              )}
              {renderStatComparison(
                "Удары в створ против",
                team1.teamStatistics.shotsOnTargetAgainst,
                team2.teamStatistics.shotsOnTargetAgainst,
                false
              )}
              {renderStatComparison(
                "Удары мимо против",
                team1.teamStatistics.shotsOffTargetAgainst,
                team2.teamStatistics.shotsOffTargetAgainst,
                false
              )}
              {renderStatComparison(
                "Заблокированные удары против",
                team1.teamStatistics.shotsBlockedAgainst,
                team2.teamStatistics.shotsBlockedAgainst
              )}
              {renderStatComparison(
                "Большие моменты против",
                team1.teamStatistics.bigChancesAgainst,
                team2.teamStatistics.bigChancesAgainst,
                false
              )}
              {renderStatComparison(
                "Созданные большие моменты против",
                team1.teamStatistics.bigChancesCreatedAgainst,
                team2.teamStatistics.bigChancesCreatedAgainst,
                false
              )}
              {renderStatComparison(
                "Упущенные большие моменты против",
                team1.teamStatistics.bigChancesMissedAgainst,
                team2.teamStatistics.bigChancesMissedAgainst
              )}
            </div>

            <div className="stats-section">
              <h4>📊 Общие показатели</h4>
              {renderStatComparison(
                "Рейтинг команды",
                team1.teamRating,
                team2.teamRating,
                true,
                true
              )}
              {renderStatComparison(
                "Средний рейтинг игроков",
                team1.teamStatistics.avgRating,
                team2.teamStatistics.avgRating,
                true,
                true
              )}
              {renderStatComparison(
                "Матчи сыграно",
                team1.teamStatistics.matches,
                team2.teamStatistics.matches
              )}
              {renderStatComparison(
                "Присужденные матчи",
                team1.teamStatistics.awardedMatches,
                team2.teamStatistics.awardedMatches,
                false
              )}
              {renderStatComparison(
                "Вбрасывания",
                team1.teamStatistics.throwIns,
                team2.teamStatistics.throwIns
              )}
              {renderStatComparison(
                "Удары от ворот",
                team1.teamStatistics.goalKicks,
                team2.teamStatistics.goalKicks
              )}
              {renderStatComparison(
                "Штрафные удары",
                team1.teamStatistics.freeKicks,
                team2.teamStatistics.freeKicks
              )}
            </div>
          </div>
        )}

        {(!team1 || !team2) && (
          <div className="selection-prompt">
            <p>Выберите две команды для сравнения их статистики</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamComparison;
