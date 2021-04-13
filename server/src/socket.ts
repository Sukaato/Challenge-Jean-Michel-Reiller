import { Server } from 'node:http';
import { Server as SocketIo, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { LoggerService } from './services/logger.service';
import { piscineService, sessionService, sessionTimerService } from './services/parameters.service';
import { teamService } from './services/teams.service';
import { Timer } from './timer';
import { LogDoc } from './types/log.type';
import { CreateTeam, TeamDoc } from './types/Team.type';

let webSocket: SocketIo<DefaultEventsMap, DefaultEventsMap>;;

export class ServerSocket {
  private logger = new LoggerService(ServerSocket.name);
  private timer: Timer;

  constructor(server: Server) {
    webSocket = new SocketIo(server, { cors: { origin: '*' }});
    this.connection();
    this.initParams();
  }

  private connection() {
    webSocket.on('connection', socket => {
      socket.emit('connection', socket.id);
      this.sendTeams(socket);
      this.initParams();

      /* Admin */
      socket.on('teams:create', (data: CreateTeam) => {
        this.onCreateTeam(data);
      });

      socket.on('teams:modify', (data: TeamDoc) => {
        this.onModifyTeam(data);
      });

      socket.on('teams:delete', ({ id }) => {
        this.onDeleteTeam(id);
      });

      socket.on('log:delete', ({ id }) => {
        this.onDeleteLogs(id);
      });

      /* Jury */
      socket.on('team:select', ({ id }) => {
        this.onTeamSelect(id);
      });

      socket.on('team:add', ({ id }) => {
        this.onTeamAddLengths(id);
      });

      socket.on('team:remove', ({ id }) => {
        this.onTeamRemoveLengths(id);
      });

      /* Parameters */
      socket.on('parameters:piscineSize', ({ size }) => {
        this.onParametersPiscineSize(size);
      });

      socket.on('parameters:sessionTime', ({ time }) => {
        this.onParametersSessionTime(time);
      });

      socket.on('parameters:started', ({ started }) => {
        this.onParametersStarted(started);
      });

      socket.on('parameters:reset', () => {
        this.onReset();
      });

    });
  }

  private initParams(): void {
    piscineService.getDoc(doc => doc ? this.sendPiscine(doc.size) : piscineService.setSize(50, (created) => this.sendPiscine(created.size)))
    sessionService.getDoc(doc => doc ? this.sendSession(doc.time) : sessionService.setTime('1:30', (created) => this.sendSession(created.time)))
    sessionTimerService.getDoc(sessionTimer => webSocket.emit('parameters:started', !(sessionTimer?.paused ?? true)));
    this.sendTeams();
  }

  /* Admin */
  private onCreateTeam(team: CreateTeam): void {
    teamService.create(team, () => {
      this.sendTeams();
    });
  }

  private onModifyTeam(team: TeamDoc): void {
    teamService.update(team, () => {
      this.sendTeams();
    });
  }

  private onDeleteTeam(id: string): void {
    teamService.delete(id, () => {
      this.sendTeams();
    });
  }

  static sendNewLog(logs: LogDoc[]): void {
    webSocket.emit('logs:add', logs);
  }

  private onDeleteLogs(id: string): void {
    this.logger.deleteLogEntry(id);
  }

  /* Jury */
  private onTeamSelect(id: string): void {
    teamService.setSelected(id, () => {
      this.sendTeams();
    });
  }

  private onTeamAddLengths(id: string): void {
    teamService.addLengths(id, () => {
      this.sendTeams();
    });
  }

  private onTeamRemoveLengths(id: string): void {
    teamService.removeLengths(id, () => {
      this.sendTeams();
    });
  }

  /* Parameters */
  private onParametersPiscineSize(size: number): void {
    piscineService.setSize(size, (value) => {
      webSocket.emit('parameters:piscineSize', value.size);
      this.sendTeams();
    });
  }

  private onParametersSessionTime(time: string): void {
    sessionService.setTime(time, (value) => {
      sessionTimerService.delete(() => {
        this.sendTeams();
        webSocket.emit('parameters:sessionTime', value.time);
      });
    });
  }

  private onParametersStarted(started: boolean): void {
    webSocket.emit('parameters:started', started);

    if (started && !this.timer) {
      teamService.setLastEntry(() => {
        this.timer = new Timer(timeleft => {
          webSocket.emit('timeleft', timeleft);
        });
      });
    } else if (started && this.timer) {
      teamService.setLastEntry(() => {
        this.timer.start();
      });
    } else if (!started && this.timer) {
      this.timer.pause();
    } else {
      this.logger.info(`parameters:started -> On a souhaiter arreter le timer, sauf qu'il n'existe pas`);
    }
  }

  private onReset(): void {
    console.log('[APP] parameters:reset -> on reset TOUT');

    if (this.timer) {
      this.timer.pause(() => {
        sessionTimerService.delete(() => {
          webSocket.emit('parameters:started', false);
          webSocket.emit('timeleft', 'Temps restant: 00h 00m 00s');
        });
      });
    }
  }

  static onEnd(): void {
    webSocket.emit('parameters:started', false);
    webSocket.emit('timeleft', 'Session terminée !');
  }

  /* Other */
  private sendTeams(socket?: Socket) {
    teamService.findAll(teams => {
      if (socket) {
        socket.emit('teams', teams);
      } else {
        webSocket.emit('teams', teams);
      }
    });
  }

  private sendSession(time: string): void {
    webSocket.emit('parameters:sessionTime', time);
  }

  private sendPiscine(size: number): void {
    webSocket.emit('parameters:piscineSize', size);
  }

}