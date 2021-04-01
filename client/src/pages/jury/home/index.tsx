import { Container, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { FC, useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { JuryHeader } from '../../../components/JuryHeader';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import './style.scss';


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
        <List component='nav'>
          {context.teams && context.teams.length > 0 && context.teams.map((team) => (
            <Paper elevation={1} className='app-jury_home-teams' key={team.id}>
              <ListItem button onClick={() => handleListItemClick(team.id)} disabled={team.selected}>
                <ListItemText primary={team.name} className='app-jury_home-teams_text' />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Container>
    </div>
  );
}