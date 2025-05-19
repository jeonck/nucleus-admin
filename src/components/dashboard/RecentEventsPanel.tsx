import { X } from 'lucide-react';
import type { EventData } from '../../data/dashboardTypes';
import { recentEvents } from '../../data/dashboardData';

// Props 타입 정의
interface RecentEventsPanelProps {
  title: string;
  events: EventData[];
  darkMode: boolean;
}

const RecentEventsPanel = ({ title, events, darkMode }: RecentEventsPanelProps) => {
  // 이벤트 유형별 스타일
  const getTypeStyles = (type: string): string => {
    switch (type) {
      case 'error':
        return darkMode
          ? 'bg-red-900/20 text-red-300 border-red-700'
          : 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return darkMode
          ? 'bg-yellow-900/20 text-yellow-300 border-yellow-700'
          : 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'success':
        return darkMode
          ? 'bg-green-900/20 text-green-300 border-green-700'
          : 'bg-green-100 text-green-800 border-green-300';
      case 'info':
      default:
        return darkMode
          ? 'bg-blue-900/20 text-blue-300 border-blue-700'
          : 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
      <div className="overflow-y-auto max-h-64">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`p-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>유형</th>
              <th className={`p-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>메시지</th>
              <th className={`p-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>시간</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="p-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyles(event.type)}`}>
                    {event.type}
                  </span>
                </td>
                <td className={`p-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{event.message}</td>
                <td className={`p-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEventsPanel;
