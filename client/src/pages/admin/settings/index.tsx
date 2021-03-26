import { Card, CardContent, TextField, Typography } from '@material-ui/core';
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
    <div id='admin-settings'>
      <Typography variant='h3' component='h2' className='admin-settings_title'>Admin - Paramètres</Typography>
      <div className='admin-settings_content'>
        <Card className='card' elevation={3}>
          <CardContent className='card_content'>
            <div id='piscine'>
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
            <div id='session'>
              <Typography variant='h5' component='h4'>Session</Typography>
              <div className='fields'>
                <TextField 
                  style={{ width: '206px' }}
                  label='Longueur en mètre'
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