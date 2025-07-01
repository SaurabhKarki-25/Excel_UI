import React, { useState } from 'react';
import { ChevronRight, Eye, SortAsc, Filter, Grid3X3, Download, Upload, Share, Plus, ChevronDown } from 'lucide-react';

interface ToolbarProps {
  onAction: (action: string, data?: any) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showHideFieldsMenu, setShowHideFieldsMenu] = useState(false);

  const fields = [
    { key: 'id', label: 'ID' },
    { key: 'jobRequest', label: 'Job Request' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status', label: 'Status' },
    { key: 'submitter', label: 'Submitter' },
    { key: 'url', label: 'URL' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'priority', label: 'Priority' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'estValue', label: 'Est. Value' }
  ];

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    onAction('sort', { key: field, direction });
    setShowSortMenu(false);
  };

  const handleFilter = (field: string, value: string) => {
    onAction('filter', { column: field, value });
    setShowFilterMenu(false);
  };

  const handleHideField = (field: string) => {
    onAction('hide-field', { field });
  };

  const handleExport = () => {
    onAction('export');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onAction('import', { file });
      }
    };
    input.click();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Tool bar</span>
            <ChevronRight size={16} />
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Hide Fields */}
            <div className="relative">
              <button 
                onClick={() => setShowHideFieldsMenu(!showHideFieldsMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Eye size={16} />
                <span>Hide fields</span>
                <ChevronDown size={14} />
              </button>
              
              {showHideFieldsMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                  {fields.map((field) => (
                    <button
                      key={field.key}
                      onClick={() => handleHideField(field.key)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      Hide {field.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sort */}
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <SortAsc size={16} />
                <span>Sort</span>
                <ChevronDown size={14} />
              </button>
              
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                  {fields.map((field) => (
                    <div key={field.key} className="border-b border-gray-100 last:border-b-0">
                      <div className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50">
                        {field.label}
                      </div>
                      <button
                        onClick={() => handleSort(field.key, 'asc')}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                      >
                        Sort A → Z
                      </button>
                      <button
                        onClick={() => handleSort(field.key, 'desc')}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
                      >
                        Sort Z → A
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Filter size={16} />
                <span>Filter</span>
                <ChevronDown size={14} />
              </button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[250px] p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Status
                      </label>
                      <select 
                        onChange={(e) => e.target.value && handleFilter('status', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="">All statuses</option>
                        <option value="In-progress">In-progress</option>
                        <option value="Need to start">Need to start</option>
                        <option value="Complete">Complete</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Priority
                      </label>
                      <select 
                        onChange={(e) => e.target.value && handleFilter('priority', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="">All priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <button
                      onClick={() => onAction('clear-filter')}
                      className="w-full bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => onAction('cell-view')}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Grid3X3 size={16} />
              <span>Cell view</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleImport}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Download size={16} />
            <span>Import</span>
          </button>
          
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Upload size={16} />
            <span>Export</span>
          </button>
          
          <button 
            onClick={() => onAction('share')}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Share size={16} />
            <span>Share</span>
          </button>
          
          <button 
            onClick={() => onAction('new-action')}
            className="flex items-center space-x-2 px-4 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            <span>New Action</span>
          </button>
        </div>
      </div>
      
      {/* Overlay to close menus when clicking outside */}
      {(showSortMenu || showFilterMenu || showHideFieldsMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSortMenu(false);
            setShowFilterMenu(false);
            setShowHideFieldsMenu(false);
          }}
        />
      )}
    </div>
  );
};