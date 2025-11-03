import React from 'react';
import Cell from './Cell';
import type { CellState } from '../types';

interface GridProps {
  grid: CellState[][];
  onToggleCell: (colIndex: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onToggleCell }) => {
  if (!grid || grid.length === 0) {
    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-inner">
            <p className="text-gray-500 dark:text-gray-400">Configure settings to generate a pattern.</p>
        </div>
    );
  }

  return (
    <div className="flex-1 p-2 sm:p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-inner overflow-auto">
      <div className="w-full border-b border-r border-gray-300 dark:border-gray-800">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cellState, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                state={cellState}
                isClickable={rowIndex === 0}
                onClick={() => onToggleCell(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;