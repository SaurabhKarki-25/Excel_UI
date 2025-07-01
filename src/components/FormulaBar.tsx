import React, { useState } from 'react';

interface FormulaBarProps {
  selectedCell: string;
  cellValue: string;
  onValueChange: (value: string) => void;
}

export const FormulaBar: React.FC<FormulaBarProps> = ({ 
  selectedCell, 
  cellValue, 
  onValueChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(cellValue);

  const handleSubmit = () => {
    onValueChange(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setValue(cellValue);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600 min-w-[40px]">
          {selectedCell}
        </span>
      </div>
      
      <div className="flex-1 flex items-center">
        <div className="w-6 h-6 flex items-center justify-center text-sm text-gray-500 mr-2">
          fx
        </div>
        <input
          type="text"
          value={isEditing ? value : cellValue}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter value or formula..."
        />
      </div>
    </div>
  );
};