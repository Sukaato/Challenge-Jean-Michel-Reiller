import { FC } from 'react';
import './style.scss';

export const WaterMark : FC = () => {
  return (
    <footer id='water-mark'>
      <p>
        Developed with <span id='heart'>♥</span> by <a href='https://www.github.com/Sukaato'>Sukaato</a>
      </p>
    </footer>
  );
}