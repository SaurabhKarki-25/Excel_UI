import React from 'react';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 font-medium';
      case 'medium':
        return 'text-yellow-600 font-medium';
      case 'low':
        return 'text-blue-600 font-medium';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <span className={getPriorityStyle(priority)}>
      {priority}
    </span>
  );
};