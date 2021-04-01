import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { Server as Io } from 'socket.io';
import { piscineService, sessionService, sessionTimerService } from './services/database_parameters.service';
import { addLengthsTeam, createTeam, deleteTeam, findTeams, removeLengthsTeam, setSelectedTeam, setStartNumberDateToTeams, updateTeam } from './services/database_teams.service';
import { middleware } from './middlewares';
import { routers } from './routes';
import { Timer } from './timer';
import { CreateTeam, Team } from './types/Team.type';

const app: Application = express();
const PORT = 3001;
const ENV = process.env.NODE_ENV || 'development';

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(__dirname);

app.use(express.static(`${__dirname}../../../client/build`));

app.set('trust proxy', true);
app.disable('x-powered-by');

/* Middlewares */
app.use(middleware.local);
app.use(middleware.ip);
app.use(middleware.logger);

/* routes */
app.use('/', routers.home)
app.use('/admin', routers.admin);
app.use('/jury', routers.jury);

/* errors */
app.use(routers.errors[404]);
app.use(routers.errors[500]);


const server = app.listen(PORT, () => {
  console.log(`Started in ${ENV} environement`);
  console.log(`Server listening on http://localhost:${PORT}`);

});

const io = new Io().listen(server, { cors: { origin: '*' }});

const sendTeams = (): void => {
  findTeams(teams => {
    io.emit('teams', teams);
  });
}
const sendPiscine = (size: number): void => {
  io.emit('parameters:piscineSize', size);
}
const sendSession = (time: string): void => {
  io.emit('parameters:sessionTime', time);
}
let timer: Timer;

io.on('connection', async (socket) => {
  socket.emit('connection', socket.id);
  piscineService.getDoc(doc => doc ? sendPiscine(doc.size) : piscineService.setSize(50, (created) => sendPiscine(created.size)))
  sessionService.getDoc(doc => doc ? sendSession(doc.time) : sessionService.setTime('1:30', (created) => sendSession(created.time)))
  sessionTimerService.getDoc(sessionTimer => io.emit('parameters:started', !(sessionTimer?.paused ?? true)));
  sendTeams();

  socket.on('teams:create', (data: CreateTeam) => {
    createTeam(data, () => {
      sendTeams();
    });
  });

  socket.on('teams:modify', (data: Team) => {
    updateTeam(data, () => {
      sendTeams();
    });
  });

  socket.on('teams:delete', (data: { id: string}) => {
    deleteTeam(data.id, () => {
      sendTeams();
    });
  });

  socket.on('team:add', ({ id }) => {
    addLengthsTeam(id, () => {
      sendTeams();
    });
  });

  socket.on('team:remove', ({ id }) => {
    removeLengthsTeam(id, () => {
      sendTeams();
    });
  });

  socket.on('team:select', ({ id }) => {
    setSelectedTeam(id, () => {
      sendTeams();
    });
  });

  socket.on('parameters:piscineSize', ({ size }) => {
    piscineService.setSize(size, (value) => {
      io.emit('parameters:piscineSize', value.size);
      sendTeams();
    });
  });

  socket.on('parameters:sessionTime', ({ time }) => {
    sessionService.setTime(time, (value) => {
      sessionTimerService.delete(() => {
        sendTeams();
        io.emit('parameters:sessionTime', value.time);
      });
    });
  });

  socket.on('parameters:started', ({ started }) => {
    io.emit('parameters:started', started);

    if (started && !timer) {
      setStartNumberDateToTeams(() => {
        timer = new Timer(timeleft => {
          io.emit('timeleft', timeleft);
        });
      });
    } else if (started && timer) {
      setStartNumberDateToTeams(() => {
        timer.start();
      });
    } else if (!started && timer) {
      timer.pause();
    } else {
      console.log(`[APP] parameters:started -> On a souhaiter arreter le timer, sauf qu'il n'existe pas`);
    }
  });

  socket.on('parameters:reset', () => {
    console.log('[APP] parameters:reset -> on reset TOUT');

    if (timer) {
      timer.pause();
    }
    sessionTimerService.delete(() => {
      io.emit('parameters:started', false);
      io.emit('timeleft', 'Temps restant: 00h 00m 00s');
    });
  });
});