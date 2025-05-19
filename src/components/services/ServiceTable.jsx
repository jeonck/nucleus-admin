import React from 'react';

const ServiceTable = ({ services, onRestart, onStop, darkMode }) => {
  // 서비스 상태에 따른 스타일
  const getStatusStyles = (status) => {
    switch (status) {
      case 'running':
        return darkMode 
          ? 'bg-green-900/20 text-green-300' 
          : 'bg-green-100 text-green-800';
      case 'stopped':
        return darkMode 
          ? 'bg-red-900/20 text-red-300' 
          : 'bg-red-100 text-red-800';
      case 'warning':
        return darkMode 
          ? 'bg-yellow-900/20 text-yellow-300' 
          : 'bg-yellow-100 text-yellow-800';
      default:
        return darkMode 
          ? 'bg-gray-900/20 text-gray-300' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded shadow mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>서비스 상태</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>서비스명</th>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>상태</th>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>가동 시간</th>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>CPU 사용량</th>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>메모리 사용량</th>
              <th className={`p-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>작업</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {services.map((service, index) => (
              <tr key={index} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                <td className={`p-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{service.name}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(service.status)}`}>
                    {service.status}
                  </span>
                </td>
                <td className={`p-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{service.uptime}</td>
                <td className={`p-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{service.cpu}%</td>
                <td className={`p-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{service.memory} MB</td>
                <td className="p-4 text-sm font-medium">
                  <button 
                    className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'} mr-3`}
                    onClick={() => onRestart(service.name)}
                    disabled={service.status !== 'running'}
                  >
                    재시작
                  </button>
                  <button 
                    className={service.status === 'running' 
                      ? (darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900')
                      : (darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-900')
                    }
                    onClick={() => onStop(service.name)}
                  >
                    {service.status === 'running' ? '중지' : '시작'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
