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
