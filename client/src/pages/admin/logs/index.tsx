import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Column, Row, SortableTable } from '../../../components/SortableTable';
import './style.scss';


const columns: Column[] = [
  { headerName: 'Logs', field: 'logs' },
  { headerName: 'Level', field: 'level' }
];

// TODO: Récupérer les valeurs dans l'api
// TODO: Tester avec les bonnes valeurs
const rows: Row[] = [
  { id: 1, logs: 'Michel a retirer une longueur 1', level: 'warn' },
  { id: 2, logs: 'Michel a retirer une longueur 2', level: 'warn' },
  { id: 3, logs: 'Michel a retirer une longueur 3', level: 'warn' },
  { id: 4, logs: 'Michel a retirer une longueur 4', level: 'warn' },
  { id: 5, logs: 'Michel a ajouter une longueur 5', level: 'info' },
];

export function AdminLogsPage () {
  const [ logs, setLogs ] = useState<any[]>(rows);
  const handleDeleteRow = (value: any) => setLogs(logs => logs.filter(log => log.id !== value.id));

  useEffect(() => {
    document.title = 'Logs | Challenge';
  }, []);

  return (
    <div id='admin-logs'>
      <Typography variant='h3' component='h2' className='admin-logs_title'>Admin - Logs</Typography>
      <div className='admin-logs_content'>
        <SortableTable columns={columns} rows={logs} deleteAction={handleDeleteRow} noDefaultText />
      </div>
    </div>
  );
}