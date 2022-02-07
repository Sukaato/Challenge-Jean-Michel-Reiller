import { Breadcrumbs, Grid, Typography } from '@mui/material';
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
        <Grid container spacing={7}>
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
          <Grid item md={5}>
            <AdminCard { ...appContent.tabs.contact } />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}