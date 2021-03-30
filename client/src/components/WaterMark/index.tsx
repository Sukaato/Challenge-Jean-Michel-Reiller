import { FC } from 'react';
import './style.scss';

export const WaterMark: FC = () => {
  return (
    <footer id='water-mark'>
      <p>
        Developed with <span id='heart'>♥</span> by <a href='https://github.com/Sukaato' target='_blank' rel='noreferrer'>Sukaato</a>
      </p>
    </footer>
  );
}