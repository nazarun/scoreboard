import React, { useState } from 'react';
import { Scoreboard, Match } from './Scoreboard';

const ScoreboardComponent: React.FC = () => {
  const [scoreboard] = useState(new Scoreboard());
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);

  const handleStartMatch = () => {
    if (homeTeam && awayTeam) {
      scoreboard.startMatch(homeTeam, awayTeam);
      setMatches(scoreboard.getMatches());
      setHomeTeam('');
      setAwayTeam('');
    }
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
          <li key={index}>
            {match.homeTeam} vs {match.awayTeam}: {match.homeScore} - {match.awayScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreboardComponent;
