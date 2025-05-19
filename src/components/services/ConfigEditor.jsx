import React, { useState } from 'react';

const ConfigEditor = ({ onSave, darkMode }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [configContent, setConfigContent] = useState('');
  
  // 설정 파일 목록
  const configFiles = [
    { id: 'nucleus.env', name: 'nucleus.env' },
    { id: 'nucleus-stack.env', name: 'nucleus-stack.env' },
    { id: 'nucleus-stack-ssl.yml', name: 'nucleus-stack-ssl.yml' },
  ];

  // 설정 파일 선택 핸들러
  const handleFileSelect = (e) => {
    const fileName = e.target.value;
    setSelectedFile(fileName);
    
    // 실제 구현에서는 API 호출을 통해 파일 내용 가져오기
    // 여기서는 예시 데이터로 대체
    if (fileName) {
      let content = '';
      switch (fileName) {
        case 'nucleus.env':
          content = `# Nucleus 환경 변수 설정\nDATA_ROOT=/var/lib/omni/\nDOCKER_GROUP=docker\nNUCLEUS_PORT=3333\nSSL_ENABLED=true\nADMIN_USER=omniverse\n# 마지막 수정: 2023-03-10`;
          break;
        case 'nucleus-stack.env':
          content = `# Nucleus Docker 스택 환경 변수\nCOMPOSE_PROJECT_NAME=nucleus\nIMAGE_VERSION=latest\nNETWORK_MODE=bridge\nRESTART_POLICY=unless-stopped\n# 마지막 수정: 2023-03-09`;
          break;
        case 'nucleus-stack-ssl.yml':
          content = `version: '3'\nservices:\n  nucleus-core:\n    image: nvidia/nucleus-core:latest\n    restart: unless-stopped\n    ports:\n      - "3333:3333"\n    volumes:\n      - /var/lib/omni/nucleus-data:/data\n  nginx:\n    image: nginx:latest\n    restart: unless-stopped\n    ports:\n      - "443:443"\n    volumes:\n      - ./ssl:/etc/nginx/ssl\n    depends_on:\n      - nucleus-core\n# 마지막 수정: 2023-03-08`;
          break;
        default:
          content = '';
      }
      setConfigContent(content);
    } else {
      setConfigContent('');
    }
  };

  // 저장 핸들러
  const handleSave = () => {
    if (selectedFile && configContent) {
      onSave(selectedFile, configContent);
    }
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>설정 관리</h3>
      
      <div>
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>설정 파일 편집</p>
        <div className="mb-4">
          <select 
            value={selectedFile}
            onChange={handleFileSelect}
            className={`w-full p-2 mb-2 border ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-700'} rounded`}
          >
            <option value="">설정 파일 선택...</option>
            {configFiles.map((file) => (
              <option key={file.id} value={file.id}>{file.name}</option>
            ))}
          </select>
          
          <textarea 
            value={configContent}
            onChange={(e) => setConfigContent(e.target.value)}
            className={`w-full h-64 p-2 font-mono text-sm border ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-700'} rounded`}
            placeholder="설정 파일 내용이 여기에 표시됩니다."
            disabled={!selectedFile}
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={!selectedFile || !configContent}
            className={`px-4 py-2 rounded ${
              !selectedFile || !configContent
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            변경사항 저장
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          주의: 설정 파일 변경은 해당 서비스 또는 전체 스택의 재시작이 필요할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ConfigEditor;
