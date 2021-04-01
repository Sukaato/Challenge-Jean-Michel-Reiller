import { db_teams } from '../database/database';
import { piscineService } from './database_parameters.service';
import { CreateTeam, Team } from '../types/Team.type';

const createIfNotExist = () => {
  if (!db_teams.existsSync()) {
    db_teams.createSync();
  }
}

export const createTeam = (team: CreateTeam, callback: (team: Team) => void): void => {
  createIfNotExist();
  const filledTeam = { 
    ...team,
    lengths: 0,
    totalDistance: 0,
    selected: false,
    lastLengthsTime: '-',
    bestLengthsTime: '-'
  };
  db_teams.post(filledTeam, (err: any, id: string) => {
    if (err) {
      console.error('[createTeam]', err);
      return
    }
    callback({ ...filledTeam, id });
  });
}

export const updateTeam = (team: Team, callback?: () => void): void => {
  findOneTeam(team.id, teamDoc => {
    return db_teams.put(team.id, { ...teamDoc, ...team }, (err: any, id: string) => {
      if (err) {
        console.error('[updateTeam]', err);
        return
      }
      callback && callback();
    });
  });
}

export const findOneTeam = (id: string, callback: (team: Team) => void): void => {
  createIfNotExist();
  db_teams.get(id, (err: any, docs: Team) => {
    if (err) {
      console.error('[findOneTeam]', err);
      return
    }
    callback(docs);
  });
}

export const findTeams = (callback: (docs: Team[]) => void): void => {
  createIfNotExist();
  db_teams.all((err: any, docs: Team[]) => {
    if (err) {
      console.error('[findTeams]', err);
      return
    }
    piscineService.getDoc(piscineDoc => {
      const teams = docs.map(doc => {
        return {
          ...doc,
          totalDistance: doc.lengths * piscineDoc.size
        }
      })
      callback(teams);
    });
  });
}

export const deleteTeam = (id: string, callback: () => void): void => {
  createIfNotExist();
  db_teams.delete(id, (err: any) => {
    if (err) {
      console.error('[deleteTeam]', err);
      return
    }
    callback();
  });
}

export const setSelectedTeam = (id: string, callback: () => void): void => {
  findOneTeam(id, team => {
    updateTeam({ ...team, selected: true }, callback);
  });
}

export const addLengthsTeam = (id: string, callback: () => void): void => {
  findOneTeam(id, team => {
    piscineService.getDoc(piscineDoc => {
      const lengths = team.lengths + 1;
      const totalDistance = lengths * piscineDoc.size;
      const lastEntryAt = Date.now();
      const lastLengthsTimeInNumber = lastEntryAt - team.lastEntryAt;
      const lastLengthsTime = parseMsToTime(lastLengthsTimeInNumber);

      const bestLengthsTimeInNumber = team.bestLengthsTimeInNumber 
        ? lastLengthsTimeInNumber < team.bestLengthsTimeInNumber 
          ? lastLengthsTimeInNumber
          : team.bestLengthsTimeInNumber
        : lastLengthsTimeInNumber;

      const bestLengthsTime = team.bestLengthsTimeInNumber 
        ? lastLengthsTimeInNumber < team.bestLengthsTimeInNumber 
          ? lastLengthsTime
          : team.bestLengthsTime
        : lastLengthsTime;

      updateTeam({ ...team, lengths, totalDistance, lastEntryAt, lastLengthsTime, lastLengthsTimeInNumber, bestLengthsTimeInNumber, bestLengthsTime }, callback);
    });
  });
}

export const removeLengthsTeam = (id: string, callback: () => void): void => {
  findOneTeam(id, team => {
    console.warn('[TEAM REMOVE ONE LENGTHS]:', team.name);
    piscineService.getDoc(piscineDoc => {
      const lengths = team.lengths - 1;
      const totalDistance = lengths * piscineDoc.size;
      updateTeam({ ...team, lengths, totalDistance }, callback);
    });
  });
}

export const setStartNumberDateToTeams = (callback: () => void) => {
  const startedDate = Date.now();
  findTeams(teams => {
    teams.forEach(team => {
      team.lastEntryAt = startedDate;
      updateTeam(team);
    });
    callback();
  });
}

function padStart(value: number, minLength: number = 2): string {
  return value.toString().padStart(minLength, '0');
}

function parseMsToTime(ms: number): string {
  const minutes = Math.floor((ms / 1000 / 60) << 0);
  const seconds = Math.floor(ms / 1000 % 60);
  const milliseconds = parseInt((ms / 1000).toString().split('.')[1]);

  return `${padStart(minutes)} : ${padStart(seconds)}.${padStart(milliseconds, 3)}`;
}