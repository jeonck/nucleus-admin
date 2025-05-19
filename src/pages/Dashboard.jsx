import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import ChartContainer from '../components/dashboard/ChartContainer';
import RecentEventsPanel from '../components/dashboard/RecentEventsPanel';
import { useAppContext } from '../context/AppContext';

// 대시보드 데이터 import
import { 
  cpuUsageData, 
  memoryUsageData, 
  diskUsageData, 
  connectionData,
  recentEvents
} from '../data/dashboardData';

import { Cpu, Activity, HardDrive, Users } from 'lucide-react';

const Dashboard = () => {
  const { darkMode } = useAppContext();
  
  // 현재 통계 값 (마지막 데이터 포인트 기준)
  const currentCpuUsage = cpuUsageData[cpuUsageData.length - 1].usage;
  const currentMemoryUsage = memoryUsageData[memoryUsageData.length - 1].usage;
  const currentActiveConnections = connectionData[connectionData.length - 1].connections;
  
  // 디스크 사용량 계산
  const totalDiskSpace = diskUsageData.reduce((acc, curr) => acc + curr.total, 0);
  const usedDiskSpace = diskUsageData.reduce((acc, curr) => acc + curr.used, 0);
  const diskUsagePercentage = Math.round((usedDiskSpace / totalDiskSpace) * 100);

  return (
    <div>
      {/* 상단 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="CPU 사용량" 
          value={`${currentCpuUsage}%`} 
          icon={<Cpu />} 
          color="blue"
          darkMode={darkMode}
        />
        <StatCard 
          title="메모리 사용량" 
          value={`${currentMemoryUsage}%`} 
          icon={<Activity />} 
          color="green"
          darkMode={darkMode}
        />
        <StatCard 
          title="디스크 사용량" 
          value={`${diskUsagePercentage}%`} 
          icon={<HardDrive />} 
          color="purple"
          darkMode={darkMode}
        />
        <StatCard 
          title="활성 연결" 
          value={currentActiveConnections} 
          icon={<Users />} 
          color="orange"
          darkMode={darkMode}
        />
      </div>

      {/* 차트 및 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer 
          title="CPU 사용량 추이" 
          data={cpuUsageData} 
          dataKey="usage" 
          type="line"
          color="#3B82F6"
          yAxisLabel="%"
          darkMode={darkMode}
        />
        <ChartContainer 
          title="메모리 사용량 추이" 
          data={memoryUsageData} 
          dataKey="usage" 
          type="area"
          color="#10B981"
          fillColor="#D1FAE5"
          yAxisLabel="%"
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="디스크 사용량" 
          data={diskUsageData} 
          dataKey="used" 
          type="bar"
          color="#8884d8"
          xAxisDataKey="name"
          yAxisLabel="GB"
          comparativeDataKey="total"
          comparativeColor="#82ca9d"
          darkMode={darkMode}
        />
        <RecentEventsPanel 
          title="최근 이벤트" 
          events={recentEvents}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;
