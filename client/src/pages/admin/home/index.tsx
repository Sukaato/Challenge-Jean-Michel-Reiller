import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { AdminCard } from '../../../components/AdminCard';
import { appContent } from '../../../shared/app-content';
import './style.scss';


export function AdminHomePage () {
  useEffect(() => {
    document.title = 'Acceuil | Challenge';
  }, []);

  return (
    <div id='admin-home'>
      <Typography variant='h3' component='h2' className='admin-home_title'>Admin</Typography>
      <div className='admin-home_content'>
        <Grid 
          container 
          lg={10} 
          spacing={5} 
          direction='row' 
          justify='center' 
          alignItems='center'
          className='grid'
        >
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