export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
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
}
