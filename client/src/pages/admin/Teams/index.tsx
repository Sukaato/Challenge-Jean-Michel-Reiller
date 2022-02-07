import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import { Add, Create } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { Column, Row, SortableTable } from '../../../components/SortableTable';
import { AppContext } from '../../../shared/context/AppContext';
import { socket } from '../../../shared/socket';
import { Team } from '../../../shared/types/team.type';
import { CreateTeamModal } from './modal/CreateTeam';
import { ModifyTeamForm, ModifyTeamModal } from './modal/ModifyTeam';
import './style.scss';

const columns: Column[] = [
  { headerName: 'Nom',      field: 'name' },
  { headerName: 'Nagueurs', field: 'swimmerCount', align: 'right' },
  { headerName: 'Objectif', field: 'objectif', align: 'right' }
];

export const AdminTeamsPage: FC = () => {
  const [ isModalAddVisible, setIsModalAddVisible ] = useState<boolean>(false);
  const [ teamToModify, setTeamToModify ] = useState<ModifyTeamForm>();

  const handleOpenModalAdd = () => setIsModalAddVisible(true);
  const handleCloseModalAdd = () => setIsModalAddVisible(false);
  const handleCloseModalModify = () => setTeamToModify(undefined);
  const handleOpenModalModify = (value: ModifyTeamForm) => setTeamToModify(value);
  const handleDelete = (row: Row) => socket.emit('teams:delete', { id: row.id });

  useEffect(() => {
    document.title = 'Équipes | Challenge';
  }, []);

  return (
    <AppContext.Consumer>
      {context => (
        <div id='app-admin_teams'>
          <Breadcrumbs id='app-admin_teams-title'>
            <Link href='/'>Admin</Link>
            <Typography>Équipes</Typography>
          </Breadcrumbs>
          <div id='app-admin_teams-content'>
            <div id='app-admin_teams-content_info'>
              <Button variant='outlined' color='secondary' startIcon={<Add />} onClick={handleOpenModalAdd}>ajouter</Button>
            </div>
            <div>
              <SortableTable 
                columns={columns} 
                rows={context.teams} 
                actions={[{ icon: <Create />, handle: (value: Row) => handleOpenModalModify(value as Team), id: 'modify' }]} 
                deleteAction={handleDelete} noDefaultText />
            </div>
          </div>

          <div>
            <CreateTeamModal open={isModalAddVisible} onClose={handleCloseModalAdd} />
            {teamToModify && <ModifyTeamModal onClose={handleCloseModalModify} data={teamToModify} />}
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}