import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Controls from './components/Controls';
import Grid from './components/Grid';
import { generateGrid } from './services/automaton';
import type { CellState } from './types';

const App: React.FC = () => {
  const [numCols, setNumCols] = useState<number>(101);
  const [numRows, setNumRows] = useState<number>(80);
  const [rule, setRule] = useState<number>(30);
  const [initialRow, setInitialRow] = useState<CellState[]>([]);
  const [grid, setGrid] = useState<CellState[][]>([]);

  const rules = useMemo(() => Array.from({ length: 256 }, (_, i) => i), []);

  const resetInitialRow = useCallback((type: 'empty' | 'center') => {
    const newRow = new Array(numCols).fill(0 as CellState);
    if (type === 'center' && numCols > 0) {
      newRow[Math.floor(numCols / 2)] = 1;
    }
    setInitialRow(newRow);
  }, [numCols]);

  useEffect(() => {
    resetInitialRow('center');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCols]);

  useEffect(() => {
    const newGrid = generateGrid(initialRow, numRows, rule);
    setGrid(newGrid);
  }, [initialRow, numRows, rule]);

  const handleToggleCell = useCallback((colIndex: number) => {
    setInitialRow(prevRow => {
      const newRow = [...prevRow];
      newRow[colIndex] = newRow[colIndex] === 0 ? 1 : 0;
      return newRow;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cellular Automaton Simulator</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          <Controls
            numCols={numCols}
            setNumCols={setNumCols}
            numRows={numRows}
            setNumRows={setNumRows}
            rule={rule}
            setRule={setRule}
            rules={rules}
            resetInitialRow={resetInitialRow}
          />
          <Grid grid={grid} onToggleCell={handleToggleCell} />
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-6 p-4 text-center">
        <div className="container mx-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                The elementary cellular automata rule system was developed by 
                <a 
                    href="https://www.wolframscience.com/nks/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
                >
                    Stephen Wolfram
                </a>.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;