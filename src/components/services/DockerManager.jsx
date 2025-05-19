import React, { useState } from 'react';

const DockerManager = ({ onExecuteCommand, onRestartContainer, onRestartStack, darkMode }) => {
  const [dockerCommand, setDockerCommand] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  
  // Docker 컨테이너 목록
  const containers = [
    { id: 'nucleus-core', name: 'nucleus-core' },
    { id: 'nucleus-cache', name: 'nucleus-cache' },
    { id: 'nucleus-auth', name: 'nucleus-auth' },
    { id: 'nucleus-web', name: 'nucleus-web' },
    { id: 'nucleus-db', name: 'nucleus-db' },
  ];

  // Docker 명령어 실행 핸들러
  const handleExecute = (e) => {
    e.preventDefault();
    if (dockerCommand.trim()) {
      onExecuteCommand(dockerCommand);
      setDockerCommand('');
    }
  };
  
  // 컨테이너 재시작 핸들러
  const handleRestartContainer = (e) => {
    e.preventDefault();
    if (selectedContainer) {
      onRestartContainer(selectedContainer);
    }
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Docker 컨테이너 관리</h3>
      
      <div className="mb-4">
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Docker 명령어 실행</p>
        <form onSubmit={handleExecute} className="flex">
          <input 
            type="text" 
            value={dockerCommand}
            onChange={(e) => setDockerCommand(e.target.value)}
            placeholder="docker ps -a" 
            className={`flex-1 p-2 border ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 text-gray-700'} rounded-l`}
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            실행
          </button>
        </form>
      </div>
      
      <div className="mb-4">
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Docker 컨테이너 재시작</p>
        <form onSubmit={handleRestartContainer} className="flex mb-2">
          <select 
            value={selectedContainer}
            onChange={(e) => setSelectedContainer(e.target.value)}
            className={`flex-1 p-2 border ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-700'} rounded-l`}
          >
            <option value="">컨테이너 선택...</option>
            {containers.map((container) => (
              <option key={container.id} value={container.id}>{container.name}</option>
            ))}
          </select>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
            disabled={!selectedContainer}
          >
            재시작
          </button>
        </form>
      </div>
      
      <button 
        onClick={onRestartStack} 
        className={`w-full py-2 px-4 rounded ${darkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
      >
        전체 Docker 스택 재시작
      </button>
      
      <div className="mt-4">
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          주의: Docker 스택 재시작은 모든 서비스를 일시적으로 중단시킵니다. 
          필요한 경우에만 사용하세요.
        </p>
      </div>
    </div>
  );
};

export default DockerManager;
