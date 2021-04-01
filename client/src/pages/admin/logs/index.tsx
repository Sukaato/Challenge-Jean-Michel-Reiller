import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Column, SortableTable } from '../../../components/SortableTable';
import { Log } from '../../../shared/types/log.type';
import './style.scss';


const columns: Column[] = [
  { headerName: 'Logs', field: 'message' },
  { headerName: 'Level', field: 'level' }
];

// TODO: Récupérer les valeurs dans l'api
// TODO: Tester avec les bonnes valeurs
const data: Log[] = [
  { id: 1, message: 'Michel a retirer une longueur 1', level: 'warn' },
  { id: 2, message: 'Michel a retirer une longueur 2', level: 'warn' },
  { id: 3, message: 'Michel a retirer une longueur 3', level: 'warn' },
  { id: 4, message: 'Michel a retirer une longueur 4', level: 'warn' },
  { id: 5, message: 'Michel a ajouter une longueur 5', level: 'info' },
];

export function AdminLogsPage () {
  const [ logs, setLogs ] = useState<Log[]>(data);
  const handleDeleteRow = (value: any) => setLogs(logs => logs.filter(log => log.id !== value.id));

  useEffect(() => {
    document.title = 'Logs | Challenge';
  }, []);

  return (
    <div id='app-admin_logs'>
      <Breadcrumbs id='app-admin_logs-title'>
        <Link href='/'>Admin</Link>
        <Typography>Logs</Typography>
      </Breadcrumbs>
      <div id='app-admin_logs-content'>
        <SortableTable columns={columns} rows={logs} deleteAction={handleDeleteRow} noDefaultText />
      </div>
    </div>
  );
}