import { Backdrop, Breadcrumbs, Button, IconButton, Link, Paper, Typography } from '@material-ui/core';
import { Close, Fullscreen } from '@material-ui/icons';
import { FC, useContext, useEffect, useState } from 'react';
import { Column, SortableTable } from '../../../components/SortableTable';
import { AppContext } from '../../../shared/context/AppContext';
import './style.scss';

const columns: Column[] = [
  { headerName: 'Nom',                     field: 'name' },
  { headerName: 'Nagueurs',                field: 'swimmerCount',    align: 'right' },
  { headerName: 'Temps dernière longueur', field: 'lastLengthsTime', align: 'right' },
  { headerName: 'Temps meilleur longueur', field: 'bestLengthsTime', align: 'right' },
  { headerName: 'Longueurs',               field: 'lengths',         align: 'right' },
  { headerName: 'Distance Total',          field: 'totalDistance',   align: 'right' }
];

export const AdminResultsPage: FC = () => {
  const context = useContext(AppContext);
  const [ isFullScreen, setIsFullScreen ] = useState<boolean>(false);

  const handleOpenFullScreen = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);

  useEffect(() => {
    document.title = 'Résultats | Challenge';
  }, []);

  return (
    <div id='app-admin_results'>
      <Breadcrumbs id='app-admin_results-title'>
        <Link href='/'>Admin</Link>
        <Typography>Resultats</Typography>
      </Breadcrumbs>
      <div id='app-admin_results-content'>
        <div id='app-admin_results-content_info'>
          <Typography variant='body1'>{context.timeleft}</Typography>
          <Button variant='outlined' color='secondary' startIcon={<Fullscreen />} onClick={handleOpenFullScreen}>Plein écran</Button>
        </div>
        <div>
          <SortableTable columns={columns} rows={context.teams} />
        </div>
      </div>

      {isFullScreen && (
        <Backdrop open={true} id='app-admin_results-modal'>
          <Paper id='app-admin_results-modal_content'>
            <div id='app-admin_results-modal_content-info'>
              <Typography variant='h3' component='p'>{context.timeleft}</Typography>
              <IconButton onClick={handleCloseFullScreen} >
                <Close fontSize='large' />
              </IconButton>
            </div>
            <SortableTable columns={columns} rows={context.teams} id='app-admin_results-modal_content-table' />
          </Paper>
        </Backdrop>
      )}
    </div>
  );
}