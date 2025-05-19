import React from 'react';
import { useAppContext } from '../context/AppContext';
import FileBrowserPanel from '../components/data/FileBrowserPanel';
import StorageStatsPanel from '../components/data/StorageStatsPanel';

const DataManagement = () => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <FileBrowserPanel darkMode={darkMode} />
        </div>
        <div>
          <StorageStatsPanel darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
