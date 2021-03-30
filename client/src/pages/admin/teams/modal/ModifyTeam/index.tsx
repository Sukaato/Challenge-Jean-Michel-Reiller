import { Button, Dialog, DialogTitle, FormControl, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import './style.scss';


interface TeamForm {
  id: number;
  name: string;
  nagueurs: number;
  objectif: number;
}

interface ModifyTeamModalProps {
  formData: TeamForm;
  onClose: () => void;
  onSubmit: (form: TeamForm) => void;
}

export const ModifyTeamModal: FC<ModifyTeamModalProps> = ({ formData, onClose, onSubmit }) => {
  const [ name, setName ] = useState<string>(formData.name || '');
  const [ nagueurs, setNagueurs ] = useState<number>(formData.nagueurs || 0);
  const [ objectif, setObjectif ] = useState<number>(formData.objectif || 0);

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
    onSubmit({ id: formData.id, name, nagueurs, objectif });
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
          <TextField value={nagueurs} type='number' onChange={e => handleNagueursChange(+e.target.value)} label='Nombre de nagueurs' variant='outlined' />
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