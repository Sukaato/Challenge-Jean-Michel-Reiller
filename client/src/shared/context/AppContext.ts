import { createContext } from 'react';
import { Team } from '../types/team.type';

export interface IAppContext {
  teams: Team[];
  parameters: {
    piscineSize: number;
    sessionTime: string;
    started: boolean;
  },
  timeleft: string;
}

export const AppContext = createContext<IAppContext>({
  teams: [],
  parameters: {
    piscineSize: 50,
    sessionTime: '1:30',
    started: false,
  },
  timeleft: 'Temps restant: 00h 00m 00s'
})