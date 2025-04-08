import {GoalType, Match, Scoreboard} from './Scoreboard';

describe('Scoreboard', () => {
    let scoreboard: Scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    const mockedNonExistingMatch: Match = {
        homeTeam: 'NonExistingTeamA',
        awayTeam: 'NonExistingTeamB',
        homeScore: 0,
        awayScore: 0,
    }

    test('should start a new match with initial score 0-0', () => {
        const mockedMatch: Match = {
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 0,
            awayScore: 0,
        }
        scoreboard.startMatch('Team A', 'Team B');
        const matches = scoreboard.getMatches();
        expect(matches).toHaveLength(1);
        expect(matches[0]).toEqual(mockedMatch);
    });

    test('should capture home and away team names when starting a match', () => {
        scoreboard.startMatch('Home Team', 'Away Team');
        const matches = scoreboard.getMatches();
        expect(matches[0].homeTeam).toBe('Home Team');
        expect(matches[0].awayTeam).toBe('Away Team');
    });

    test('should update the score of an existing match', () => {
        const mockedMatch: Match = {
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 0,
            awayScore: 0,
        }
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
        expect(() => {
            scoreboard.updateScore(mockedNonExistingMatch, GoalType.HOME_GOAL);
        }).toThrow('Match not found');
    });

    test('should remove a match from the scoreboard', () => {
        const mockedMatch: Match = {
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 0,
            awayScore: 0,
        }
        scoreboard.startMatch('Team A', 'Team B');
        scoreboard.finishMatch(mockedMatch);
        const matches = scoreboard.getMatches();
        expect(matches).toHaveLength(0);
    });

    test('should throw an error if the match does not exist', () => {
        expect(() => {
            scoreboard.finishMatch(mockedNonExistingMatch);
        }).toThrow('Match not found');
    });
    
    test('should return matches ordered by total score and recency', () => {
        const mockedMatch1: Match = {
            homeTeam: 'Team A',
            awayTeam: 'Team B',
            homeScore: 0,
            awayScore: 0,
        }
        
        const mockedMatch2: Match = {
            homeTeam: 'Team C',
            awayTeam: 'Team D',
            homeScore: 0,
            awayScore: 0,
        };
        
        const mockedMatch3: Match = {
            homeTeam: 'Team E',
            awayTeam: 'Team F',
            homeScore: 0,
            awayScore: 0,
        };
        
        scoreboard.startMatch('Team A', 'Team B');
        scoreboard.startMatch('Team C', 'Team D');
        scoreboard.startMatch('Team E', 'Team F');
        
        scoreboard.updateScore(mockedMatch1, GoalType.HOME_GOAL);
        
        scoreboard.updateScore(mockedMatch2, GoalType.HOME_GOAL);
        scoreboard.updateScore(mockedMatch2, GoalType.AWAY_GOAL);
        
        scoreboard.updateScore(mockedMatch3, GoalType.AWAY_GOAL);
        
        const summary = scoreboard.getSummary();
        expect(summary).toEqual([
            { homeTeam: 'Team C', awayTeam: 'Team D', homeScore: 1, awayScore: 1 },
            { homeTeam: 'Team E', awayTeam: 'Team F', homeScore: 0, awayScore: 1 },
            { homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 1, awayScore: 0 }
        ]);
    });
    
    test('should return an empty array if no matches are in progress', () => {
        const summary = scoreboard.getSummary();
        expect(summary).toEqual([]);
    });

});

