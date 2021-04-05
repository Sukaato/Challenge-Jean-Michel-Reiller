import { ThemeProvider } from '@material-ui/styles';
import { FC, useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminDrawer } from '../components/AdminDrawer';
import { WaterMark } from '../components/WaterMark';
import { AdminContactPage } from '../pages/admin/Contact';
import { AdminHomePage } from '../pages/admin/Home';
import { AdminLogsPage } from '../pages/admin/Logs';
import { AdminResultsPage } from '../pages/admin/Results';
import { AdminSettingsPage } from '../pages/admin/Settings';
import { AdminTeamsPage } from '../pages/admin/Teams';
import { JuryHomePage } from '../pages/jury/Home';
import { JuryTeamPage } from '../pages/jury/Team';
import { NotFound } from '../pages/NotFound';
import { AppContext } from '../shared/context/AppContext';
import { theme } from '../shared/mui-theme';
import { socket } from '../shared/socket';
import { Team } from '../shared/types/team.type';
import './style.scss';


export const App: FC = () => {
  const [ teams, setTeams ] = useState<Team[]>([]);
  const [ timeleft, setTimeleft ] = useState<string>('Temps restant: 00h 00m 00s');
  const [ piscineSize, setPiscineSize ] = useState<number>(50);
  const [ sessionTime, setSessionTime ] = useState<string>('1:30');
  const [ started, setStarted ] = useState<boolean>(false);

  useEffect(() => {
    socket.on('connection', (socketId) => {
      console.log('Web socket connected', socketId);
    });
  });

  useEffect(() => {
    socket.on('teams', (data: Team[]) => setTeams(data || []));
  });

  useEffect(() => {
    socket.on('timeleft', (data: string) => setTimeleft(data));
  });

  useEffect(() => {
    socket.on('parameters:piscineSize', (data: number) => setPiscineSize(data ?? 50));
  });

  useEffect(() => {
    socket.on('parameters:sessionTime', (data: string) => setSessionTime(data || '1:30'));
  });

  useEffect(() => {
    socket.on('parameters:started', (data: boolean) => setStarted(data || false));
  });

  return (
    <>
      <AppContext.Provider value={{
        teams,
        timeleft,
        parameters: {
          piscineSize,
          sessionTime,
          started
        }
      }}>
        <ThemeProvider theme={theme}>
          {isDesktop ? <>
            <Router>
              <Switch>
                <AdminDrawer>
                  <Route path='/' exact>
                    <AdminHomePage />
                  </Route>
                  <Route path='/results' exact>
                    <AdminResultsPage />
                  </Route>
                  <Route path='/teams' exact>
                    <AdminTeamsPage />
                  </Route>
                  <Route path='/settings' exact>
                    <AdminSettingsPage/>
                  </Route>
                  <Route path='/logs' exact>
                    <AdminLogsPage />
                  </Route>
                  <Route path='/contact' exact>
                    <AdminContactPage />
                  </Route>
                </AdminDrawer>
              </Switch>
            </Router>
          </> : <>
            <Router>
              <Switch>
                <Route path='/' exact>
                    <JuryHomePage />
                </Route>
                <Route path='/teams/:team' exact>
                    <JuryTeamPage />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
              </Switch>
            </Router>
          </>}
        </ThemeProvider>
      </AppContext.Provider>
      <WaterMark />
    </>
  );
}