import { db_params } from '../database/database';
import { Callback, VoidCallback } from '../types/callback.type';
import { PiscineDoc, SessionDoc, SessionTimer, SessionTimerDoc } from '../types/parameters.type';



class PiscineService {

  getDoc(callback: Callback<PiscineDoc>): void {
    db_params.find({ name: 'piscine' }, (err: any, docs: PiscineDoc[]) => {
      if (err) {
        console.error('[PiscineService]: getDoc ->', err);
        return;
      }
      callback(docs[0] || null);
    });
  }

  setSize(size: number, callback: Callback<PiscineDoc>): void {
    this.getDoc(doc => {
      if (doc) {
        db_params.put(doc.id, { ...doc, size }, (err: any) => {
          if (err) {
            console.error('[PiscineService]: setSize ->', err);
            return;
          }
          callback({ ...doc, size });
        });
      } else {
        db_params.post({ size, name: 'piscine' }, (err: any, id: string) => {
          if (err) {
            console.error('[setPiscineSize]',err);
            return;
          }
          callback({ size, id, name: 'piscine' });
        });
      }
    });
  }
}
export const piscineService = new PiscineService();



class SessionService {

  getDoc(callback: Callback<SessionDoc>): void {
    db_params.find({ name: 'session' }, (err: any, docs: SessionDoc[]) => {
      if (err) {
        console.error('[SessionService] getDoc ->', err);
        return;
      }
      callback(docs[0] || null);
    });
  }

  setTime(time: string, callback: Callback<SessionDoc>): void {
    this.getDoc(doc => {
      if (doc) {
        db_params.put(doc.id, { ...doc, time }, (err: any) => {
          if (err) {
            console.error('[SessionService] setSessionTime ->', err);
            return;
          }
          callback({ ...doc, time });
        });

      } else {
        db_params.post({ time, name: 'session' }, (err: any, id: string) => {
          if (err) {
            console.error('[SessionService] setSessionTime ->', err);
            return;
          }
          callback({ time, id, name: 'session' });
        });
      }
    });
  }
}
export const sessionService = new SessionService();



class SessionTimerService {

  getDoc(callback: Callback<SessionTimerDoc>): void {
    db_params.find({ name: 'sessionTimer' }, (err: any, docs: SessionTimerDoc[]) => {
      if (err) {
        console.error('[SessionTimerService] getDoc ->', err);
      }
      callback(docs[0] || null);
    });
  }

  hasDoc(): boolean {
    let hasDoc = false;
    this.getDoc(doc => {
      hasDoc = !!doc;
    });
    return hasDoc;
  }

  create(timer: SessionTimer, callback?: Callback<SessionTimerDoc>): void {
    this.getDoc(doc => {
      if (doc) return doc;

      db_params.post({ ...timer, name: 'sessionTimer' }, (err: any, id: string) => {
        if (err) {
          console.error('[SessionTimerService] create ->', err);
          return;
        }
        callback && callback({ ...timer, id });
      });
    });
  }

  createFromSessionTime(callback?: Callback<SessionTimerDoc>): void {
    this.getDoc(doc => {
      if (doc) {
        callback && callback(doc);
        return;
      }

      sessionService.getDoc(sessionDoc => {
        const [ hours, minutes, seconds ] = sessionDoc.time.split(':').map(v => parseInt(v));
        this.create({ paused: true, name: 'sessionTimer', time: { hours, minutes, seconds }}, callback);
      });
    });
  }

  setDoc(timer: SessionTimerDoc, callback?: Callback<SessionTimerDoc>): void {
    db_params.put(timer.id, { ...timer }, (err: any) => {
      if (err) {
        console.error('[SessionTimerService] setDoc ->', err);
        return;
      }
      callback && callback(timer);
    });
  }

  pause(callback?: VoidCallback): void {
    this.createFromSessionTime(doc => {
      db_params.put(doc.id, { ...doc, paused: true }, (err: any) => {
        if (err) {
          console.error('[SessionTimerService] pause ->', err);
          return;
        }
        callback && callback();
      });
    });
  }

  resume(callback?: VoidCallback): void {
    this.createFromSessionTime(doc => {
      db_params.put(doc.id, { ...doc, paused: false }, (err: any) => {
        if (err) {
          console.error('[SessionTimerService] resume ->', err);
          return;
        }
        callback && callback();
      });
    });
  }

  delete(callback: VoidCallback): void {
    this.getDoc(doc => {
      if (doc) {
        db_params.delete(doc.id, (err: any) => {
          if (err) {
            console.error('[SessionTimerService] resume ->', err);
            return;
          }
          callback();
        });
      } else {
        callback();
      }
    });
  }
}
export const sessionTimerService = new SessionTimerService();