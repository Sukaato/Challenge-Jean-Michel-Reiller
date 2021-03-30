import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { AdminCard } from '../../../components/AdminCard';
import { appContent } from '../../../shared/app-content';
import './style.scss';


export function AdminHomePage () {
  useEffect(() => {
    document.title = 'Acceuil | Challenge';
  }, []);

  return (
    <div id='app-admin_home'>
      <Breadcrumbs id='app-admin_home-title'>
        <Typography variant='h3' component='h2'>Admin</Typography>
      </Breadcrumbs>
      <div id='app-admin_home-content'>
        <Grid container lg={9} spacing={7} direction='row' justify='center' alignItems='center' className='grid'>
          <Grid item md={5}>
            <AdminCard { ...appContent.tabs.results } />
          </Grid>
          <Grid item md={5}>
            <AdminCard { ...appContent.tabs.teams } />
          </Grid>
          <Grid item md={5}>
            <AdminCard { ...appContent.tabs.settings } />
          </Grid>
          <Grid item md={5}>
            <AdminCard { ...appContent.tabs.logs } />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}