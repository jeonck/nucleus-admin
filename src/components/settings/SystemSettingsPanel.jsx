import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const SystemSettingsPanel = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    serverName: 'Nucleus Enterprise Server',
    listenPort: '3333',
    maxConnections: '500',
    maxDownloads: '10',
    clientTimeout: '300',
    logLevel: 'INFO',
    enableMetrics: true,
    enableCache: true,
    cacheSize: '500',
  });

  // 설정 변경 핸들러
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 설정 저장 핸들러
  const handleSaveSettings = () => {
    console.log('시스템 설정 저장:', settings);
    // 실제로는 여기서 API 호출
  };

  // 설정 재설정 핸들러
  const handleResetSettings = () => {
    // 기본값으로 설정 복원
    setSettings({
      serverName: 'Nucleus Enterprise Server',
      listenPort: '3333',
      maxConnections: '500',
      maxDownloads: '10',
      clientTimeout: '300',
      logLevel: 'INFO',
      enableMetrics: true,
      enableCache: true,
      cacheSize: '500',
    });
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>시스템 설정</h3>
      
      <div className="space-y-4">
        {/* 서버 설정 */}
        <div>
          <h4 className="text-sm font-semibold mb-2">서버 설정</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">서버 이름</label>
              <input
                type="text"
                name="serverName"
                value={settings.serverName}
                onChange={handleSettingChange}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">포트</label>
              <input
                type="number"
                name="listenPort"
                value={settings.listenPort}
                onChange={handleSettingChange}
                min="1"
                max="65535"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
          </div>
        </div>
        
        {/* 연결 설정 */}
        <div>
          <h4 className="text-sm font-semibold mb-2">연결 설정</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">최대 연결 수</label>
              <input
                type="number"
                name="maxConnections"
                value={settings.maxConnections}
                onChange={handleSettingChange}
                min="1"
                max="1000"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">최대 동시 다운로드</label>
              <input
                type="number"
                name="maxDownloads"
                value={settings.maxDownloads}
                onChange={handleSettingChange}
                min="1"
                max="100"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">클라이언트 타임아웃 (초)</label>
              <input
                type="number"
                name="clientTimeout"
                value={settings.clientTimeout}
                onChange={handleSettingChange}
                min="30"
                max="3600"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
          </div>
        </div>
        
        {/* 로깅 및 성능 */}
        <div>
          <h4 className="text-sm font-semibold mb-2">로깅 및 성능</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">로그 레벨</label>
              <select
                name="logLevel"
                value={settings.logLevel}
                onChange={handleSettingChange}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              >
                <option value="ERROR">ERROR</option>
                <option value="WARN">WARN</option>
                <option value="INFO">INFO</option>
                <option value="DEBUG">DEBUG</option>
              </select>
            </div>
            
            <div className="flex items-center h-full pt-5">
              <input
                type="checkbox"
                id="enableMetrics"
                name="enableMetrics"
                checked={settings.enableMetrics}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="enableMetrics" className="text-sm">성능 메트릭 활성화</label>
            </div>
          </div>
        </div>
        
        {/* 캐시 설정 */}
        <div>
          <h4 className="text-sm font-semibold mb-2">캐시 설정</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableCache"
                name="enableCache"
                checked={settings.enableCache}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="enableCache" className="text-sm">캐시 활성화</label>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">캐시 크기 (MB)</label>
              <input
                type="number"
                name="cacheSize"
                value={settings.cacheSize}
                onChange={handleSettingChange}
                min="100"
                max="10000"
                disabled={!settings.enableCache}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'} ${!settings.enableCache ? 'opacity-50' : ''}`}
              />
            </div>
          </div>
        </div>
        
        {/* 버튼 영역 */}
        <div className="flex space-x-2 pt-4">
          <button
            onClick={handleSaveSettings}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <Save size={16} className="mr-1" />
            설정 저장
          </button>
          <button
            onClick={handleResetSettings}
            className={`flex-1 ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} py-2 px-4 rounded flex items-center justify-center`}
          >
            <RefreshCw size={16} className="mr-1" />
            기본값으로 재설정
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPanel;
