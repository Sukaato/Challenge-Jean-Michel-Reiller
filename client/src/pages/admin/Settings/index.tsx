import { Breadcrumbs, Button, Card, CardContent, FormControlLabel, Link, Switch, TextField, Typography } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import './style.scss';


export const AdminSettingsPage: FC = () => {
  const handlePiscineSize = (value: number) => socket.emit('parameters:piscineSize', { size: value });
  const handleSessionTime = (value: string) => socket.emit('parameters:sessionTime', { time: value });
  const handleStart = (value: boolean) => socket.emit('parameters:started', { started: value });
  const handleReset = () => socket.emit('parameters:reset');

  useEffect(() => {
    document.title = 'Paramètres | Challenge';
  }, []);

  return (
    <AppContext.Consumer>
      {context => (
        <div id='app-admin_settings'>
          <Breadcrumbs id='app-admin_settings-title'>
            <Link href='/'>Admin</Link>
            <Typography>Paramètres</Typography>
          </Breadcrumbs>
          <div id='app-admin_settings-content'>
            <div>
              <Typography>{context.timeleft}</Typography>
            </div>
            <Card id='app-admin_settings-content_card' elevation={3}>
              <CardContent id='app-admin_settings-content_card-content'>
                <div>
                  <Typography variant='h5' component='h4'>Piscine</Typography>
                  <div className='fields'>
                    <TextField 
                      label='Longueur en mètre'
                      id='piscine_size' 
                      type='number'
                      value={context.parameters.piscineSize} 
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
                      value={context.parameters.sessionTime} 
                      onChange={e => handleSessionTime(e.target.value)} 
                      variant='filled'
                    />
                  </div>
                  <div className='fields'>
                    <FormControlLabel
                      value='start'
                      control={<Switch checked={context.parameters.started} color='primary' onChange={e => handleStart(e.target.checked)} />}
                      label='Commencer la session'
                      labelPlacement='start'
                    />
                  </div>
                  <div className='fields'>
                    <Button color='secondary' onClick={handleReset}>Réinitialisé le competeur</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}