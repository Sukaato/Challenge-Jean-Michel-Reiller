import { Container } from '@material-ui/core';
import { FC, useState } from 'react';
import { Header } from '../Header';
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
      <Header onPressMenu={handleOpenAction} />
      <Menu isOpen={isOpen} onPressClose={handleCloseAction} />
      <Container maxWidth={maxWidth} className={`content ${opened}`}>
        <>{children}</>
      </Container>
    </div>
  )
}