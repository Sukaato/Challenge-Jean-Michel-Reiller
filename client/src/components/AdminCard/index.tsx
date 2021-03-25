import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useHistory } from 'react-router';

import './style.scss';

interface AdminCardProps {
  icon: any;
  title: string;
  description: string;
  redirectTo: string;
}

export const AdminCard: FC<AdminCardProps> = ({ title, icon, description, redirectTo }) => {
  const history = useHistory();

  const handleClick = () => history.push(redirectTo);

  return (
    <Card className='app-card' onClick={handleClick}>
      <CardActionArea className='app-card_action'>
        <CardContent className='app-card_content'>
          <header className='app-card_header'>
            <>{icon}</>
            <Typography variant='h6'>{title}</Typography>
          </header>
          <div className='app-card_body'>
            <Typography paragraph>
              {description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}