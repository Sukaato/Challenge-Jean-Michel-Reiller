import { ThemeProvider } from '@material-ui/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminDrawer } from '../components/AdminDrawer';
import { WaterMark } from '../components/WaterMark';
import { AdminHomePage } from '../pages/admin/home';
import { AdminLogsPage } from '../pages/admin/logs';
import { AdminResultsPage } from '../pages/admin/results';
import { AdminSettingsPage } from '../pages/admin/settings';
import { AdminTeamsPage } from '../pages/admin/teams';
import { JuryHomePage } from '../pages/jury/Home';
import { JuryTeamPage } from '../pages/jury/Team';
import { NotFound } from '../pages/NotFound';
import { theme } from '../shared/mui-theme';
import './style.scss';

export function App() {
  const [ isLocal ] = useState<boolean>(true);

  return (
    <>
      <ThemeProvider theme={theme}>
        {isLocal ? <>
          <Router>
            <Switch>
              <AdminDrawer>
                <Route path='/' exact component={AdminHomePage} />
                <Route path='/results' exact component={AdminResultsPage} />
                <Route path='/teams' exact component={AdminTeamsPage} />
                <Route path='/settings' exact component={AdminSettingsPage} />
                <Route path='/logs' exact component={AdminLogsPage} />
              </AdminDrawer>
            </Switch>
          </Router>
        </> : <>
          <Router>
            <Switch>
              <Route path='/' exact component={JuryHomePage} />
              <Route path='/teams/:team' exact component={JuryTeamPage} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </>}
      </ThemeProvider>
      <WaterMark />
    </>
  );
}