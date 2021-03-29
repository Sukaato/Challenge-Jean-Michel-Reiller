import { Container, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { FC, useState } from 'react';
import { JuryHeader } from '../../../components/JuryHeader';
import './style.scss';

const data: any[] = [
  { id: 1, nom: 'team 1'},
  { id: 2, nom: 'team 2'},
  { id: 3, nom: 'team 3'},
  { id: 4, nom: 'team 4'},
];


export const JuryHomePage: FC = () => {
  const [ teams ] = useState<any[]>(data);
  const [ selected, setSelected ] = useState<number>(-1);

  const handleListItemClick = (id: number, index: number) => {
    setSelected(index);
  }

  return (
    <div id='app-jury_home'>
      <JuryHeader title='Challenge Jean-Michel Reiller' />
      <Container>
        <List component='nav'>
          {teams.map((team, idx) => (
            <Paper elevation={1} className='app-jury_home-teams' key={team.id}>
              <ListItem button selected={idx === selected} onClick={() => handleListItemClick(team.id, idx)}>
                <ListItemText primary={team.nom} />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Container>
    </div>
  );
}