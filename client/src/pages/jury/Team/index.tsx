import { Container, IconButton, Paper, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { FC, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { JuryHeader } from '../../../components/JuryHeader';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import { Team } from '../../../shared/types/team.type';
import './style.scss';

type PartialTeam = Pick<Team, 'id' | 'name' | 'lengths' | 'bestLengthsTime' | 'lastLengthsTime' | 'objectif'>;
const data: PartialTeam = {
  id: 'loading',
  name: 'loading',
  lengths: 0,
  bestLengthsTime: '_',
  lastLengthsTime: '_',
  objectif: 0
};

function padStart(value: number): string {
  return value.toString().padStart(2, '0');
}

export const JuryTeamPage: FC = () => {
  const location = useLocation();
  const context = useContext(AppContext);
  const [ team, setTeam ] = useState<PartialTeam>(context.teams.find(team => location.pathname.endsWith(team.id)) || data);
  const [ disableButton, setDisableButton ] = useState<boolean>(false);

  const makeBottonDisabled = () => {
    setDisableButton(true);
    setTimeout(() => setDisableButton(false) ,3500);
  }

  const handleRemoveLongueur = () => {
    if (team.lengths > 0 && context.parameters.started) {
      socket.emit('team:remove', { id: team.id });
      makeBottonDisabled();
    }
  }
  const handleAddLongueur = () => {
    if (context.parameters.started) {
      socket.emit('team:add', { id: team.id });
      makeBottonDisabled();
    }
  }

  useEffect(() => {
    socket.on('teams', (teams: Team[]) => setTeam(teams.find(team => location.pathname.endsWith(team.id)) || data));
  });

  return (
    <div id='app-jury_team'>
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
            <IconButton onClick={handleRemoveLongueur} disabled={disableButton}>
              <Remove fontSize='large' />
            </IconButton>
            <Typography variant='h5' component='h3'>{padStart(team.lengths)}</Typography>
            <IconButton onClick={handleAddLongueur} disabled={disableButton}>
              <Add fontSize='large' />
            </IconButton>
          </div>
        </div>
      </Container>
    </div>
  );
}