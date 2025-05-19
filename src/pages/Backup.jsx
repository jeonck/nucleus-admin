import React from 'react';
import { useAppContext } from '../context/AppContext';
import BackupHistoryPanel from '../components/backup/BackupHistoryPanel';
import BackupSchedulePanel from '../components/backup/BackupSchedulePanel';
import RecoveryPanel from '../components/backup/RecoveryPanel';

const Backup = () => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BackupSchedulePanel darkMode={darkMode} />
        <RecoveryPanel darkMode={darkMode} />
      </div>
      <div>
        <BackupHistoryPanel darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Backup;
