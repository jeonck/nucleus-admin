import React, { useState } from 'react';
import { Shield, Lock, Key, Save } from 'lucide-react';

const SecuritySettingsPanel = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    passwordPolicy: 'strong',
    minPasswordLength: '8',
    requireSpecialChars: true,
    requireNumbers: true,
    requireMixedCase: true,
    passwordExpiration: '90',
    maxLoginAttempts: '5',
    sessionTimeout: '30',
    twoFactorAuth: false,
    ipRestriction: false,
    allowedIpAddresses: '',
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
    console.log('보안 설정 저장:', settings);
    // 실제로는 여기서 API 호출
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>보안 설정</h3>
      
      <div className="space-y-4">
        {/* 비밀번호 정책 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Key size={16} className="mr-1" />
            비밀번호 정책
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-xs font-medium mb-1">비밀번호 정책</label>
              <select
                name="passwordPolicy"
                value={settings.passwordPolicy}
                onChange={handleSettingChange}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              >
                <option value="basic">기본</option>
                <option value="medium">중간</option>
                <option value="strong">강력</option>
                <option value="custom">커스텀</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">최소 비밀번호 길이</label>
              <input
                type="number"
                name="minPasswordLength"
                value={settings.minPasswordLength}
                onChange={handleSettingChange}
                min="6"
                max="24"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
                disabled={settings.passwordPolicy !== 'custom'}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireSpecialChars"
                name="requireSpecialChars"
                checked={settings.requireSpecialChars}
                onChange={handleSettingChange}
                className="mr-2"
                disabled={settings.passwordPolicy !== 'custom'}
              />
              <label htmlFor="requireSpecialChars" className="text-sm">특수문자 필요</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireNumbers"
                name="requireNumbers"
                checked={settings.requireNumbers}
                onChange={handleSettingChange}
                className="mr-2"
                disabled={settings.passwordPolicy !== 'custom'}
              />
              <label htmlFor="requireNumbers" className="text-sm">숫자 필요</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireMixedCase"
                name="requireMixedCase"
                checked={settings.requireMixedCase}
                onChange={handleSettingChange}
                className="mr-2"
                disabled={settings.passwordPolicy !== 'custom'}
              />
              <label htmlFor="requireMixedCase" className="text-sm">대소문자 혼합</label>
            </div>
          </div>
        </div>
        
        {/* 계정 보안 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Shield size={16} className="mr-1" />
            계정 보안
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">비밀번호 만료 (일)</label>
              <input
                type="number"
                name="passwordExpiration"
                value={settings.passwordExpiration}
                onChange={handleSettingChange}
                min="0"
                max="365"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">0 = 만료 없음</span>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">최대 로그인 시도</label>
              <input
                type="number"
                name="maxLoginAttempts"
                value={settings.maxLoginAttempts}
                onChange={handleSettingChange}
                min="1"
                max="10"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">세션 타임아웃 (분)</label>
              <input
                type="number"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleSettingChange}
                min="5"
                max="1440"
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              />
            </div>
          </div>
        </div>
        
        {/* 강화된 보안 */}
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center">
            <Lock size={16} className="mr-1" />
            강화된 보안
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="twoFactorAuth" className="text-sm">2단계 인증 필요</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ipRestriction"
                name="ipRestriction"
                checked={settings.ipRestriction}
                onChange={handleSettingChange}
                className="mr-2"
              />
              <label htmlFor="ipRestriction" className="text-sm">IP 주소 제한</label>
            </div>
            
            {settings.ipRestriction && (
              <div>
                <label className="block text-xs font-medium mb-1">허용된 IP 주소 (쉼표로 구분)</label>
                <input
                  type="text"
                  name="allowedIpAddresses"
                  value={settings.allowedIpAddresses}
                  onChange={handleSettingChange}
                  placeholder="예: 192.168.1.0/24, 10.0.0.1"
                  className={`w-full p-2 border rounded ${darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'}`}
                />
              </div>
            )}
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

export default SecuritySettingsPanel;
