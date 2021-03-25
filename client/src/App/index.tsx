import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AdminDrawer } from '../components/AdminDrawer';
import { AdminHomePage } from '../pages/admin/home';
import { AdminLogsPage } from '../pages/admin/logs';
import { AdminResultsPage } from '../pages/admin/results';
import { AdminSettingsPage } from '../pages/admin/settings';
import { AdminTeamsPage } from '../pages/admin/teams';
import { NotFound } from '../pages/NotFound';
import { theme } from '../shared/mui-theme';
import './style.scss';

const isLocalhost = true;

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to={isLocalhost ? '/admin' : '/jury'} />
          </Route>
          <AdminDrawer>
            <Route path='/admin' exact component={AdminHomePage} />
            <Route path='/admin/results' exact component={AdminResultsPage} />
            <Route path='/admin/teams' exact component={AdminTeamsPage} />
            <Route path='/admin/settings' exact component={AdminSettingsPage} />
            <Route path='/admin/logs' exact component={AdminLogsPage} />
          </AdminDrawer>
          <Route path='/jury' exact component={AdminHomePage} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}