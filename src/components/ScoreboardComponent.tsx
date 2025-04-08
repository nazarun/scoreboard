import React, { useEffect, useState } from "react";
import { Scoreboard } from "./Scoreboard";
import { Match, GoalType } from "../types/commonTypes";

const scoreboard = new Scoreboard();

const ScoreboardComponent: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(scoreboard.getMatches());
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [summary, setSummary] = useState<Match[]>(scoreboard.getSummary());

  useEffect(() => {
    setSummary(scoreboard.getSummary());
  }, [matches]);

  const handleStartMatch = () => {
    if (homeTeam && awayTeam) {
      scoreboard.startMatch(homeTeam, awayTeam);
      setMatches(scoreboard.getMatches());
      setSummary(scoreboard.getSummary());
      setHomeTeam("");
      setAwayTeam("");
    }
  };

  const onUpdateScore = (match: Match, goalType: GoalType) => {
    scoreboard.updateScore(match, goalType);
    setMatches(scoreboard.getMatches());
  };

  const onFinishMatch = (match: Match) => {
    scoreboard.finishMatch(match);
    setMatches(scoreboard.getMatches());
  };

  return (
    <div>
      <h1>Scoreboard</h1>
      <div>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={handleStartMatch} disabled={!homeTeam || !awayTeam}>
          Start Match
        </button>
      </div>

      {matches.length > 0 ? (
        <>
          <h2>Ongoing matches</h2>
          {matches.map((match, index) => (
            <div key={`ongoing-${index}`}>
              {match.homeTeam} vs {match.awayTeam}: {match.homeScore} -{" "}
              {match.awayScore}
              <button onClick={() => onUpdateScore(match, GoalType.HOME_GOAL)}>
                Home team Goal
              </button>
              <button onClick={() => onUpdateScore(match, GoalType.AWAY_GOAL)}>
                Away team Goal
              </button>
              <button onClick={() => onFinishMatch(match)}>Finish match</button>
            </div>
          ))}
        </>
      ) : null}

      {summary.length > 0 ? (
        <>
          <h2>Matches summary</h2>
          {summary.map((match, index) => (
            <div key={`summary-${index}`}>
              {match.homeTeam} vs {match.awayTeam}: {match.homeScore} -{" "}
              {match.awayScore}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ScoreboardComponent;
