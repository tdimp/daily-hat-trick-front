import { GoalieStatsInterface, SkaterStatsInterface } from "./StatsInterface";

export interface PlayerInterface {
  id: number;
  full_name: string;
  position: string;
  jersey_number: number;
  nhl_team: any;
  skater_stat: SkaterStatsInterface;
  goalie_stat: GoalieStatsInterface;
}