import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import './style.scss';


export function AdminLogsPage () {
  useEffect(() => {
    document.title = 'Logs | Challenge';
  }, []);

  return (
    <div id='admin-logs'>
      <Typography variant='h3' component='h2' className='admin-logs_title'>Admin - Logs</Typography>
      <div className='admin-logs_content'>

      </div>
    </div>
  );
}