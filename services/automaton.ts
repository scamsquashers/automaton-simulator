
import type { CellState } from '../types';

/**
 * Converts a rule number (0-255) to its 8-bit binary representation.
 * The resulting array maps the 8 possible neighbor states to the new cell state.
 * '111' -> index 0, '110' -> index 1, ..., '000' -> index 7
 * @param ruleNumber The rule number between 0 and 255.
 * @returns An array of 8 CellStates representing the rule set.
 */
export const getRuleSet = (ruleNumber: number): CellState[] => {
  const binaryString = ruleNumber.toString(2).padStart(8, '0');
  return binaryString.split('').map(bit => parseInt(bit, 10) as CellState);
};

/**
 * Calculates the next generation of a row based on the previous row and a rule set.
 * @param previousRow The previous row of cell states.
 * @param ruleSet The 8-bit rule set.
 * @returns The next row of cell states.
 */
export const calculateNextRow = (previousRow: CellState[], ruleSet: CellState[]): CellState[] => {
  const nextRow: CellState[] = [];
  const rowLength = previousRow.length;

  for (let i = 0; i < rowLength; i++) {
    const left = i === 0 ? 0 : previousRow[i - 1];
    const middle = previousRow[i];
    const right = i === rowLength - 1 ? 0 : previousRow[i + 1];
    
    const pattern = `${left}${middle}${right}`;
    // '111' is binary 7, maps to ruleSet[0]. '000' is binary 0, maps to ruleSet[7]. Reverse index.
    const patternIndex = 7 - parseInt(pattern, 2); 

    nextRow[i] = ruleSet[patternIndex];
  }
  return nextRow;
};

/**
 * Generates the entire grid for the cellular automaton.
 * @param initialRow The starting row.
 * @param numRows The total number of rows to generate.
 * @param rule The rule number (0-255).
 * @returns A 2D array representing the automaton grid.
 */
export const generateGrid = (initialRow: CellState[], numRows: number, rule: number): CellState[][] => {
  if (initialRow.length === 0 || numRows <= 0) {
    return [];
  }

  const ruleSet = getRuleSet(rule);
  const grid: CellState[][] = [initialRow];

  let currentRow = initialRow;
  for (let i = 1; i < numRows; i++) {
    const nextRow = calculateNextRow(currentRow, ruleSet);
    grid.push(nextRow);
    currentRow = nextRow;
  }

  return grid;
};
