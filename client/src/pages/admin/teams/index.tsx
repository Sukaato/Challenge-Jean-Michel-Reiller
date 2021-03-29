import { Breadcrumbs, Button, Link, Typography } from '@material-ui/core';
import { Add, Create } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Column, Row, SortableTable } from '../../../components/SortableTable';
import { AddTeamModal } from './modal/AddTeam';
import { ModifyTeamModal } from './modal/ModifyTeam';
import './style.scss';

const columns: Column[] = [
  { headerName: 'Nom',      field: 'name' },
  { headerName: 'Nagueurs', field: 'nagueurs', align: 'right' },
  { headerName: 'Objectif', field: 'objectif', align: 'right' }
];

// TODO: Récupérer les valeurs dans l'api
// TODO: Tester avec les bonnes valeurs
const rows: Row[] = [
  { id: 1, name: 'Team 1', nagueurs: 10, objectif: 5000 },
  { id: 2, name: 'Team 2', nagueurs: 10, objectif: 5000 },
  { id: 3, name: 'Team 3', nagueurs: 10, objectif: 5000 },
  { id: 4, name: 'Team 4', nagueurs: 10, objectif: 5000 },
];

export function AdminTeamsPage () {
  const [ teams, setTeams ] = useState<Row[]>(rows);

  const [ isModalAddVisible, setIsModalAddVisible ] = useState<boolean>(false);
  const handleOpenModalAdd = () => setIsModalAddVisible(true);
  const handleCloseModalAdd = () => setIsModalAddVisible(false);
  const handleAddTeamSubmit = (value: any) => setTeams(teams => [ ...teams, { id: teams.length + 1, ...value } ]);

  const [ teamToModify, setTeamToModify ] = useState<Row>({});
  const handleOpenModalModify = (data: Row) => setTeamToModify(data);
  const handleCloseModalModify = () => {
    setTeamToModify({});
    handleCloseModalAdd();
  };
  const handleModifyTeamSubmit = (value: any) => setTeams(teams =>  teams.map(team => team.id !== value.id ? team : value));

  const handleDelete = (row: Row) => setTeams(teams => teams.filter(team => team.id !== row.id));

  useEffect(() => {
    document.title = 'Équipes | Challenge';
  }, []);

  return (
    <div id='admin-teams'>
      <Breadcrumbs className='admin-teams_title'>
        <Link href='/'>Admin</Link>
        <Typography>Équipes</Typography>
      </Breadcrumbs>
      <div className='admin-teams_content'>
        <div className='admin-teams_content-info'>
          <Button variant='outlined' color='secondary' startIcon={<Add />} onClick={handleOpenModalAdd}>ajouter</Button>
        </div>
        <div className='admin-teams_content-data'>
          <SortableTable columns={columns} rows={teams} actions={[{ icon: <Create />, handle: handleOpenModalModify, id: 'modify' }]} deleteAction={handleDelete} />
        </div>
      </div>

      <div className='admin-teams_modal'>
        {isModalAddVisible && (
          <AddTeamModal onClose={handleCloseModalAdd} onSubmit={handleAddTeamSubmit} />
        )}
        {Object.keys(teamToModify).length > 0 && (
          <ModifyTeamModal 
            onClose={handleCloseModalModify} 
            onSubmit={handleModifyTeamSubmit} 
            formData={{ 
              id: teamToModify.id, 
              name: teamToModify.name, 
              nagueurs: teamToModify.nagueurs, 
              objectif: teamToModify.objectif 
            }} 
          />
        )}
      </div>
    </div>
  );
}