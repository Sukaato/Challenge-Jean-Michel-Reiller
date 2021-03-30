import { Breadcrumbs, Card, CardContent, Link, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './style.scss';


export function AdminSettingsPage () {
  const [ piscineSize, setPiscineSize ] = useState<number>(50);
  const [ sessionTime, setSessionTime ] = useState<string>('01:30');

  const handlePiscineSize = (value: number) => setPiscineSize(value);
  const handleSessionTime = (value: string) => setSessionTime(value);

  useEffect(() => {
    document.title = 'Paramètres | Challenge';
  }, []);

  return (
    <div id='app-admin_settings'>
    <Breadcrumbs id='app-admin_settings-title'>
      <Link href='/'>Admin</Link>
      <Typography>Paramètres</Typography>
    </Breadcrumbs>
      <div id='app-admin_settings-content'>
        <Card id='app-admin_settings-content_card' elevation={3}>
          <CardContent className='app-admin_settings-content_card-content'>
            <div>
              <Typography variant='h5' component='h4'>Piscine</Typography>
              <div className='fields'>
                <TextField 
                  label='Longueur en mètre'
                  id='piscine_size' 
                  type='number'
                  value={piscineSize} 
                  onChange={e => handlePiscineSize(+e.target.value)} 
                  variant='filled'
                />
              </div>
            </div>
            <div>
              <Typography variant='h5' component='h4'>Session</Typography>
              <div className='fields'>
                <TextField 
                  style={{ width: '206px' }}
                  label='Durée'
                  id='session_time' 
                  type='time'
                  value={sessionTime} 
                  defaultValue={sessionTime} 
                  onChange={e => handleSessionTime(e.target.value)} 
                  variant='filled'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}