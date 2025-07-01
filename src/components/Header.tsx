import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>📁</span>
            <span>Workspace</span>
            <span>›</span>
            <span>Folder 2</span>
            <span>›</span>
            <span className="font-medium text-gray-900">Spreadsheet 3</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search within sheet..."
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
              <User size={16} className="text-gray-600" />
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-gray-500">john.doe...</span>
              <ChevronDown size={14} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};