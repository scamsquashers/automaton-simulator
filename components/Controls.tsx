import React from 'react';
import RuleVisualizer from './RuleVisualizer';

interface ControlsProps {
  numCols: number;
  setNumCols: (value: number) => void;
  numRows: number;
  setNumRows: (value: number) => void;
  rule: number;
  setRule: (value: number) => void;
  rules: number[];
  resetInitialRow: (type: 'empty' | 'center') => void;
}

const Controls: React.FC<ControlsProps> = ({
  numCols,
  setNumCols,
  numRows,
  setNumRows,
  rule,
  setRule,
  rules,
  resetInitialRow,
}) => {
    
    const handleNumberChange = (setter: (value: number) => void, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = min;
        if (value > max) value = max;
        if (value < min) value = min;
        setter(value);
    };
    
  return (
    <div className="w-full md:w-72 lg:w-80 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex-shrink-0">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Controls</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="numCols" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Boxes in Row (Width)
          </label>
          <input
            type="number"
            id="numCols"
            min="1"
            max="1000"
            value={numCols}
            onChange={handleNumberChange(setNumCols, 1, 1000)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="numRows" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rows to Generate (Height)
          </label>
          <input
            type="number"
            id="numRows"
            min="1"
            max="1000"
            value={numRows}
            onChange={handleNumberChange(setNumRows, 1, 1000)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rule (0-255)
          </label>
          <select
            id="rule"
            value={rule}
            onChange={(e) => setRule(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {rules.map((r) => (
                <option 
                  key={r} 
                  value={r}
                >
                  Rule {r}
                </option>
              )
            )}
          </select>
          <RuleVisualizer rule={rule} />
        </div>

        <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Initial Row Presets</p>
            <div className="grid grid-cols-2 gap-2">
                 <button
                    onClick={() => resetInitialRow('center')}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    Single Box
                </button>
                <button
                    onClick={() => resetInitialRow('empty')}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Controls;