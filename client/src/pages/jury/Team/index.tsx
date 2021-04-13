import { Container, IconButton, Paper, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useLocation } from 'react-router';
import { JuryHeader } from '../../../components/JuryHeader';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import './style.scss';


function padStart(value: number): string {
  return value.toString().padStart(2, '0');
}

export const JuryTeamPage: FC = () => {
  const location = useLocation();
  const [ disableButton, setDisableButton ] = useState<boolean>(false);

  const makeBottonDisabled = () => {
    setDisableButton(true);
    setTimeout(() => setDisableButton(false) ,3500);
  }

  const handleRemoveLongueur = (id: string) => {
    socket.emit('team:remove', { id });
    makeBottonDisabled();
  }
  const handleAddLongueur = (id: string) => {
    socket.emit('team:add', { id });
    makeBottonDisabled();
  }

  return (
    <AppContext.Consumer>
      {context => (
        <div id='app-jury_team'>
          {context.teams.filter(team => location.pathname.endsWith(team.id)).map(team => (<>
            <JuryHeader title={team.name} />
            <Container id='app-jury_team-content'>
              <Typography variant='body1' component='p' style={{ fontSize: 18, paddingBottom: 12 }}>{context.timeleft}</Typography>
              <Paper elevation={2} className='padding'>
                <div id='app-jury_team-content_data-longueur'>
                  <Typography variant='h5' component='h2'>Longueur</Typography>
                  <div className='data padding'>
                    <Typography variant='body1'>Nombre longueurs</Typography>
                    <Typography variant='body1'>{padStart(team.lengths)}</Typography>
                  </div>
                  <div className='data padding'>
                    <Typography variant='body1'>Meilleur temps</Typography>
                    <Typography variant='body1'>{team.bestLengthsTime}</Typography>
                  </div>
                  <div className='data padding'>
                    <Typography variant='body1'>Dernier temps</Typography>
                    <Typography variant='body1'>{team.lastLengthsTime}</Typography>
                  </div>
                </div>
                <div>
                  <Typography variant='h5' component='h2'>Objectif</Typography>
                  <div className='data padding'>
                    <Typography variant='body1'>{team.objectif} m / {team.objectif / context.parameters.piscineSize} longueurs</Typography>
                  </div>
                </div>
              </Paper>
              <div id='app-jury_team-content_controls'>
                <Typography variant='h5' component='h2'>Gestion des longueurs</Typography>
                <div className='data'>
                  <IconButton onClick={() => handleRemoveLongueur(team.id)} disabled={!context.parameters.started || disableButton}>
                    <Remove fontSize='large' />
                  </IconButton>
                  <Typography variant='h5' component='h3'>{padStart(team.lengths)}</Typography>
                  <IconButton onClick={() => handleAddLongueur(team.id)} disabled={!context.parameters.started || disableButton}>
                    <Add fontSize='large' />
                  </IconButton>
                </div>
              </div>
            </Container>
          </>))}
        </div>
      )}
    </AppContext.Consumer>
  );
}