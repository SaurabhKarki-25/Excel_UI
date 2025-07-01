import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MenuBarProps {
  onMenuAction: (action: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onMenuAction }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    {
      name: 'File',
      items: ['New', 'Open', 'Save', 'Save As', 'Import', 'Export', 'Print', 'Share']
    },
    {
      name: 'Edit',
      items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Delete', 'Find & Replace']
    },
    {
      name: 'View',
      items: ['Zoom In', 'Zoom Out', 'Full Screen', 'Show Formulas', 'Freeze Rows']
    },
    {
      name: 'Insert',
      items: ['Rows', 'Columns', 'Cells', 'Chart', 'Image', 'Link', 'Comment']
    },
    {
      name: 'Format',
      items: ['Bold', 'Italic', 'Font Size', 'Text Color', 'Background Color', 'Borders']
    },
    {
      name: 'Data',
      items: ['Sort', 'Filter', 'Pivot Table', 'Data Validation', 'Remove Duplicates']
    }
  ];

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    onMenuAction(action);
    setActiveMenu(null);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1">
      <div className="flex items-center space-x-6">
        {menus.map((menu) => (
          <div key={menu.name} className="relative">
            <button
              onClick={() => handleMenuClick(menu.name)}
              className={`
                flex items-center space-x-1 px-2 py-1 text-sm rounded
                transition-colors duration-200
                ${activeMenu === menu.name 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <span>{menu.name}</span>
              <ChevronDown size={14} />
            </button>
            
            {activeMenu === menu.name && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[150px]">
                {menu.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleMenuItemClick(item)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700 first:rounded-t-md last:rounded-b-md"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Overlay to close menu when clicking outside */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
};