import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { GitHub, Menu } from '@mui/icons-material';
import { FC } from 'react';
import './style.scss';

interface Props {
  onPressMenu: () => void;
}

export const AdminHeader: FC<Props> = ({ onPressMenu }) => {
  return (
    <AppBar position='static' id='app-header'>
      <Toolbar variant='dense'>
        <IconButton edge='start' onClick={onPressMenu}>
          <Menu />
        </IconButton>
        <Typography variant='h6'>Challenge Jean-Michel Reiller</Typography>
        <div className='landing-buttons'>
          <a href='https://github.com/Sukaato' target='_blank' rel='noreferrer'>
            <IconButton >
              <GitHub />
            </IconButton>
          </a>
        </div>
      </Toolbar>
    </AppBar>
  );
}