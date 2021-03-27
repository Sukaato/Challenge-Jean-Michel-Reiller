import { Button, Dialog, DialogTitle, FormControl, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import './style.scss';


interface SubmitForm {
  name: string;
  nagueurs: number;
  objectif: number;
}

interface FormData extends SubmitForm {
  id: number;
}

interface ModifyTeamModalProps {
  formData: FormData;
  onClose: () => void;
  onSubmit: (form: FormData) => void;
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
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className='modify-team_modal-title'>Modifier une équipe</DialogTitle>
      <form onSubmit={handleFormSubmit} id='modify-team_modal'>
        <FormControl className='modify-team_fields'>
          <TextField value={name} onChange={e => handleNameChange(e.target.value)} label='Nom' variant='outlined' />
        </FormControl>
        <FormControl className='modify-team_fields'>
          <TextField value={nagueurs} type='number' onChange={e => handleNagueursChange(+e.target.value)} label='Nombre de nagueurs' variant='outlined' />
        </FormControl>
        <FormControl className='modify-team_fields'>
          <TextField value={objectif} type='number' onChange={e => handleObjectifChange(+e.target.value)} label='Objectif en mètres' variant='outlined' />
        </FormControl>
        <div className='modify-team_controls'>
          <Button variant='outlined' id='modify-team_controls-cancel' color='secondary' onClick={handleClose}>annuler</Button>
          <Button variant='contained' type='submit' color='secondary' >modifier</Button>
        </div>
      </form>
    </Dialog>
  );
}