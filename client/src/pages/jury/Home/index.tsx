import { Container, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { JuryHeader } from '../../../components/JuryHeader';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import './style.scss';

function isNotEmptyArray(array: any[]): boolean {
  return array && array.length > 0;
}

export const JuryHomePage: FC = () => {
  const context = useContext(AppContext);
  const [ selected, setSelected ] = useState<string>('');

  const handleListItemClick = (id: string) => {
    socket.emit('team:select', { id });
    setSelected(id);
  }

  if (!!selected) return (
    <Redirect to={`/teams/${selected}`} />
  );

  return (
    <div id='app-jury_home'>
      <JuryHeader title='Challenge Jean-Michel Reiller' />
      <Container>
        {isNotEmptyArray(context.teams) ? <>
          <List component='nav'>
            {context.teams.map(team => (
              <Paper elevation={1} className='app-jury_home-teams' key={team.id}>
                <ListItem button onClick={() => handleListItemClick(team.id)} disabled={team.selected}>
                  <ListItemText primary={team.name} className='app-jury_home-teams_text' />
                </ListItem>
              </Paper>
            ))}
          </List>
        </> : <>
          <Typography variant='h5' component='p' id='app-jury_home-no-teams'>Aucune équipe</Typography>
        </>}
      </Container>
    </div>
  );
}