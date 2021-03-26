import { Backdrop, Button, IconButton, Paper, Typography } from '@material-ui/core';
import { Close, Fullscreen } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Column, Row, SortableTable } from '../../../components/SortableTable';
import './style.scss';

const time = '1h 50 minutes'

const columns: Column[] = [
  { headerName: 'Nom',                       field: 'name' },
  { headerName: 'Nagueurs',                  field: 'nagueurs',            align: 'right' },
  { headerName: 'Vitesse dernière longueur', field: 'speed_last_longueur', align: 'right' },
  { headerName: 'Temps dernière longueur',   field: 'time_last_longueur',  align: 'right' },
  { headerName: 'Temps meilleur longueur',   field: 'time_best_longueur',  align: 'right' },
  { headerName: 'Longueurs',                 field: 'longueurs',           align: 'right' },
  { headerName: 'Distance Total',            field: 'total_distance',      align: 'right' }
];

// TODO: Récupérer les valeurs dans l'api
// TODO: Tester avec les bonnes valeurs
const rows: Row[] = [
  { name: 'Team 1', nagueurs: 10, speed_last_longueur: '5.0 km/h', time_last_longueur: '10:30.253', time_best_longueur: '10:20.254', longueurs: 50, total_distance: 5000 },
  { name: 'Team 2', nagueurs: 10, speed_last_longueur: '6.1 km/h', time_last_longueur: '10:30.253', time_best_longueur: '10:20.254', longueurs: 50, total_distance: 5000 },
  { name: 'Team 3', nagueurs: 10, speed_last_longueur: '5.2 km/h', time_last_longueur: '10:30.253', time_best_longueur: '10:20.254', longueurs: 50, total_distance: 5000 },
  { name: 'Team 4', nagueurs: 10, speed_last_longueur: '5.5 km/h', time_last_longueur: '10:30.253', time_best_longueur: '10:20.254', longueurs: 50, total_distance: 5000 },
];

export function AdminResultsPage () {
  const [ isFullScreen, setIsFullScreen ] = useState<boolean>(false);

  const handleOpenFullScreen = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);


  useEffect(() => {
    document.title = 'Résultats | Challenge';
  }, []);

  return (
    <div id='admin-results'>
      <Typography variant='h3' component='h2' className='admin-results_title'>Admin - Résultats</Typography>
      <div className='admin-results_content'>
        <div className='admin-results_content-info'>
          <Typography variant='body1'>Temps restant: {time}</Typography>
          <Button variant='outlined' color='secondary' startIcon={<Fullscreen />} onClick={handleOpenFullScreen}>Plein écran</Button>
        </div>
        <div className='admin-results_content-data'>
          <SortableTable columns={columns} rows={rows} />
        </div>
      </div>

      {isFullScreen && (
        <Backdrop open={isFullScreen} className={`admin-results_modal`}>
          <Paper className='admin-results_modal-content'>
            <div className='admin-results_modal-info'>
              <Typography variant='h3' component='p'>Temps restant: {time}</Typography>
              <IconButton className='admin-results_modal-close' onClick={handleCloseFullScreen} >
                <Close fontSize='large' />
              </IconButton>
            </div>
            <SortableTable columns={columns} rows={rows} classes='admin-results_modal-table' />
          </Paper>
        </Backdrop>
      )}
    </div>
  );
}