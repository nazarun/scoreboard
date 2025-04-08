import { Scoreboard } from './Scoreboard';

describe('Scoreboard', () => {
    let scoreboard: Scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    test('should start a new match with initial score 0-0', () => {
        scoreboard.startMatch('Team A', 'Team B');
        const matches = scoreboard.getMatches();
        expect(matches).toHaveLength(1);
        expect(matches[0]).toEqual({
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 0,
            awayScore: 0,
        });
    });

    test('should capture home and away team names when starting a match', () => {
        scoreboard.startMatch('Home Team', 'Away Team');
        const matches = scoreboard.getMatches();
        expect(matches[0].homeTeam).toBe('Home Team');
        expect(matches[0].awayTeam).toBe('Away Team');
    });
});

