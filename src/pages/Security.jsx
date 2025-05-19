import React from 'react';
import { useAppContext } from '../context/AppContext';
import SecuritySettingsPanel from '../components/settings/SecuritySettingsPanel';
import SSLConfigPanel from '../components/settings/SSLConfigPanel';

const Security = () => {
  const { darkMode } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SecuritySettingsPanel darkMode={darkMode} />
        <SSLConfigPanel darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Security;
