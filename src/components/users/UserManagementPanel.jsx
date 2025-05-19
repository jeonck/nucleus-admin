import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const UserManagementPanel = ({ 
  users, 
  userGroups,
  activeFilter,
  searchTerm,
  onSearch, 
  onFilter,
  onViewDetails,
  onAddUser,
  onEditUser,
  onDeleteUser,
  darkMode 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserGroups, setNewUserGroups] = useState(['users']);
  
  // 사용자 추가 제출 핸들러
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newUserName.trim() && newUserEmail.trim()) {
      onAddUser({
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        groups: newUserGroups
      });
      setNewUserName('');
      setNewUserEmail('');
      setNewUserGroups(['users']);
      setShowAddForm(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    setNewUserName('');
    setNewUserEmail('');
    setNewUserGroups(['users']);
    setShowAddForm(false);
  };

  // 그룹 체크박스 변경 핸들러
  const handleGroupChange = (groupName) => {
    if (newUserGroups.includes(groupName)) {
      setNewUserGroups(newUserGroups.filter(g => g !== groupName));
    } else {
      setNewUserGroups([...newUserGroups, groupName]);
    }
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

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>사용자 관리</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          disabled={showAddForm}
        >
          <Plus size={16} className="mr-1" /> 새 사용자
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-4">
        <div className="flex mb-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="사용자 검색..." 
              className={`w-full p-2 pl-8 border ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 placeholder-gray-500'} rounded`}
            />
            <div className="absolute left-2 top-2.5">
              <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => onFilter('all')}
            className={`px-2 py-1 text-xs rounded-full ${
              activeFilter === 'all'
                ? 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            모든 사용자
          </button>
          {userGroups.map((group, index) => (
            <button
              key={index}
              onClick={() => onFilter(group.name)}
              className={`px-2 py-1 text-xs rounded-full ${
                activeFilter === group.name
                  ? 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* 사용자 추가 폼 */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className={`mb-4 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-semibold mb-2">새 사용자 추가</h4>
          <div className="mb-2">
            <label className="block text-xs mb-1">이름</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="사용자 이름"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs mb-1">이메일</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="사용자 이메일"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs mb-1">그룹</label>
            <div className="space-y-1">
              {userGroups.map((group, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newUserGroups.includes(group.name)}
                    onChange={() => handleGroupChange(group.name)}
                    className="mr-2"
                  />
                  <span>{group.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className={`mr-2 px-3 py-1 rounded ${darkMode 
                ? 'bg-gray-600 hover:bg-gray-500' 
                : 'bg-gray-300 hover:bg-gray-400'}`}
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              추가
            </button>
          </div>
        </form>
      )}

      {/* 사용자 목록 */}
      <div className="overflow-y-auto max-h-96">
        {users.length === 0 ? (
          <div className={`p-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchTerm ? '검색 결과가 없습니다.' : '사용자가 없습니다.'}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>이름</th>
                <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>이메일</th>
                <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>그룹</th>
                <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>마지막 활동</th>
                <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>작업</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {users.map((user) => (
                <tr key={user.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className={`p-3 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</td>
                  <td className={`p-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</td>
                  <td className={`p-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {user.groups.join(', ')}
                  </td>
                  <td className={`p-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {formatDate(user.lastActive)}
                  </td>
                  <td className="p-3 text-sm font-medium">
                    <button
                      onClick={() => onViewDetails(user)}
                      className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className={darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagementPanel;
