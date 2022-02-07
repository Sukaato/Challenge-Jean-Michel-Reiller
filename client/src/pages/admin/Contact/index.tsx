
import { Email, Smartphone } from '@mui/icons-material';
import { Breadcrumbs, Card, CardContent, Container, Link, Typography } from '@mui/material';
import { FC } from 'react';
import './style.scss';

export const AdminContactPage: FC = () => {
  return (
    <div id='app-admin_contact'>
      <Breadcrumbs id='app-admin_contact-title'>
        <Link href='/'>Admin</Link>
        <Typography>Contact</Typography>
      </Breadcrumbs>
      <div id='app-admin_contact-content'>
        <Container>
          <Card id='app-admin_contact-card'>
            <Typography variant='h5' component='h2'>Infomation du développeur</Typography>
            <CardContent>
              <div className='infos'>
                <Smartphone className='icons' /> 
                <Typography paragraph>07.77.94.78.95</Typography>
              </div>
              <div className='infos'>
                <Email className='icons' /> 
                <Typography paragraph>sukaato.dev@gmail.com</Typography>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}