import React, { useState } from 'react';
import { Save, Mail, Slack, Bell } from 'lucide-react';

const NotificationSettingsPanel = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    enableEmailNotifications: true,
    emailRecipients: 'admin@example.com',
    enableSlackNotifications: false,
    slackWebhook: '',
    notifyOnErrors: true,
    notifyOnWarnings: true,
    notifyOnBackupComplete: true,
    notifyOnUserChanges: false,
    notifyOnSystemEvents: true,
    dailySummary: true,
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
    console.log('알림 설정 저장:', settings);
    // 실제로는 여기서 API 호출
  };

  // 이메일 테스트 핸들러
  const handleTestEmail = () => {
    console.log('이메일 알림 테스트');
    // 실제로는 여기서 API 호출
  };

  // Slack 테스트 핸들러
  const handleTestSlack = () => {
    console.log('Slack 알림 테스트');
    // 실제로는 여기서 API 호출
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>알림 설정</h3>
      
      <div className="space-y-4">
        {/* 이메일 알림 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Mail size={16} className="mr-1" />
            이메일 알림
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableEmailNotifications"
                name="enableEmailNotifications"
                checked={settings.enableEmailNotifications}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="enableEmailNotifications" className="text-sm">이메일 알림 활성화</label>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">수신자 (쉼표로 구분)</label>
              <input
                type="text"
                name="emailRecipients"
                value={settings.emailRecipients}
                onChange={handleSettingChange}
                disabled={!settings.enableEmailNotifications}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'} ${!settings.enableEmailNotifications ? 'opacity-50' : ''}`}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleTestEmail}
                disabled={!settings.enableEmailNotifications}
                className={`text-sm px-2 py-1 rounded ${
                  settings.enableEmailNotifications 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                }`}
              >
                테스트 이메일 전송
              </button>
            </div>
          </div>
        </div>
        
        {/* Slack 알림 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Slack size={16} className="mr-1" />
            Slack 알림
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableSlackNotifications"
                name="enableSlackNotifications"
                checked={settings.enableSlackNotifications}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="enableSlackNotifications" className="text-sm">Slack 알림 활성화</label>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">Slack Webhook URL</label>
              <input
                type="text"
                name="slackWebhook"
                value={settings.slackWebhook}
                onChange={handleSettingChange}
                disabled={!settings.enableSlackNotifications}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'} ${!settings.enableSlackNotifications ? 'opacity-50' : ''}`}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleTestSlack}
                disabled={!settings.enableSlackNotifications}
                className={`text-sm px-2 py-1 rounded ${
                  settings.enableSlackNotifications 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                }`}
              >
                테스트 메시지 전송
              </button>
            </div>
          </div>
        </div>
        
        {/* 알림 이벤트 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Bell size={16} className="mr-1" />
            알림 이벤트
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnErrors"
                name="notifyOnErrors"
                checked={settings.notifyOnErrors}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="notifyOnErrors" className="text-sm">오류 발생 시</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnWarnings"
                name="notifyOnWarnings"
                checked={settings.notifyOnWarnings}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="notifyOnWarnings" className="text-sm">경고 발생 시</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnBackupComplete"
                name="notifyOnBackupComplete"
                checked={settings.notifyOnBackupComplete}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="notifyOnBackupComplete" className="text-sm">백업 완료 시</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnUserChanges"
                name="notifyOnUserChanges"
                checked={settings.notifyOnUserChanges}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="notifyOnUserChanges" className="text-sm">사용자 변경 시</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnSystemEvents"
                name="notifyOnSystemEvents"
                checked={settings.notifyOnSystemEvents}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="notifyOnSystemEvents" className="text-sm">시스템 이벤트 발생 시</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dailySummary"
                name="dailySummary"
                checked={settings.dailySummary}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="dailySummary" className="text-sm">일일 요약 보고서</label>
            </div>
          </div>
        </div>
        
        {/* 저장 버튼 */}
        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <Save size={16} className="mr-1" />
            설정 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPanel;
