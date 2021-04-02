import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { FC } from 'react';
import './style.scss';


interface Props {
  title: string;
}

export const JuryHeader: FC<Props> = ({ title }) => {
  return (
    <>
      <AppBar className='app-jury_toolbar'>
        <Toolbar>
          <img src='../assets/img/logo64.png' alt='logo' />
          <Typography variant='h6' className='app-jury_toolbar-title'>{title}</Typography>
          <a href='https://github.com/Sukaato' target='_blank' rel='noreferrer' className='app-jury_toolbar-icon'>
            <IconButton>
              <GitHub fontSize='small' />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}