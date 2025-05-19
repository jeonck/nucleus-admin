import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Monitor, 
  Server, 
  Users, 
  Database, 
  FileText, 
  Shield, 
  Cloud, 
  Settings, 
  RefreshCw,
  Moon,
  Sun
} from 'lucide-react';

import { useAppContext } from '../../context/AppContext';
import NotificationsPanel from './NotificationsPanel';

// 메뉴 항목 타입 정의
interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
}

// Props 타입 정의
interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    isRefreshing, 
    lastUpdated, 
    refreshData,
    notifications,
    darkMode,
    toggleDarkMode
  } = useAppContext();

  // 현재 활성화된 탭 결정
  const getActiveTab = (): string => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    return path.substring(1); // 앞의 '/' 제거
  };

  // 메뉴 항목 정의
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: '대시보드', icon: <Monitor size={20} />, path: '/' },
    { id: 'services', label: '서비스 관리', icon: <Server size={20} />, path: '/services' },
    { id: 'users', label: '사용자 관리', icon: <Users size={20} />, path: '/users' },
    { id: 'data', label: '데이터 관리', icon: <Database size={20} />, path: '/data' },
    { id: 'logs', label: '로그 관리', icon: <FileText size={20} />, path: '/logs' },
    { id: 'security', label: '보안 설정', icon: <Shield size={20} />, path: '/security' },
    { id: 'backup', label: '백업 및 복구', icon: <Cloud size={20} />, path: '/backup' },
    { id: 'settings', label: '시스템 설정', icon: <Settings size={20} />, path: '/settings' },
  ];

  // 현재 활성화된 탭
  const activeTab = getActiveTab();

  // 페이지 제목 얻기
  const getPageTitle = (): string => {
    const item = menuItems.find(item => item.id === activeTab);
    return item ? item.label : '';
  };

  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* 사이드바 */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-gray-900 text-white'} flex-shrink-0`}>
        <div className="p-4 bg-gray-800">
          <h1 className="text-2xl font-bold text-white">OmniAdmin</h1>
          <p className="text-sm text-gray-400">Nucleus 관리 시스템</p>
        </div>
        <nav className="p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className={`mb-2 ${activeTab === item.id ? 'bg-gray-700' : ''} rounded`}>
                <button 
                  onClick={() => navigate(item.path)} 
                  className="w-full flex items-center py-2 px-4 text-left text-white"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 bg-gray-800">
          <div className="flex items-center text-sm text-white">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>시스템 정상 작동 중</span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-auto">
        {/* 헤더 */}
        <header className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow`}>
          <div>
            <h2 className="text-xl font-semibold">
              {getPageTitle()}
            </h2>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-sm text-gray-500">
              최종 업데이트: {lastUpdated.toLocaleTimeString()}
            </div>
            <button 
              onClick={() => refreshData()} 
              className={`p-2 bg-blue-500 text-white rounded flex items-center ${isRefreshing ? 'opacity-75' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} size={16} />
              새로고침
            </button>
            
            {/* 다크 모드 토글 버튼 */}
            <button 
              onClick={toggleDarkMode} 
              className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* 알림 버튼 */}
            <div className="ml-4 relative">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* 알림 패널 */}
              {showNotifications && (
                <NotificationsPanel
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
