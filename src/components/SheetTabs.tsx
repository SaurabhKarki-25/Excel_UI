import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Sheet {
  id: string;
  name: string;
}

interface SheetTabsProps {
  onSheetChange: (sheetId: string) => void;
}

export const SheetTabs: React.FC<SheetTabsProps> = ({ onSheetChange }) => {
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: '1', name: 'Sheet1' },
    { id: '2', name: 'Sheet2' },
    { id: '3', name: 'Sheet3' }
  ]);
  const [activeSheet, setActiveSheet] = useState('1');

  const handleSheetClick = (sheetId: string) => {
    setActiveSheet(sheetId);
    onSheetChange(sheetId);
    console.log(`Switched to sheet: ${sheetId}`);
  };

  const handleAddSheet = () => {
    const newSheetId = String(sheets.length + 1);
    const newSheet = { id: newSheetId, name: `Sheet${newSheetId}` };
    setSheets([...sheets, newSheet]);
    console.log('Added new sheet:', newSheet.name);
  };

  const handleDeleteSheet = (sheetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sheets.length > 1) {
      const updatedSheets = sheets.filter(sheet => sheet.id !== sheetId);
      setSheets(updatedSheets);
      
      if (activeSheet === sheetId) {
        const newActiveSheet = updatedSheets[0]?.id || '1';
        setActiveSheet(newActiveSheet);
        onSheetChange(newActiveSheet);
      }
      console.log(`Deleted sheet: ${sheetId}`);
    }
  };

  return (
    <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex items-center space-x-1">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className={`
            group flex items-center px-3 py-1 rounded-t text-sm cursor-pointer
            transition-all duration-200
            ${activeSheet === sheet.id 
              ? 'bg-white border-t-2 border-blue-500 text-blue-600 font-medium' 
              : 'hover:bg-gray-200 text-gray-600'
            }
          `}
          onClick={() => handleSheetClick(sheet.id)}
        >
          <span>{sheet.name}</span>
          {sheets.length > 1 && (
            <button
              onClick={(e) => handleDeleteSheet(sheet.id, e)}
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-gray-300 rounded p-0.5 transition-opacity"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={handleAddSheet}
        className="p-1 hover:bg-gray-200 rounded transition-colors"
        title="Add Sheet"
      >
        <Plus size={16} className="text-gray-600" />
      </button>
    </div>
  );
};