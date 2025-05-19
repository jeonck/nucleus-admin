import React from 'react';
import { HardDrive, Database, Server } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StorageStatsPanel = ({ darkMode }) => {
  // 스토리지 데이터
  const storageData = [
    { name: 'nucleus-data', value: 850, total: 1000, color: '#8884d8' },
    { name: 'nucleus-cache', value: 420, total: 500, color: '#82ca9d' },
    { name: 'nucleus-logs', value: 120, total: 200, color: '#ffc658' }
  ];

  // 파일 유형별 데이터
  const fileTypesData = [
    { name: 'USD 파일', value: 750, color: '#0088FE' },
    { name: '텍스처 (PNG/JPG)', value: 350, color: '#00C49F' },
    { name: '구성 파일', value: 120, color: '#FFBB28' },
    { name: '로그 파일', value: 170, color: '#FF8042' }
  ];

  // 미디어 유형별 데이터
  const mediaTypesData = [
    { name: '3D 모델', value: 620, color: '#8884d8' },
    { name: '이미지', value: 350, color: '#82ca9d' },
    { name: '구성', value: 180, color: '#ffc658' },
    { name: '기타', value: 240, color: '#ff8042' }
  ];

  // 총 사용량 계산
  const totalUsed = storageData.reduce((sum, item) => sum + item.value, 0);
  const totalCapacity = storageData.reduce((sum, item) => sum + item.total, 0);
  const usagePercentage = Math.round((totalUsed / totalCapacity) * 100);

  // 스토리지 사용량 막대 렌더링
  const renderStorageBar = (item) => {
    const percentage = Math.round((item.value / item.total) * 100);
    return (
      <div key={item.name} className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm">{item.name}</div>
          <div className="text-sm">
            {item.value} / {item.total} MB ({percentage}%)
          </div>
        </div>
        <div className={`w-full h-2 rounded overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="h-full" 
            style={{ 
              width: `${percentage}%`, 
              backgroundColor: item.color 
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>스토리지 통계</h3>
      
      {/* 총 사용량 */}
      <div className="flex items-center mb-4">
        <div className="mr-3">
          <HardDrive size={36} className="text-blue-500" />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">총 스토리지 사용량</div>
          <div className="text-xl font-semibold">{totalUsed} / {totalCapacity} MB</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{usagePercentage}% 사용 중</div>
        </div>
      </div>
      
      {/* 스토리지 사용량 막대 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">스토리지 별 사용량</h4>
        {storageData.map(renderStorageBar)}
      </div>
      
      {/* 파일 유형별 통계 */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">파일 유형별 통계</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fileTypesData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {fileTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value} MB`}
                contentStyle={{ 
                  backgroundColor: darkMode ? '#374151' : '#fff',
                  color: darkMode ? '#e5e7eb' : '#111827',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* 미디어 유형별 통계 */}
      <div>
        <h4 className="text-sm font-semibold mb-2">미디어 유형별 통계</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mediaTypesData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {mediaTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value} MB`}
                contentStyle={{ 
                  backgroundColor: darkMode ? '#374151' : '#fff',
                  color: darkMode ? '#e5e7eb' : '#111827',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StorageStatsPanel;
