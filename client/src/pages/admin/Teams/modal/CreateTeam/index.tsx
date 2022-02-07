import { Button, Dialog, DialogTitle, FormControl, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { socket } from '../../../../../shared/socket';
import { Team } from '../../../../../shared/types/team.type';
import './style.scss';


export type CreateTeamForm = Pick<Team, 'name' | 'swimmerCount' | 'objectif'>;

interface Props {
  open: boolean
  onClose: () => void;
}

export const CreateTeamModal: FC<Props> = ({ open, onClose }) => {
  const [ name, setName ] = useState<string>('');
  const [ swimmerCount, setSwimmerCount ] = useState<number>(0);
  const [ objectif, setObjectif ] = useState<number>(0);

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
    socket.emit('teams:create', { name, swimmerCount, objectif });
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} id='app-teams_modal-create'>
      <DialogTitle id='app-teams_modal-create_title'>Ajouter une équipe</DialogTitle>
      <form onSubmit={handleFormSubmit} id='app-teams_modal-create_form'>
        <FormControl className='fields'>
          <TextField value={name} onChange={e => handleNameChange(e.target.value)} label="Nom" variant='outlined' />
        </FormControl>
        <FormControl className='fields'>
          <TextField value={swimmerCount} type='number' onChange={e => handleSwimmerCountChange(+e.target.value)} label='Nombre de nagueurs' variant='outlined' />
        </FormControl>
        <FormControl className='fields'>
          <TextField value={objectif} type='number' onChange={e => handleObjectifChange(+e.target.value)} label='Objectif en mètres' variant='outlined' />
        </FormControl>
        <div id='app-teams_modal-create_form-controls'>
          <Button variant='outlined' id='app-teams_modal-create_form-controls_cancel' color='secondary' onClick={handleClose}>Annuler</Button>
          <Button variant='contained' type='submit' color='secondary' >Créer</Button>
        </div>
      </form>
    </Dialog>
  );
}