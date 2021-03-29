import { Container, IconButton, Paper, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { FC, useState } from 'react';
import { JuryAppBar } from '../../../components/JuryAppBar';
import './style.scss';

const data = {
  id: 1,
  name: 'team 1',
  longueur: {
    effectuer: 10,
    bestTime: '2: 50.415',
    lestTime: '2: 50.485',
  },
  objectif: 5000
}

export const JuryTeamPage: FC = () => {
  const [ team, setTeam ] = useState<typeof data>(data);
  const [ longueur ] = useState<number>(50);

  const handleRemoveLongueur = () => setTeam(value => { 
    return {
      ...value, 
      longueur: { ...value.longueur, effectuer: value.longueur.effectuer - 1 }
    }
  });
  const handleAddLongueur = () => setTeam(value => { 
    return {
      ...value, 
      longueur: { ...value.longueur, effectuer: value.longueur.effectuer + 1 }
    }
  });

  return (
    <div id='app-jury_team'>
      <JuryAppBar title={team.name} />
      <Container className='app-jury_team-content'>
        <Paper elevation={2} className='padding'>
          <div id='app-jury_team_longueur'>
            <Typography variant='h4' component='h2'>Longueur</Typography>
            <div className='data padding'>
              <Typography variant='body2'>Nombre effectuer</Typography>
              <Typography variant='body2'>{team.longueur.effectuer}</Typography>
            </div>
            <div className='data padding'>
              <Typography variant='body2'>Meilleur temps</Typography>
              <Typography variant='body2'>{team.longueur.bestTime}</Typography>
            </div>
            <div className='data padding'>
              <Typography variant='body2'>Dernier temps</Typography>
              <Typography variant='body2'>{team.longueur.lestTime}</Typography>
            </div>
          </div>
          <div id='app-jury_team_objectif'>
            <Typography variant='h4' component='h2'>Objectif</Typography>
            <div className='data padding'>
              <Typography variant='body2'>{team.objectif} m / {team.objectif / longueur} longueurs</Typography>
            </div>
          </div>
        </Paper>
        <div id='app-jury_team-controls'>
          <Typography variant='h4' component='h2'>Gestion des longueurs</Typography>
          <div className='data'>
            <IconButton onClick={handleRemoveLongueur}>
              <Remove fontSize='large' />
            </IconButton>
            <Typography variant='h5' component='h3'>{team.longueur.effectuer}</Typography>
            <IconButton onClick={handleAddLongueur}>
              <Add fontSize='large' />
            </IconButton>
          </div>
        </div>
      </Container>
    </div>
  );
}