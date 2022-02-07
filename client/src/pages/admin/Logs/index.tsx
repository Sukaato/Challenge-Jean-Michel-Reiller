import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Column, SortableTable } from '../../../components/SortableTable';
import { socket } from '../../../shared/socket';
import { Log } from '../../../shared/types/log.type';
import './style.scss';


const columns: Column[] = [
  { headerName: 'Logs', field: 'message' },
  { headerName: 'Level', field: 'level' }
];

export function AdminLogsPage () {
  const [ logs, setLogs ] = useState<Log[]>([]);

  const handleDelete = (id: string) => socket.emit('log:delete', { id });

  useEffect(() => {
    socket.on('logs:add', (logs: Log[]) => setLogs(logs));
  });

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
        <SortableTable columns={columns} rows={logs} deleteAction={({ id }) => handleDelete(id)} noDefaultText />
      </div>
    </div>
  );
}