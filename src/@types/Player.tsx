import { GoalieStatsInterface, SkaterStatsInterface } from "./Stats";

export interface PlayerInterface {
  id: number;
  full_name: string;
  position: string;
  jersey_number: number;
  nhl_team: any;
  skater_stats: SkaterStatsInterface[];
  goalie_stats: GoalieStatsInterface[];
}