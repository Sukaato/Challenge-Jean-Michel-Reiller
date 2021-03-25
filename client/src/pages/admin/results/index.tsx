import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import './style.scss';


export function AdminResultsPage () {
  useEffect(() => {
    document.title = 'Résultats | Challenge';
  }, []);

  return (
    <div id='admin-results'>
      <Typography variant='h3' component='h2' className='admin-results_title'>Admin - Résultats</Typography>
      <div className='admin-results_content'>

      </div>
    </div>
  );
}