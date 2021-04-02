import { db_teams } from '../database/database';
import { Callback, VoidCallback } from '../types/callback.type';
import { CreateTeam, TeamDoc } from '../types/Team.type';
import { piscineService } from './parameters.service';

class TeamService {

  private readonly base = { 
    lengths: 0, 
    totalDistance: 0,
    selected: false,
    lastLengthsTime: '-',
    bestLengthsTime: '-'
  };

  constructor() {
    this.createIfNotExist();
  }

  create(team: CreateTeam, callback: Callback<TeamDoc>): void {
    const toSave = { ...this.base, ...team };
    db_teams.post(toSave, (err: any, id: string) => {
      if (err) {
        console.error('[TeamService] create ->', err);
        return
      }
      callback({ ...toSave, id });
    });
  }

  findAll(callback: Callback<TeamDoc[]>): void {
    db_teams.all((err: any, docs: TeamDoc[]) => {
      if (err) {
        console.error('[TeamService] findAll ->', err);
        return
      }
      piscineService.getDoc(piscine => {
        const teams = docs.map(doc => {
          return {
            ...doc,
            totalDistance: doc.lengths * piscine.size
          }
        });
        callback(teams);
      });
    });
  }

  findOne(id: string, callback: Callback<TeamDoc>): void {
    db_teams.get(id, (err: any, doc: TeamDoc) => {
      if (err) {
        console.error('[TeamService] findOne ->', err);
        return
      }
      callback(doc);
    });
  }

  update(team: TeamDoc, callback?: VoidCallback): void {
    this.findOne(team.id, doc => {
      db_teams.put(team.id, { ...doc, ...team }, (err: any, id: string) => {
        if (err) {
          console.error('[TeamService] update ->', err);
          return
        }
        callback && callback();
      });
    });
  }

  delete(id: string, callback: VoidCallback): void {
    db_teams.delete(id, (err: any) => {
      if (err) {
        console.error('[TeamService] delete ->', err);
        return;
      }
      callback();
    });
  }

  setSelected(id: string, callback: VoidCallback): void {
    this.findOne(id, team => {
      this.update({ ...team, selected: true }, callback);
    });
  }

  addLengths(id: string, callback: VoidCallback): void {
    this.findOne(id, team => {
      piscineService.getDoc(piscineDoc => {
        const lengths = team.lengths + 1;
        const totalDistance = lengths * piscineDoc.size;
        const lastEntryAt = Date.now();
        const lastLengthsTimeInNumber = lastEntryAt - team.lastEntryAt;
        const lastLengthsTime = this.parseMsToTime(lastLengthsTimeInNumber);
  
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
  
        this.update({ ...team, lengths, totalDistance, lastEntryAt, lastLengthsTime, lastLengthsTimeInNumber, bestLengthsTimeInNumber, bestLengthsTime }, callback);
      });
    });
  }

  removeLengths(id: string, callback: VoidCallback): void {
    this.findOne(id, team => {
      console.warn('[TeamService] REMOVE ONE LENGHTS TO TEAM:', team.name);
      piscineService.getDoc(piscineDoc => {
        const lengths = team.lengths - 1;
        const totalDistance = lengths * piscineDoc.size;
        this.update({ ...team, lengths, totalDistance }, callback);
      });
    });
  }

  setLastEntry(callback: VoidCallback): void {
    const startedDate = Date.now();
    this.findAll(teams => {
      teams.forEach(team => {
        team.lastEntryAt = startedDate;
        this.update(team);
      });
      callback();
    });
  }

  private createIfNotExist() {
    if (!db_teams.existsSync()) {
      db_teams.createSync();
    }
  }

  private parseMsToTime(ms: number): string {
    const minutes = Math.floor((ms / 1000 / 60) << 0);
    const seconds = Math.floor(ms / 1000 % 60);
    const milliseconds = parseInt((ms / 1000).toString().split('.')[1]);

    return `${this.padStart(minutes)} : ${this.padStart(seconds)}.${this.padStart(milliseconds, 3)}`;
  }

  private padStart(value: number, minLength: number = 2): string {
    return value.toString().padStart(minLength, '0');
  }

}
export const teamService = new TeamService();