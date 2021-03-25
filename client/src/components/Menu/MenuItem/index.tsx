import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  redirectTo: string;
  icon: any;
}


export const MenuItem: FC<MenuItemProps> = ({ title, icon, redirectTo }) => {
  const location = useLocation();
  const history = useHistory();

  const isSelected = location.pathname === redirectTo;
  const handleClick = () => !isSelected && history.push(redirectTo);

  return (
    <ListItem button selected={isSelected} onClick={handleClick} >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )
}