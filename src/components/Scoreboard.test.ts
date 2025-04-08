import {GoalType, Scoreboard} from './Scoreboard';

describe('Scoreboard', () => {
    let scoreboard: Scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    const mockedMatch = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        homeScore: 0,
        awayScore: 0,
    }

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

    test('should update the score of an existing match', () => {
        scoreboard.startMatch('Team A', 'Team B');
        scoreboard.updateScore(mockedMatch, GoalType.HOME_GOAL);
        const matches = scoreboard.getMatches();
        expect(matches[0]).toEqual({
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 1,
            awayScore: 0,
        });
    });

    test('should throw an error if the match does not exist', () => {
        mockedMatch.homeTeam = 'Nonexistent Team';
        expect(() => {
            scoreboard.updateScore(mockedMatch, GoalType.HOME_GOAL);
        }).toThrow('Match not found');
    });

    test('should remove a match from the scoreboard', () => {
        scoreboard.startMatch('Team A', 'Team B');
        scoreboard.finishMatch(mockedMatch);
        const matches = scoreboard.getMatches();
        expect(matches).toHaveLength(0);
    });

    test('should throw an error if the match does not exist', () => {
        mockedMatch.homeTeam = 'Nonexistent Team';
        expect(() => {
            scoreboard.finishMatch(mockedMatch);
        }).toThrow('Match not found');
    });

});

