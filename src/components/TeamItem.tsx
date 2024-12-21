"use client";
import "@/styles/TeamItem.css";

function getRatingColor(rating: number): string {
  if (rating >= 7.25) return "#049EA1";
  if (rating >= 7.2) return "#65B300";
  if (rating >= 7.15) return "#C4CC00";
  if (rating >= 7.1) return "#FABA00";
  if (rating >= 6.95) return "#FF7B00";
  if (rating >= 6.85) return "#E91D27";
  return "#FFFFFF";
}

const TeamItem = ({
  data,
  teamName,
  avarageAge,
  teamValue,
  // //   logo,
  // teamValue,
  // avarageAge,
  // position,
}) => {
  let dataSorted = null;
  if (data && data.statistics) {
    dataSorted = data.statistics;
  } else {
    // console.log("no dataSorted");
  }

  const rating = Number(dataSorted?.avgRating ?? 0);
  const ratingBgColor = getRatingColor(rating);

  if (!data || !data.statistics) {
    return <div>No statistics available for {data}</div>;
  }

  return (
    <>
      {/* <div>Average Rating: {data.statistics.avgRating}</div> */}

      <div className="team-block-wrapper">
        <div className="team-block">
          <div
            className="position"
            style={{
              color: ratingBgColor,
              borderColor: ratingBgColor,
            }}>
            {/* {position} */}
          </div>
          <div className="team-logo">
            {/* <img className="team-logo-img" src={logo} alt={`${teamName} logo`} /> */}
          </div>
          <div className="team-block-name">{teamName}</div>

          <div className="team-statistics-numbers-block">
            <div className="goal-per-game team-statistic-item">
              {(dataSorted.goalsScored / dataSorted.matches).toFixed(2)}
            </div>
            <div className="missedgoalpergame team-statistic-item">
              {(dataSorted.goalsConceded / dataSorted.matches).toFixed(2)}
            </div>
            <div className="bigChances team-statistic-item">
              {(dataSorted.bigChances / dataSorted.matches).toFixed(1)}
            </div>
            <div className="bigchancesCreated team-statistic-item">
              {(dataSorted.bigChancesCreated / dataSorted.matches).toFixed(1)}
            </div>
            <div className="shootontarget team-statistic-item">
              {(dataSorted.shotsOnTarget / dataSorted.matches).toFixed(1)}
            </div>

            {/* <div className="team-value">{teamValue}</div> */}

            <div className="team-avarage-age">{avarageAge}</div>
          </div>

          <div
            className="team-block-rating"
            style={{ backgroundColor: ratingBgColor }}>
            {dataSorted.avgRating.toFixed(3)}
          </div>
        </div>
        <div
          className="team-block-underline"
          style={{ backgroundColor: ratingBgColor }}></div>
      </div>
    </>
  );
};

export default TeamItem;
