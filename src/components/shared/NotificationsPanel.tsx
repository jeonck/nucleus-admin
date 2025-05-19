import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import type { Notification } from '../../context/AppContext';

// Props 타입 정의
interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationsPanel = ({ notifications, onClose }: NotificationsPanelProps) => {
  const { removeNotification } = useAppContext();

  // 알림 유형에 따른 스타일
  const getTypeStyles = (type: string): string => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">알림</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            새로운 알림이 없습니다.
          </div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className={`relative p-3 rounded-lg ${getTypeStyles(notification.type)} mb-1`}>
                  <button 
                    onClick={() => notification.id && removeNotification(notification.id)}
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={12} />
                  </button>
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.id ? new Date(notification.id).toLocaleTimeString() : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
          <button 
            onClick={() => notifications.forEach(n => n.id && removeNotification(n.id))}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            모든 알림 지우기
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
