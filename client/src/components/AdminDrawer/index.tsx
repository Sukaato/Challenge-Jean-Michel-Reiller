import { Container } from '@mui/material';
import { FC, useState } from 'react';
import { AdminHeader } from '../AdminHeader';
import { Menu } from '../Menu';

import './style.scss';

export const AdminDrawer: FC = ({ children }) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const handleOpenAction = () => setIsOpen(true);
  const handleCloseAction = () => setIsOpen(false);

  const maxWidth = isOpen ? 'md' : 'lg';
  const opened = isOpen && 'opened';

  return (
    <div id='admin'>
      <AdminHeader onPressMenu={handleOpenAction} />
      <Menu isOpen={isOpen} onPressClose={handleCloseAction} />
      <Container maxWidth={maxWidth} className={`content ${opened}`}>
        <>{children}</>
      </Container>
    </div>
  )
}