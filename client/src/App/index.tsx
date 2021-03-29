import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AdminDrawer } from '../components/AdminDrawer';
import { AdminHomePage } from '../pages/admin/home';
import { AdminLogsPage } from '../pages/admin/logs';
import { AdminResultsPage } from '../pages/admin/results';
import { AdminSettingsPage } from '../pages/admin/settings';
import { AdminTeamsPage } from '../pages/admin/teams';
import { JuryHomePage } from '../pages/jury/home';
import { JuryTeamPage } from '../pages/jury/Team';
import { NotFound } from '../pages/NotFound';
import { theme } from '../shared/mui-theme';
import './style.scss';

const isLocalhost = false;

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to={isLocalhost ? '/admin' : '/jury'} />
          </Route>
          {isLocalhost ? <AdminDrawer>
            <Route path='/admin' exact component={AdminHomePage} />
            <Route path='/admin/results' exact component={AdminResultsPage} />
            <Route path='/admin/teams' exact component={AdminTeamsPage} />
            <Route path='/admin/settings' exact component={AdminSettingsPage} />
            <Route path='/admin/logs' exact component={AdminLogsPage} />
          </AdminDrawer> : <>
            <Route path='/jury' exact component={JuryHomePage} />
            <Route path='/jury/:team' exact component={JuryTeamPage} />
          </> }
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}