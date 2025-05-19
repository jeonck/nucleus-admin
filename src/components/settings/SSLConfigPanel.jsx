import React, { useState } from 'react';
import { Shield, Lock, Key, Save } from 'lucide-react';

const SSLConfigPanel = ({ darkMode }) => {
  const [settings, setSettings] = useState({
    enableSSL: true,
    sslMode: 'default',
    certificateType: 'self-signed',
    certificatePath: '/etc/nucleus/ssl/cert.pem',
    keyPath: '/etc/nucleus/ssl/key.pem',
    chainPath: '',
    redirectHttp: true,
    allowHttpForInternal: true,
    sslProtocols: ['TLSv1.2', 'TLSv1.3'],
  });

  // 설정 변경 핸들러
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // 프로토콜 선택 핸들러
  const handleProtocolChange = (protocol) => {
    const updatedProtocols = settings.sslProtocols.includes(protocol) 
      ? settings.sslProtocols.filter(p => p !== protocol)
      : [...settings.sslProtocols, protocol];
      
    setSettings({
      ...settings,
      sslProtocols: updatedProtocols
    });
  };

  // 설정 저장 핸들러
  const handleSaveSettings = () => {
    console.log('SSL 설정 저장:', settings);
    // 실제로는 여기서 API 호출
  };

  // 인증서 생성 핸들러
  const handleGenerateCertificate = () => {
    console.log('자체 서명 인증서 생성');
    // 실제로는 여기서 API 호출
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>SSL 설정</h3>
      
      <div className="space-y-4">
        {/* SSL 활성화 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableSSL"
            name="enableSSL"
            checked={settings.enableSSL}
            onChange={handleSettingChange}
            className="mr-2"
          />
          <label htmlFor="enableSSL" className="text-sm font-medium">SSL/TLS 암호화 활성화</label>
        </div>
        
        {settings.enableSSL && (
          <>
            {/* SSL 모드 */}
            <div>
              <label className="block text-xs font-medium mb-1">SSL 모드</label>
              <select
                name="sslMode"
                value={settings.sslMode}
                onChange={handleSettingChange}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              >
                <option value="default">기본 (권장)</option>
                <option value="compatibility">호환성 우선</option>
                <option value="modern">최신 (강력한 보안)</option>
                <option value="custom">커스텀</option>
              </select>
            </div>
            
            {/* 인증서 유형 */}
            <div>
              <label className="block text-xs font-medium mb-1">인증서 유형</label>
              <select
                name="certificateType"
                value={settings.certificateType}
                onChange={handleSettingChange}
                className={`w-full p-2 border rounded ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'}`}
              >
                <option value="self-signed">자체 서명 인증서</option>
                <option value="custom">커스텀 인증서</option>
                <option value="lets-encrypt">Let's Encrypt</option>
              </select>
            </div>
            
            {/* 인증서 파일 경로 */}
            {(settings.certificateType === 'self-signed' || settings.certificateType === 'custom') && (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium mb-1">인증서 파일 경로</label>
                  <input
                    type="text"
                    name="certificatePath"
                    value={settings.certificatePath}
                    onChange={handleSettingChange}
                    className={`w-full p-2 border rounded font-mono text-sm ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'}`}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium mb-1">키 파일 경로</label>
                  <input
                    type="text"
                    name="keyPath"
                    value={settings.keyPath}
                    onChange={handleSettingChange}
                    className={`w-full p-2 border rounded font-mono text-sm ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'}`}
                  />
                </div>
                
                {settings.certificateType === 'custom' && (
                  <div>
                    <label className="block text-xs font-medium mb-1">체인 파일 경로 (선택사항)</label>
                    <input
                      type="text"
                      name="chainPath"
                      value={settings.chainPath}
                      onChange={handleSettingChange}
                      className={`w-full p-2 border rounded font-mono text-sm ${darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300'}`}
                    />
                  </div>
                )}
                
                {settings.certificateType === 'self-signed' && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleGenerateCertificate}
                      className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      자체 서명 인증서 생성
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* HTTP 리다이렉션 */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="redirectHttp"
                  name="redirectHttp"
                  checked={settings.redirectHttp}
                  onChange={handleSettingChange}
                  className="mr-2"
                />
                <label htmlFor="redirectHttp" className="text-sm">HTTP를 HTTPS로 리다이렉션</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowHttpForInternal"
                  name="allowHttpForInternal"
                  checked={settings.allowHttpForInternal}
                  onChange={handleSettingChange}
                  className="mr-2"
                />
                <label htmlFor="allowHttpForInternal" className="text-sm">내부 네트워크에서 HTTP 허용</label>
              </div>
            </div>
            
            {/* SSL 프로토콜 */}
            {settings.sslMode === 'custom' && (
              <div>
                <label className="block text-xs font-medium mb-1">SSL 프로토콜</label>
                <div className="space-y-1">
                  {['TLSv1.1', 'TLSv1.2', 'TLSv1.3'].map(protocol => (
                    <div key={protocol} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`protocol-${protocol}`}
                        checked={settings.sslProtocols.includes(protocol)}
                        onChange={() => handleProtocolChange(protocol)}
                        className="mr-2"
                      />
                      <label htmlFor={`protocol-${protocol}`} className="text-sm">{protocol}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
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

export default SSLConfigPanel;
