import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';

const UserGroupsPanel = ({ userGroups, onAddGroup, onEditGroup, onDeleteGroup, darkMode }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGroupName, setEditingGroupName] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupPermissions, setNewGroupPermissions] = useState('');

  // 그룹 추가 제출 핸들러
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newGroupName.trim() && newGroupPermissions.trim()) {
      onAddGroup({
        name: newGroupName.trim(),
        members: 0,
        permissions: newGroupPermissions.trim()
      });
      setNewGroupName('');
      setNewGroupPermissions('');
      setShowAddForm(false);
    }
  };

  // 그룹 편집 제출 핸들러
  const handleEditSubmit = (e, originalName) => {
    e.preventDefault();
    if (newGroupName.trim() && newGroupPermissions.trim()) {
      onEditGroup(originalName, {
        name: newGroupName.trim(),
        members: userGroups.find(g => g.name === originalName)?.members || 0,
        permissions: newGroupPermissions.trim()
      });
      setNewGroupName('');
      setNewGroupPermissions('');
      setEditingGroupName(null);
    }
  };

  // 편집 시작 핸들러
  const handleStartEdit = (group) => {
    setNewGroupName(group.name);
    setNewGroupPermissions(group.permissions);
    setEditingGroupName(group.name);
    setShowAddForm(false);
  };

  // 취소 핸들러
  const handleCancel = () => {
    setNewGroupName('');
    setNewGroupPermissions('');
    setShowAddForm(false);
    setEditingGroupName(null);
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>사용자 그룹</h3>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingGroupName(null);
          }}
          className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          disabled={showAddForm}
        >
          <Plus size={16} className="mr-1" /> 새 그룹
        </button>
      </div>

      {/* 그룹 추가 폼 */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className={`mb-4 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className="text-sm font-semibold mb-2">새 그룹 추가</h4>
          <div className="mb-2">
            <label className="block text-xs mb-1">그룹명</label>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="새 그룹 이름"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs mb-1">권한</label>
            <input
              type="text"
              value={newGroupPermissions}
              onChange={(e) => setNewGroupPermissions(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="그룹 권한 설명"
              required
            />
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

      {/* 그룹 편집 폼 */}
      {editingGroupName && (
        <form 
          onSubmit={(e) => handleEditSubmit(e, editingGroupName)} 
          className={`mb-4 p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <h4 className="text-sm font-semibold mb-2">그룹 편집</h4>
          <div className="mb-2">
            <label className="block text-xs mb-1">그룹명</label>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="그룹 이름"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs mb-1">권한</label>
            <input
              type="text"
              value={newGroupPermissions}
              onChange={(e) => setNewGroupPermissions(e.target.value)}
              className={`w-full p-2 border rounded ${darkMode 
                ? 'bg-gray-600 border-gray-500 text-white' 
                : 'border-gray-300'}`}
              placeholder="그룹 권한 설명"
              required
            />
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
              저장
            </button>
          </div>
        </form>
      )}

      {/* 그룹 목록 */}
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>그룹명</th>
              <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>구성원 수</th>
              <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>권한</th>
              <th className={`p-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>작업</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {userGroups.map((group, index) => (
              <tr key={index} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                <td className={`p-3 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{group.name}</td>
                <td className={`p-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{group.members}명</td>
                <td className={`p-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{group.permissions}</td>
                <td className="p-3 text-sm font-medium">
                  <button
                    onClick={() => handleStartEdit(group)}
                    className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'}`}
                    disabled={editingGroupName !== null || showAddForm}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteGroup(group.name)}
                    className={darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}
                    disabled={editingGroupName !== null || showAddForm}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserGroupsPanel;
