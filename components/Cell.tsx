import React from 'react';
import type { CellState } from '../types';

interface CellProps {
  state: CellState;
  isClickable: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ state, isClickable, onClick }) => {
  const bgColor = state === 1 ? 'bg-gray-800 dark:bg-gray-200' : 'bg-white dark:bg-gray-700';
  const cursor = isClickable ? 'cursor-pointer' : '';
  const hover = isClickable ? 'transition-colors duration-150 hover:bg-gray-300 dark:hover:bg-gray-600' : '';

  return (
    <div
      className={`flex-1 aspect-square border-t border-l border-gray-300 dark:border-gray-800 ${bgColor} ${cursor} ${hover}`}
      onClick={isClickable ? onClick : undefined}
    />
  );
};

export default React.memo(Cell);