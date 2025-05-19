import React from 'react';
import { useAppContext } from '../context/AppContext';
import LogViewerPanel from '../components/logs/LogViewerPanel';
import LogFilterPanel from '../components/logs/LogFilterPanel';

const Logs = () => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <LogFilterPanel darkMode={darkMode} />
        </div>
        <div className="md:col-span-3">
          <LogViewerPanel darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Logs;
