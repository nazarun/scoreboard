import React, { useState } from 'react';
import {Scoreboard, Match, GoalType} from './Scoreboard';

const scoreboard = new Scoreboard();

const ScoreboardComponent: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(scoreboard.getMatches());
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleStartMatch = () => {
    if (homeTeam && awayTeam) {
      scoreboard.startMatch(homeTeam, awayTeam);
      setMatches(scoreboard.getMatches());
      setHomeTeam('');
      setAwayTeam('');
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
        <button onClick={handleStartMatch}>Start Match</button>
      </div>
      <ul>
        {matches.map((match, index) => (
          <li key={`${match.homeTeam}-${index}`}>
            {match.homeTeam} vs {match.awayTeam}: {match.homeScore} - {match.awayScore}
            <button onClick={() => onUpdateScore(match, GoalType.HOME_GOAL)}>Home team Goal</button>
            <button onClick={() => onUpdateScore(match, GoalType.AWAY_GOAL)}>Away team Goal</button>
            <button onClick={() => onFinishMatch(match)}>Finish match</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreboardComponent;
