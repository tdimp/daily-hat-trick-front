export interface SkaterStatsInterface {
  time_on_ice: string;
  assists: number;
  goals: number;
  pim: number;
  shots: number;
  games: number;
  hits: number;
  power_play_goals: number;
  power_play_points: number;
  power_play_time_on_ice: string;
  faceoff_pct: number;
  shot_pct: number;
  game_winning_goals: number;
  short_handed_goals: number;
  blocked: number;
  plus_minus: number;
  points: number;
  time_on_ice_per_game: string;
  even_time_on_ice_per_game: string;
  short_handed_time_on_ice_per_game: string;
  power_play_time_on_ice_per_game: string;
}

export interface GoalieStatsInterface {
  time_on_ice: string;
  ot: number;
  shutouts: number;
  wins: number;
  losses: number;
  saves: number;
  save_percentage: number;
  goals_against_average: number;
  games: number;
  games_started: number;
  shots_against: number;
  goals_against: number;
  time_on_ice_per_game: number;
}