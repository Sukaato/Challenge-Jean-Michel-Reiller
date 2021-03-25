import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import './style.scss';


export function AdminTeamsPage () {
  useEffect(() => {
    document.title = 'Équipes | Challenge';
  }, []);

  return (
    <div id='admin-teams'>
      <Typography variant='h3' component='h2' className='admin-teams_title'>Admin - Équipes</Typography>
      <div className='admin-teams_content'>

      </div>
    </div>
  );
}