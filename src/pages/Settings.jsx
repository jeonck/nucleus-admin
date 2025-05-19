import React from 'react';
import { useAppContext } from '../context/AppContext';
import SystemSettingsPanel from '../components/settings/SystemSettingsPanel';
import NotificationSettingsPanel from '../components/settings/NotificationSettingsPanel';

const Settings = () => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SystemSettingsPanel darkMode={darkMode} />
        <NotificationSettingsPanel darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Settings;
