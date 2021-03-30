import { Button, Card, CardActions, CardContent, Container, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { JuryHeader } from '../../components/JuryHeader';
import './style.scss';

export function NotFound() {
  const history = useHistory();

  const handleBack = () => history.goBack();


  return (
    <Container id='app-not-found'>
      <JuryHeader title='Not Found' />
      <Card>
        <CardContent>
          <Typography variant='h2' component='h1'>Not Found</Typography>
          <Typography paragraph>La page demandé n'éxiste pas ou plus</Typography>
        </CardContent>
        <CardActions>
          <Button id='app-not-found_back' variant='contained' color='primary' startIcon={<ArrowBack />} onClick={handleBack}>
            Revenir en arrière
          </Button>
        </CardActions>
      </Card>
      <div id='app-not-found_img-container'>
        <img src='/assets/img/piscine.svg' alt='piscine' />
      </div>
    </Container>
  );
}