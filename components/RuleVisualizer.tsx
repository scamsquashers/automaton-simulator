import React, { useMemo } from 'react';
import { getRuleSet } from '../services/automaton';
import type { CellState } from '../types';

const MiniCell: React.FC<{ state: CellState }> = ({ state }) => {
    const bgColor = state === 1 ? 'bg-gray-800 dark:bg-gray-200' : 'bg-white dark:bg-gray-700';
    return <div className={`w-2 h-2 border border-gray-400 dark:border-gray-600 ${bgColor}`} />;
};

interface RuleVisualizerProps {
  rule: number;
}

const RuleVisualizer: React.FC<RuleVisualizerProps> = ({ rule }) => {
  const ruleSet = useMemo(() => getRuleSet(rule), [rule]);

  const patterns: CellState[][] = [
    [1, 1, 1], [1, 1, 0], [1, 0, 1], [1, 0, 0],
    [0, 1, 1], [0, 1, 0], [0, 0, 1], [0, 0, 0],
  ];

  return (
    <div className="mt-4">
      <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Rule {rule} Visualization
      </p>
      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center space-x-1 overflow-x-auto">
        {patterns.map((pattern, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0 p-1" aria-label={`Pattern ${pattern.join('')} results in ${ruleSet[index]}`}>
            <div className="flex" role="presentation">
              {pattern.map((cellState, i) => (
                <MiniCell key={i} state={cellState} />
              ))}
            </div>
            <div className="text-gray-500 dark:text-gray-400 my-0.5 text-lg leading-none" aria-hidden="true">↓</div>
            <div className="flex justify-center" role="presentation">
              <MiniCell state={ruleSet[index]} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shows the output (bottom) for each 3-cell pattern (top).</p>
    </div>
  );
};

export default RuleVisualizer;
