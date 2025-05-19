import { ReactNode } from 'react';

// Props 타입 정의
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | string;
  darkMode: boolean;
}

// 색상 클래스 인터페이스
interface ColorClasses {
  icon: string;
  background: string;
}

const StatCard = ({ title, value, icon, color, darkMode }: StatCardProps) => {
  // 색상 설정
  const getColorClasses = (): ColorClasses => {
    switch (color) {
      case 'blue':
        return {
          icon: 'text-blue-500',
          background: darkMode ? 'bg-blue-900/20' : 'bg-blue-100'
        };
      case 'green':
        return {
          icon: 'text-green-500',
          background: darkMode ? 'bg-green-900/20' : 'bg-green-100'
        };
      case 'purple':
        return {
          icon: 'text-purple-500',
          background: darkMode ? 'bg-purple-900/20' : 'bg-purple-100'
        };
      case 'orange':
        return {
          icon: 'text-orange-500',
          background: darkMode ? 'bg-orange-900/20' : 'bg-orange-100'
        };
      default:
        return {
          icon: 'text-gray-500',
          background: darkMode ? 'bg-gray-900/20' : 'bg-gray-100'
        };
    }
  };

  const { icon: iconColor, background } = getColorClasses();

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={darkMode ? 'text-gray-300' : 'text-gray-500'}>{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${background}`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
