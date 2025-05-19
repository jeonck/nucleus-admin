import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 알림 타입 정의
export interface Notification {
  id?: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

// 컨텍스트 타입 정의
interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isRefreshing: boolean;
  lastUpdated: Date;
  refreshData: () => Promise<void>;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// 컨텍스트 생성 (초기값은 null이지만 타입은 AppContextType)
const AppContext = createContext<AppContextType | null>(null);

// 컨텍스트 사용을 위한 커스텀 훅
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// 프로바이더 props 타입 정의
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // 알림 추가 함수
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, { ...notification, id: Date.now() }]);
  };

  // 알림 제거 함수
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // 데이터 새로고침 함수
  const refreshData = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      // 실제 구현에서는 여기서 여러 API 호출 등을 수행
      await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
      setLastUpdated(new Date());
    } catch (error) {
      console.error('데이터 새로고침 중 오류 발생:', error);
      addNotification({
        type: 'error',
        message: '데이터 새로고침 중 오류가 발생했습니다.',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    // 다크 모드 상태를 저장
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  // 초기화 시 저장된 다크 모드 설정 불러오기
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // 다크 모드에 따라 HTML 요소 클래스 설정
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 다크 모드 변경 시 HTML 클래스 업데이트
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isRefreshing,
        lastUpdated,
        refreshData,
        notifications,
        addNotification,
        removeNotification,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
