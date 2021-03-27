import { Button, Dialog, DialogTitle, FormControl, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import './style.scss';


interface SubmitForm {
  name: string;
  nagueurs: number;
  objectif: number;
}

interface AddTeamModalProps {
  onClose: () => void;
  onSubmit: (form: SubmitForm) => void;
}

export const AddTeamModal: FC<AddTeamModalProps> = ({ onClose, onSubmit }) => {
  const [ name, setName ] = useState<string>('');
  const [ nagueurs, setNagueurs ] = useState<number>(0);
  const [ objectif, setObjectif ] = useState<number>(0);

  const handleNameChange = (value: string) => setName(value);
  const handleNagueursChange = (value: number) => setNagueurs(value);
  const handleObjectifChange = (value: number) => setObjectif(value);

  const handleClose = () => {
    setName('');
    setNagueurs(0);
    setObjectif(0);
    onClose();
  }
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ name, nagueurs, objectif });
    handleClose();
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className='add-team_modal-title'>Ajouter une équipe</DialogTitle>
      <form onSubmit={handleFormSubmit} id='add-team_modal'>
        <FormControl className='add-team_fields'>
          <TextField value={name} onChange={e => handleNameChange(e.target.value)} label="Nom" variant='outlined' />
        </FormControl>
        <FormControl className='add-team_fields'>
          <TextField value={nagueurs} type='number' onChange={e => handleNagueursChange(+e.target.value)} label='Nombre de nagueurs' variant='outlined' />
        </FormControl>
        <FormControl className='add-team_fields'>
          <TextField value={objectif} type='number' onChange={e => handleObjectifChange(+e.target.value)} label='Objectif en mètres' variant='outlined' />
        </FormControl>
        <div className='add-team_controls'>
          <Button variant='outlined' id='add-team_controls-cancel' color='secondary' onClick={handleClose}>Annuler</Button>
          <Button variant='contained' type='submit' color='secondary' >Créer</Button>
        </div>
      </form>
    </Dialog>
  );
}