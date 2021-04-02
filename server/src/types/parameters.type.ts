export type PiscineDoc = {
  name: 'piscine';
  size: number;
  id: string;
}
export type SessionDoc = {
  name: 'session';
  time: string;
  id?: string;
}

export type SessionTimer = {
  name: 'sessionTimer';
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  },
  paused: boolean;
}
export type SessionTimerDoc = {
  id: string;
} & SessionTimer;