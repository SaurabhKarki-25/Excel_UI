import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const BottomTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  
  const tabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
              activeTab === tab
                ? 'bg-white border-t-2 border-orange-400 text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
        
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};