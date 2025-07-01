import React, { useState, useRef, useEffect } from 'react';

interface EditableCellProps {
  value: string;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onEdit: (value: string) => void;
  onStartEditing: () => void;
  onStopEditing: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isSelected,
  isEditing,
  onSelect,
  onEdit,
  onStartEditing,
  onStopEditing,
  className = '',
  children
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
    onSelect();
  };

  const handleDoubleClick = () => {
    onStartEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEdit(editValue);
      onStopEditing();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      onStopEditing();
    }
  };

  const handleBlur = () => {
    onEdit(editValue);
    onStopEditing();
  };

  const cellClassName = `px-3 py-2 text-sm border-r border-gray-200 cursor-cell relative ${
    isSelected ? 'bg-blue-50 ring-2 ring-blue-500 z-10' : 'hover:bg-gray-50'
  } ${className}`;

  return (
    <td 
      className={cellClassName}
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
        children || <span className="truncate block">{value}</span>
      )}
    </td>
  );
};