import React, { useState } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { ProjectSpreadsheet } from './components/ProjectSpreadsheet';
import { BottomTabs } from './components/BottomTabs';

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

function App() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof ProjectData; direction: 'asc' | 'desc' } | null>(null);
  const [filterConfig, setFilterConfig] = useState<{ column: string; value: string } | null>(null);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);
  const [data, setData] = useState<ProjectData[]>([]);

  const handleToolbarAction = (action: string, actionData?: any) => {
    console.log(`Toolbar action: ${action}`, actionData);
    
    switch (action) {
      case 'sort':
        setSortConfig(actionData);
        break;
        
      case 'filter':
        setFilterConfig(actionData);
        break;
        
      case 'clear-filter':
        setFilterConfig(null);
        break;
        
      case 'hide-field':
        setHiddenFields(prev => 
          prev.includes(actionData.field) 
            ? prev.filter(f => f !== actionData.field)
            : [...prev, actionData.field]
        );
        break;
        
      case 'export':
        exportData();
        break;
        
      case 'import':
        importData(actionData.file);
        break;
        
      case 'share':
        navigator.share?.({
          title: 'Project Management Spreadsheet',
          text: 'Check out this project management data',
          url: window.location.href
        }).catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        });
        break;
        
      case 'new-action':
        addNewRow();
        break;
        
      case 'cell-view':
        alert('Cell view functionality - switch between different cell display modes');
        break;
        
      default:
        console.log(`Action ${action} not implemented yet`);
    }
  };

  const exportData = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: ProjectData[]): string => {
    const headers = ['ID', 'Job Request', 'Submitted', 'Status', 'Submitter', 'URL', 'Assigned', 'Priority', 'Due Date', 'Est. Value'];
    const rows = data.map(row => [
      row.id,
      `"${row.jobRequest}"`,
      row.submitted,
      row.status,
      row.submitter,
      row.url,
      row.assigned,
      row.priority,
      row.dueDate,
      row.estValue
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (file.name.endsWith('.json')) {
          const importedData = JSON.parse(content);
          setData(importedData);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          const importedData = lines.slice(1).map((line, index) => {
            const values = line.split(',');
            return {
              id: index + 1,
              jobRequest: values[1]?.replace(/"/g, '') || '',
              submitted: values[2] || '',
              status: values[3] || '',
              submitter: values[4] || '',
              url: values[5] || '',
              assigned: values[6] || '',
              priority: values[7] || '',
              dueDate: values[8] || '',
              estValue: values[9] || ''
            };
          }).filter(row => row.jobRequest); // Filter out empty rows
          setData(importedData);
        }
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const addNewRow = () => {
    const newRow: ProjectData = {
      id: data.length + 1,
      jobRequest: 'New Task',
      submitted: new Date().toLocaleDateString('en-GB'),
      status: 'Need to start',
      submitter: 'Current User',
      url: '',
      assigned: '',
      priority: 'Medium',
      dueDate: '',
      estValue: '0'
    };
    setData(prev => [...prev, newRow]);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <Toolbar onAction={handleToolbarAction} />
      <ProjectSpreadsheet 
        onDataChange={setData}
        sortConfig={sortConfig}
        filterConfig={filterConfig}
        hiddenFields={hiddenFields}
      />
      <BottomTabs />
    </div>
  );
}

export default App;