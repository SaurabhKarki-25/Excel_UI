import React, { useState, useRef, useEffect } from 'react';

interface SpreadsheetCellProps {
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  rowIndex: number;
  colIndex: number;
  onSelect: (row: number, col: number) => void;
  onEdit: (row: number, col: number, value: string) => void;
  onStartEditing: (row: number, col: number) => void;
  onStopEditing: () => void;
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  value,
  isSelected,
  isEditing,
  rowIndex,
  colIndex,
  onSelect,
  onEdit,
  onStartEditing,
  onStopEditing
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleClick = () => {
    onSelect(rowIndex, colIndex);
  };

  const handleDoubleClick = () => {
    onStartEditing(rowIndex, colIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEdit(rowIndex, colIndex, editValue);
      onStopEditing();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onStopEditing();
    }
  };

  const handleBlur = () => {
    onEdit(rowIndex, colIndex, editValue);
    onStopEditing();
  };

  return (
    <div
      className={`
        w-24 h-8 border-r border-b border-gray-200 flex items-center px-2 text-sm
        cursor-cell relative
        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 z-10' : 'hover:bg-gray-50'}
        ${isEditing ? 'bg-white' : ''}
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-full bg-transparent outline-none text-sm"
        />
      ) : (
        <span className="truncate w-full">{value}</span>
      )}
    </div>
  );
};