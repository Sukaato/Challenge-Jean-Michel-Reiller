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
