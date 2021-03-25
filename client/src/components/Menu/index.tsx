import { Divider, Drawer, IconButton, List, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { FC } from 'react';
import { appContent } from '../../shared/app-content';
import { theme } from '../../shared/mui-theme';
import { MenuItem } from './MenuItem';
import './style.scss';



interface MenuProps {
  isOpen: boolean;
  onPressClose: () => void;
}

export const Menu: FC<MenuProps> = ({ isOpen, onPressClose }) => {
  return (
    <Drawer variant='persistent' anchor='left' open={isOpen} className='app-menu'>
      <div className='app-menu_top'>
        <IconButton onClick={onPressClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        <Typography className='app-menu_top-title' variant='h6'>Challenge Jean-Michel Reiller</Typography>
      </div>
      <Divider />
      <List>
        <MenuItem { ...appContent.tabs.results } />
        <MenuItem { ...appContent.tabs.teams } />
        <MenuItem { ...appContent.tabs.settings } />
        <MenuItem { ...appContent.tabs.logs } />
      </List>
    </Drawer>
  );
}