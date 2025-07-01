import React, { useState, useEffect } from 'react';
import { SpreadsheetCell } from './SpreadsheetCell';

interface CellData {
  value: string;
}

interface SpreadsheetGridProps {
  onCellSelect: (cellAddress: string, value: string) => void;
}

export const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({ onCellSelect }) => {
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [cells, setCells] = useState<{ [key: string]: CellData }>({});

  const rows = 50;
  const cols = 26;

  // Convert column index to letter (0->A, 1->B, etc.)
  const getColumnLabel = (index: number): string => {
    let result = '';
    while (index >= 0) {
      result = String.fromCharCode(65 + (index % 26)) + result;
      index = Math.floor(index / 26) - 1;
    }
    return result;
  };

  const getCellKey = (row: number, col: number) => `${row}-${col}`;
  const getCellAddress = (row: number, col: number) => `${getColumnLabel(col)}${row + 1}`;

  const getCellValue = (row: number, col: number): string => {
    const key = getCellKey(row, col);
    return cells[key]?.value || '';
  };

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditingCell(null);
    const address = getCellAddress(row, col);
    const value = getCellValue(row, col);
    onCellSelect(address, value);
  };

  const handleCellEdit = (row: number, col: number, value: string) => {
    const key = getCellKey(row, col);
    setCells(prev => ({
      ...prev,
      [key]: { value }
    }));
    
    const address = getCellAddress(row, col);
    onCellSelect(address, value);
  };

  const handleStartEditing = (row: number, col: number) => {
    setEditingCell({ row, col });
  };

  const handleStopEditing = () => {
    setEditingCell(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingCell) return; // Don't navigate while editing

      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          e.preventDefault();
          break;
        case 'ArrowDown':
          newRow = Math.min(rows - 1, row + 1);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          e.preventDefault();
          break;
        case 'ArrowRight':
          newCol = Math.min(cols - 1, col + 1);
          e.preventDefault();
          break;
        case 'Enter':
          handleStartEditing(row, col);
          e.preventDefault();
          break;
        case 'F2':
          handleStartEditing(row, col);
          e.preventDefault();
          break;
      }

      if (newRow !== row || newCol !== col) {
        handleCellSelect(newRow, newCol);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, editingCell, rows, cols]);

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="inline-block min-w-full">
        {/* Header row with column labels */}
        <div className="flex sticky top-0 bg-gray-50 z-20">
          <div className="w-12 h-8 border-r border-b border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
            
          </div>
          {Array.from({ length: cols }, (_, colIndex) => (
            <div
              key={colIndex}
              className="w-24 h-8 border-r border-b border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600"
            >
              {getColumnLabel(colIndex)}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {/* Row number */}
            <div className="w-12 h-8 border-r border-b border-gray-300 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 sticky left-0 z-10">
              {rowIndex + 1}
            </div>
            
            {/* Data cells */}
            {Array.from({ length: cols }, (_, colIndex) => (
              <SpreadsheetCell
                key={`${rowIndex}-${colIndex}`}
                value={getCellValue(rowIndex, colIndex)}
                isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
                isEditing={editingCell?.row === rowIndex && editingCell?.col === colIndex}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onSelect={handleCellSelect}
                onEdit={handleCellEdit}
                onStartEditing={handleStartEditing}
                onStopEditing={handleStopEditing}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};