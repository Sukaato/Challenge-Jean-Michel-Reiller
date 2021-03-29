import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { FC } from 'react';
import './style.scss';


interface Props {
  title: string;
}

export const JuryAppBar: FC<Props> = ({ title }) => {
  return (
    <>
      <AppBar className='app-jury_toolbar'>
        <Toolbar>
          <Typography variant='h6' className='app-jury_title'>{title}</Typography>
          <a href='https://github.com/Sukaato' target='_blank' rel='noreferrer'>
            <IconButton>
              <GitHub />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}