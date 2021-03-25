import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import './style.scss';


export function AdminSettingsPage () {
  useEffect(() => {
    document.title = 'Paramètres | Challenge';
  }, []);

  return (
    <div id='admin-settings'>
      <Typography variant='h3' component='h2' className='admin-settings_title'>Admin - Paramètres</Typography>
      <div className='admin-settings_content'>

      </div>
    </div>
  );
}