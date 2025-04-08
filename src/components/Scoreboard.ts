import { Match, GoalType } from "../types/commonTypes";

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

    getSummary(): Match[] {
        return [...this.matches]
            .sort((a, b) => {
                const totalScoreA = a.homeScore + a.awayScore;
                const totalScoreB = b.homeScore + b.awayScore;

                if (totalScoreA === totalScoreB) {
                    return this.matches.indexOf(b) - this.matches.indexOf(a);
                }

                return totalScoreB - totalScoreA;
            });
    }
}
