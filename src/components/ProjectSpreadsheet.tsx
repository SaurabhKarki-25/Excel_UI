import React, { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { EditableCell } from './EditableCell';
import { ExternalLink, User } from 'lucide-react';

interface ProjectData {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
}

const initialData: ProjectData[] = [
  {
    id: 1,
    jobRequest: "Launch social media campaign for pro...",
    submitted: "15-11-2024",
    status: "In-progress",
    submitter: "Aisha Patel",
    url: "www.aishapatel...",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "6,200,000"
  },
  {
    id: 2,
    jobRequest: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500,000"
  },
  {
    id: 3,
    jobRequest: "Finalize user testing feedback for app...",
    submitted: "05-12-2024",
    status: "In-progress",
    submitter: "Mark Johnson",
    url: "www.markjohns...",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750,000"
  },
  {
    id: 4,
    jobRequest: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen...",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,800,000"
  },
  {
    id: 5,
    jobRequest: "Prepare monthly report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabro...",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    estValue: "2,600,000"
  }
];

interface SpreadsheetProps {
  onDataChange?: (data: ProjectData[]) => void;
  sortConfig?: { key: keyof ProjectData; direction: 'asc' | 'desc' } | null;
  filterConfig?: { column: string; value: string } | null;
  hiddenFields?: string[];
}

export const ProjectSpreadsheet: React.FC<SpreadsheetProps> = ({ 
  onDataChange, 
  sortConfig, 
  filterConfig,
  hiddenFields = []
}) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: string} | null>(null);
  const [editingCell, setEditingCell] = useState<{row: number, col: string} | null>(null);
  const [data, setData] = useState<ProjectData[]>(initialData);
  const [copiedCell, setCopiedCell] = useState<{row: number, col: string, value: string} | null>(null);

  // Add empty rows to make it feel like a real spreadsheet
  const emptyRowsCount = 20;
  const totalRows = data.length + emptyRowsCount;

  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }
  }, [data, onDataChange]);

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Apply filtering
  const filteredData = React.useMemo(() => {
    if (!filterConfig) return sortedData;
    
    return sortedData.filter(row => {
      const value = row[filterConfig.column as keyof ProjectData];
      return value.toString().toLowerCase().includes(filterConfig.value.toLowerCase());
    });
  }, [sortedData, filterConfig]);

  const handleCellSelect = (rowIndex: number, colKey: string) => {
    setSelectedCell({ row: rowIndex, col: colKey });
    setEditingCell(null);
  };

  const handleStartEditing = (rowIndex: number, colKey: string) => {
    setEditingCell({ row: rowIndex, col: colKey });
  };

  const handleStopEditing = () => {
    setEditingCell(null);
  };

  const handleCellEdit = (rowIndex: number, colKey: string, value: string) => {
    if (rowIndex < data.length) {
      // Edit existing row
      setData(prevData => 
        prevData.map((row, index) => 
          index === rowIndex 
            ? { ...row, [colKey]: value }
            : row
        )
      );
    } else {
      // Add new row
      const newRow: ProjectData = {
        id: data.length + 1,
        jobRequest: '',
        submitted: '',
        status: '',
        submitter: '',
        url: '',
        assigned: '',
        priority: '',
        dueDate: '',
        estValue: ''
      };
      newRow[colKey as keyof ProjectData] = value as any;
      setData(prevData => [...prevData, newRow]);
    }
  };

  const getCellValue = (rowIndex: number, colKey: string): string => {
    if (rowIndex < filteredData.length) {
      return filteredData[rowIndex][colKey as keyof ProjectData]?.toString() || '';
    }
    return '';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || editingCell) return;

      const { row, col } = selectedCell;
      const columns = ['id', 'jobRequest', 'submitted', 'status', 'submitter', 'url', 'assigned', 'priority', 'dueDate', 'estValue'];
      const currentColIndex = columns.indexOf(col);
      
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          e.preventDefault();
          break;
        case 'ArrowDown':
          newRow = Math.min(totalRows - 1, row + 1);
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (currentColIndex > 0) {
            newCol = columns[currentColIndex - 1];
          }
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (currentColIndex < columns.length - 1) {
            newCol = columns[currentColIndex + 1];
          }
          e.preventDefault();
          break;
        case 'Enter':
        case 'F2':
          handleStartEditing(row, col);
          e.preventDefault();
          break;
        case 'Delete':
          handleCellEdit(row, col, '');
          e.preventDefault();
          break;
      }

      if (newRow !== row || newCol !== col) {
        setSelectedCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, editingCell, totalRows]);

  const columns = [
    { key: 'id', label: '#', width: 'w-8' },
    { key: 'jobRequest', label: '📋 Job Request', width: 'min-w-[200px]' },
    { key: 'submitted', label: '📅 Submitted', width: '' },
    { key: 'status', label: '🔄 Status', width: '' },
    { key: 'submitter', label: '👤 Submitter', width: '' },
    { key: 'url', label: '🔗 URL', width: '' },
    { key: 'assigned', label: '👥 Assigned', width: '' },
    { key: 'priority', label: 'Priority', width: '' },
    { key: 'dueDate', label: 'Due Date', width: '' },
    { key: 'estValue', label: 'Est. Value', width: '' }
  ].filter(col => !hiddenFields.includes(col.key));

  const renderCellContent = (rowIndex: number, colKey: string, value: string) => {
    switch (colKey) {
      case 'status':
        return value ? <StatusBadge status={value} /> : null;
      case 'priority':
        return value ? <PriorityBadge priority={value} /> : null;
      case 'url':
        return value ? (
          <div className="flex items-center space-x-1">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              {value}
            </span>
            <ExternalLink size={12} className="text-gray-400" />
          </div>
        ) : null;
      case 'estValue':
        return value ? <span className="font-medium">₹{value}</span> : null;
      case 'jobRequest':
        return (
          <div className="flex items-center">
            {rowIndex === 4 && (
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2">
                mona
              </span>
            )}
            {value}
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      {/* Header with tabs */}
      <div className="bg-gradient-to-r from-teal-400 to-purple-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">📊 Q3 Financial Overview</span>
              <span className="text-sm">📋</span>
            </div>
            <div className="bg-teal-500 text-white px-3 py-1 rounded text-sm font-medium">
              Vani Narwani
            </div>
            <div className="bg-purple-200 text-purple-800 px-3 py-1 rounded text-sm">
              Answer a question
            </div>
            <div className="bg-orange-200 text-orange-800 px-3 py-1 rounded text-sm">
              Extract
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 ${column.width}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: totalRows }, (_, rowIndex) => {
              const isDataRow = rowIndex < filteredData.length;
              const rowData = isDataRow ? filteredData[rowIndex] : null;
              
              return (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column) => {
                    const value = isDataRow ? (rowData?.[column.key as keyof ProjectData]?.toString() || '') : '';
                    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === column.key;
                    const isEditing = editingCell?.row === rowIndex && editingCell?.col === column.key;
                    
                    return (
                      <EditableCell
                        key={`${rowIndex}-${column.key}`}
                        value={value}
                        isSelected={isSelected}
                        isEditing={isEditing}
                        onSelect={() => handleCellSelect(rowIndex, column.key)}
                        onEdit={(newValue) => handleCellEdit(rowIndex, column.key, newValue)}
                        onStartEditing={() => handleStartEditing(rowIndex, column.key)}
                        onStopEditing={handleStopEditing}
                      >
                        {!isEditing && renderCellContent(rowIndex, column.key, value)}
                      </EditableCell>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* User indicator in bottom right */}
      <div className="fixed bottom-4 right-4">
        <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
          <User size={14} />
          <span>Aman kasnya</span>
        </div>
      </div>
    </div>
  );
};