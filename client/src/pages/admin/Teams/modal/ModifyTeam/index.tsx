import { Button, Dialog, DialogTitle, FormControl, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import { socket } from '../../../../../shared/socket';
import { Team } from '../../../../../shared/types/team.type';
import './style.scss';


export type ModifyTeamForm = Pick<Team, 'id' | 'name' | 'swimmerCount' | 'objectif'>;

interface Props {
  data?: ModifyTeamForm;
  onClose: () => void;
}

export const ModifyTeamModal: FC<Props> = ({ data, onClose }) => {
  const [ name, setName ] = useState<string>(data?.name || '');
  const [ swimmerCount, setSwimmerCount ] = useState<number>(data?.swimmerCount || 0);
  const [ objectif, setObjectif ] = useState<number>(data?.objectif || 0);

  const handleNameChange = (value: string) => setName(value);
  const handleSwimmerCountChange = (value: number) => setSwimmerCount(value);
  const handleObjectifChange = (value: number) => setObjectif(value);

  const handleClose = () => {
    setName('');
    setSwimmerCount(0);
    setObjectif(0);
    onClose();
  }
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log({
      name, swimmerCount, objectif
    });
    
    socket.emit('teams:modify', { id: data?.id, name, swimmerCount, objectif });
    handleClose();
  }

  return (
    <Dialog open={true} onClose={handleClose} id='app-teams_modal-modify'>
      <DialogTitle id='app-teams_modal-modify_title'>Modifier une équipe</DialogTitle>
      <form onSubmit={handleFormSubmit} id='app-teams_modal-modify_form'>
        <FormControl className='fields'>
          <TextField value={name} onChange={e => handleNameChange(e.target.value)} label="Nom" variant='outlined' />
        </FormControl>
        <FormControl className='fields'>
          <TextField value={swimmerCount} type='number' onChange={e => handleSwimmerCountChange(+e.target.value)} label='Nombre de nagueurs' variant='outlined' />
        </FormControl>
        <FormControl className='fields'>
          <TextField value={objectif} type='number' onChange={e => handleObjectifChange(+e.target.value)} label='Objectif en mètres' variant='outlined' />
        </FormControl>
        <div id='app-teams_modal-modify_form-controls'>
          <Button variant='outlined' id='app-teams_modal-modify_form-controls_cancel' color='secondary' onClick={handleClose}>annuler</Button>
          <Button variant='contained' type='submit' color='secondary' >modifier</Button>
        </div>
      </form>
    </Dialog>
  );
}