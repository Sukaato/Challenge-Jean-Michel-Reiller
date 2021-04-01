export type Team = {
  id: string;
  name: string;
  objectif: number;
  swimmerCount: number;
  lengths: number
  totalDistance: number;
  selected: boolean;
  lastEntryAt?: number;
  lastLengthsTime: string;
  bestLengthsTime: string;
  lastLengthsTimeInNumber?: number;
  bestLengthsTimeInNumber?: number;
}


export type CreateTeam = {
  name: string;
  objectif: number;
  swimmerCount: number;
}

export type UpdateTeam = {
  id: string;
} & CreateTeam;