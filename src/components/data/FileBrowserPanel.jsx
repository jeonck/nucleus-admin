import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Upload, 
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Search
} from 'lucide-react';

const FileBrowserPanel = ({ darkMode }) => {
  // 파일 시스템 데이터
  const initialFileSystem = {
    name: 'root',
    type: 'folder',
    children: [
      {
        name: 'nucleus-data',
        type: 'folder',
        children: [
          { name: 'assets', type: 'folder', children: [
            { name: 'model1.usd', type: 'file', size: '45.2 MB', modified: '2023-03-10T15:30:45' },
            { name: 'texture1.png', type: 'file', size: '8.7 MB', modified: '2023-03-10T15:30:45' }
          ]},
          { name: 'scenes', type: 'folder', children: [
            { name: 'scene1.usd', type: 'file', size: '128.5 MB', modified: '2023-03-09T11:20:33' }
          ]},
          { name: 'config.json', type: 'file', size: '4.2 KB', modified: '2023-03-08T09:15:22' }
        ]
      },
      {
        name: 'nucleus-cache',
        type: 'folder',
        children: [
          { name: 'temp', type: 'folder', children: [] },
          { name: 'downloads', type: 'folder', children: [
            { name: 'asset_download_log.txt', type: 'file', size: '256 KB', modified: '2023-03-10T16:45:12' }
          ]}
        ]
      },
      {
        name: 'nucleus-logs',
        type: 'folder',
        children: [
          { name: 'system.log', type: 'file', size: '1.2 MB', modified: '2023-03-10T16:59:59' },
          { name: 'access.log', type: 'file', size: '4.5 MB', modified: '2023-03-10T16:59:59' },
          { name: 'error.log', type: 'file', size: '350 KB', modified: '2023-03-10T15:45:33' }
        ]
      }
    ]
  };

  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [expandedFolders, setExpandedFolders] = useState(['root']);
  const [currentPath, setCurrentPath] = useState(['root']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 폴더 확장/축소 토글
  const toggleFolder = (path) => {
    if (expandedFolders.includes(path)) {
      setExpandedFolders(expandedFolders.filter(folder => folder !== path && !folder.startsWith(`${path}/`)));
    } else {
      setExpandedFolders([...expandedFolders, path]);
    }
  };

  // 아이템 선택
  const selectItem = (item, path) => {
    setSelectedItem({ ...item, path });
  };

  // 현재 경로에 있는 폴더 내용 가져오기
  const getCurrentFolderContents = () => {
    let current = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.children.find(child => child.name === currentPath[i] && child.type === 'folder');
      if (folder) {
        current = folder;
      } else {
        return [];
      }
    }
    return current.children || [];
  };

  // 현재 경로 문자열
  const currentPathString = '/' + currentPath.slice(1).join('/');

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // 파일 크기 단위 변환 함수
  const formatFileSize = (sizeString) => {
    return sizeString;
  };

  // 검색 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 폴더로 이동
  const navigateToFolder = (folder) => {
    if (folder.type === 'folder') {
      const newPath = [...currentPath, folder.name];
      setCurrentPath(newPath);
      if (!expandedFolders.includes(newPath.join('/'))) {
        toggleFolder(newPath.join('/'));
      }
    }
  };

  // 상위 폴더로 이동
  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  // 파일 아이콘 가져오기
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    // 확장자에 따른 아이콘 반환
    return <FileText size={18} />;
  };

  // 재귀적 폴더 렌더링 함수
  const renderFolder = (folder, depth = 0, parentPath = 'root') => {
    const path = parentPath === 'root' && folder.name === 'root'
      ? 'root'
      : `${parentPath}/${folder.name}`;
    
    const isExpanded = expandedFolders.includes(path);
    const paddingLeft = depth * 16 + 'px';
    const isSelected = selectedItem && selectedItem.path === path;
    
    const hasMatchingChildren = folder.children && folder.children.some(child => 
      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child.type === 'folder' && hasMatchingChildren(child))
    );
    
    // 검색어가 있고 현재 폴더나 그 하위에 검색어가 포함된 항목이 없으면 표시하지 않음
    if (searchTerm && !folder.name.toLowerCase().includes(searchTerm.toLowerCase()) && !hasMatchingChildren) {
      return null;
    }
    
    return (
      <div key={path}>
        <div 
          className={`flex items-center py-1 px-2 rounded cursor-pointer ${
            isSelected 
              ? (darkMode ? 'bg-blue-700' : 'bg-blue-100') 
              : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
          }`}
          style={{ paddingLeft }}
          onClick={() => selectItem(folder, path)}
          onDoubleClick={() => folder.type === 'folder' && navigateToFolder(folder)}
        >
          {folder.type === 'folder' && (
            <span 
              className="mr-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(path);
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          <span className="mr-2">
            {folder.type === 'folder' ? <Folder size={18} /> : getFileIcon(folder.name)}
          </span>
          <span className="flex-1 truncate">{folder.name}</span>
        </div>
        
        {isExpanded && folder.children && (
          <div>
            {folder.children.map(child => 
              child.type === 'folder' 
                ? renderFolder(child, depth + 1, path)
                : renderFile(child, depth + 1, path)
            )}
          </div>
        )}
      </div>
    );
  };
  
  // 파일 렌더링 함수
  const renderFile = (file, depth, parentPath) => {
    const path = `${parentPath}/${file.name}`;
    const paddingLeft = depth * 16 + 'px';
    const isSelected = selectedItem && selectedItem.path === path;
    
    // 검색어가 있고 파일명에 검색어가 포함되지 않으면 표시하지 않음
    if (searchTerm && !file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return null;
    }
    
    return (
      <div 
        key={path}
        className={`flex items-center py-1 px-2 rounded cursor-pointer ${
          isSelected 
            ? (darkMode ? 'bg-blue-700' : 'bg-blue-100') 
            : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
        }`}
        style={{ paddingLeft }}
        onClick={() => selectItem(file, path)}
      >
        <span className="mr-1 invisible">
          <ChevronRight size={16} />
        </span>
        <span className="mr-2">
          {getFileIcon(file.name)}
        </span>
        <span className="flex-1 truncate">{file.name}</span>
      </div>
    );
  };

  return (
    <div className={`rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      {/* 상단 툴바 */}
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>파일 브라우저</h3>
        </div>
        <div className="flex space-x-2">
          <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="새로고침">
            <RefreshCw size={18} />
          </button>
          <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="업로드">
            <Upload size={18} />
          </button>
          <button 
            className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} 
            title="다운로드"
            disabled={!selectedItem || selectedItem.type === 'folder'}
          >
            <Download size={18} className={!selectedItem || selectedItem.type === 'folder' ? 'opacity-50' : ''} />
          </button>
          <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} title="새 폴더">
            <Plus size={18} />
          </button>
          <button 
            className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} 
            title="삭제"
            disabled={!selectedItem}
          >
            <Trash2 size={18} className={!selectedItem ? 'opacity-50' : ''} />
          </button>
        </div>
      </div>
      
      {/* 경로 및 검색 */}
      <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 flex items-center">
          <button 
            onClick={navigateUp}
            className={`p-1 rounded mr-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            disabled={currentPath.length <= 1}
          >
            <ChevronLeft size={18} className={currentPath.length <= 1 ? 'opacity-50' : ''} />
          </button>
          <div className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {currentPathString}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="파일 검색..."
            className={`pl-8 pr-2 py-1 border rounded ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 placeholder-gray-500'}`}
          />
          <Search size={16} className="absolute left-2 top-2" />
        </div>
      </div>
      
      {/* 파일 브라우저 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* 폴더 트리 */}
        <div className={`border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-2 overflow-auto h-96`}>
          {renderFolder(fileSystem)}
        </div>
        
        {/* 현재 폴더 내용 */}
        <div className="md:col-span-2 p-2 overflow-auto h-96">
          <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>이름</th>
                <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>크기</th>
                <th className={`px-3 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>수정 날짜</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {getCurrentFolderContents().map((item, index) => (
                <tr 
                  key={index}
                  className={`cursor-pointer ${
                    selectedItem && selectedItem.name === item.name
                      ? (darkMode ? 'bg-blue-700' : 'bg-blue-100')
                      : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                  }`}
                  onClick={() => selectItem(item, [...currentPath, item.name].join('/'))}
                  onDoubleClick={() => item.type === 'folder' && navigateToFolder(item)}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">
                        {item.type === 'folder' ? <Folder size={18} /> : getFileIcon(item.name)}
                      </span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className={`px-3 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {item.type === 'folder' ? '--' : formatFileSize(item.size)}
                  </td>
                  <td className={`px-3 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {item.modified ? formatDate(item.modified) : '--'}
                  </td>
                </tr>
              ))}
              
              {getCurrentFolderContents().length === 0 && (
                <tr>
                  <td colSpan="3" className={`px-3 py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchTerm ? '검색 결과가 없습니다.' : '이 폴더는 비어 있습니다.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 선택된 항목 정보 */}
      {selectedItem && (
        <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h4 className="text-sm font-semibold mb-1">선택된 항목 정보</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>이름: </span>
              <span>{selectedItem.name}</span>
            </div>
            <div>
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>유형: </span>
              <span>{selectedItem.type === 'folder' ? '폴더' : '파일'}</span>
            </div>
            {selectedItem.type === 'file' && (
              <>
                <div>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>크기: </span>
                  <span>{formatFileSize(selectedItem.size)}</span>
                </div>
                <div>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>수정 날짜: </span>
                  <span>{selectedItem.modified ? formatDate(selectedItem.modified) : '--'}</span>
                </div>
              </>
            )}
            <div className="col-span-2">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>경로: </span>
              <span>{selectedItem.path.replace('root', '')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileBrowserPanel;
