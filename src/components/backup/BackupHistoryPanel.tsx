import { RefreshCw } from 'lucide-react';
import type { BackupHistoryData } from '../../data/dashboardTypes';
import { backupHistoryData } from '../../data/dashboardData';

interface BackupHistoryPanelProps {
  darkMode: boolean;
}

const BackupHistoryPanel = ({ darkMode }: BackupHistoryPanelProps) => {
  // 백업 상태에 따른 스타일
  const getStatusStyle = (status: string): string => {
    switch (status) {
      case 'success':
        return darkMode 
          ? 'bg-green-900/20 text-green-300' 
          : 'bg-green-100 text-green-800';
      case 'warning':
        return darkMode 
          ? 'bg-yellow-900/20 text-yellow-300' 
          : 'bg-yellow-100 text-yellow-800';
      case 'error':
        return darkMode 
          ? 'bg-red-900/20 text-red-300' 
          : 'bg-red-100 text-red-800';
      default:
        return darkMode 
          ? 'bg-gray-900/20 text-gray-300' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`p-4 rounded shadow mt-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>백업 기록</h3>
        <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <RefreshCw size={18} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>시간</th>
              <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>상태</th>
              <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>크기</th>
              <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>소요 시간</th>
              <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>위치</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {backupHistoryData.map((backup) => (
              <tr key={backup.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {formatDate(backup.timestamp)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(backup.status)}`}>
                    {backup.status}
                  </span>
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {backup.size}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {backup.duration}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {backup.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackupHistoryPanel;
