import { NhlTeamInterface } from "./NhlTeamInterface";
import { GoalieStatsInterface, SkaterStatsInterface } from "./StatsInterface";

export interface PlayerInterface {
  id: number;
  full_name: string;
  position: string;
  jersey_number: number;
  nhl_team: NhlTeamInterface;
  skater_stat: SkaterStatsInterface;
  goalie_stat: GoalieStatsInterface;
}