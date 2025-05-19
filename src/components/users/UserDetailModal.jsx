import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UserDetailModal = ({ user, userGroups, onClose, onSave, darkMode }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    groups: []
  });

  // 사용자 데이터 초기화
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        groups: [...user.groups]
      });
    }
  }, [user]);

  // 입력 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // 그룹 체크박스 변경 핸들러
  const handleGroupChange = (groupName) => {
    if (userData.groups.includes(groupName)) {
      setUserData({
        ...userData,
        groups: userData.groups.filter(g => g !== groupName)
      });
    } else {
      setUserData({
        ...userData,
        groups: [...userData.groups, groupName]
      });
    }
  };

  // 저장 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

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

  // 모달 외부 스타일
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div 
        className={`w-full max-w-md p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">사용자 상세 정보</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
        
        {/* 사용자 정보 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'}`}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'}`}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">마지막 활동</label>
            <div className={`p-2 border rounded ${darkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-gray-100 border-gray-300'}`}>
              {formatDate(user.lastActive)}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">그룹</label>
            <div className={`p-3 border rounded space-y-1 ${darkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'border-gray-300'}`}>
              {userGroups.map((group, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userData.groups.includes(group.name)}
                    onChange={() => handleGroupChange(group.name)}
                    className="mr-2"
                  />
                  <span>{group.name} - {group.permissions}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`mr-2 px-4 py-2 rounded ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
