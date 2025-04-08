export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
}

export enum GoalType {
    HOME_GOAL = 'HOME_GOAL',
    AWAY_GOAL = 'AWAY_GOAL',
}

export class Scoreboard {
    private matches: Match[] = [];

    startMatch(homeTeam: string, awayTeam: string): void {
        const newMatch: Match = {
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
        };
        this.matches.push(newMatch);
    }

    getMatches(): Match[] {
        return this.matches;
    }

    updateScore(match: Match, goalType: GoalType): void {
        const matchIndex = this.matches.findIndex(
            (m) => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam
        );
        if (matchIndex === -1) {
            throw new Error('Match not found');
        }
        const updatedMatch = { ...this.matches[matchIndex] };
        if (goalType === GoalType.HOME_GOAL) {
            updatedMatch.homeScore += 1;
        }
        if (goalType === GoalType.AWAY_GOAL) {
            updatedMatch.awayScore += 1;
        }
        this.matches = this.matches.map((m, index) =>
            index === matchIndex ? updatedMatch : m
        );
    }

    finishMatch(match: Match): void {
        const matchExists = this.matches.some(
            (m) => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam
        );
        if (!matchExists) {
            throw new Error('Match not found');
        }
        this.matches = this.matches.filter(
            (m) => m.homeTeam !== match.homeTeam || m.awayTeam !== match.awayTeam
        );
    }
}
