import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { userGroupsData, usersData } from '../data/dashboardData';
import UserGroupsPanel from '../components/users/UserGroupsPanel';
import UserManagementPanel from '../components/users/UserManagementPanel';
import UserDetailModal from '../components/users/UserDetailModal';

const Users = () => {
  const { darkMode, addNotification } = useAppContext();
  const [userGroups, setUserGroups] = useState(userGroupsData);
  const [users, setUsers] = useState(usersData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // 그룹 관련 핸들러
  const handleAddGroup = (newGroup) => {
    setUserGroups([...userGroups, newGroup]);
    addNotification({
      type: 'success',
      message: `${newGroup.name} 그룹이 추가되었습니다.`
    });
  };

  const handleEditGroup = (groupName, updatedGroup) => {
    setUserGroups(userGroups.map(group => 
      group.name === groupName ? updatedGroup : group
    ));
    addNotification({
      type: 'success',
      message: `${groupName} 그룹이 업데이트되었습니다.`
    });
  };

  const handleDeleteGroup = (groupName) => {
    setUserGroups(userGroups.filter(group => group.name !== groupName));
    addNotification({
      type: 'success',
      message: `${groupName} 그룹이 삭제되었습니다.`
    });
  };

  // 사용자 관련 핸들러
  const handleSearchUsers = (term) => {
    setSearchTerm(term);
  };

  const handleFilterUsers = (filter) => {
    setActiveFilter(filter);
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1, lastActive: new Date().toISOString() }]);
    addNotification({
      type: 'success',
      message: `${newUser.name} 사용자가 추가되었습니다.`
    });
  };

  const handleEditUser = (userId, updatedUser) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updatedUser } : user
    ));
    addNotification({
      type: 'success',
      message: `${updatedUser.name || 'ID: ' + userId} 사용자 정보가 업데이트되었습니다.`
    });
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    addNotification({
      type: 'success',
      message: `${userToDelete.name} 사용자가 삭제되었습니다.`
    });
  };

  // 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    // 검색어 필터링
    const matchesSearch = searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 그룹 필터링
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter && user.groups.includes(activeFilter));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserGroupsPanel 
          userGroups={userGroups} 
          onAddGroup={handleAddGroup}
          onEditGroup={handleEditGroup}
          onDeleteGroup={handleDeleteGroup}
          darkMode={darkMode}
        />
        
        <UserManagementPanel 
          users={filteredUsers}
          userGroups={userGroups}
          activeFilter={activeFilter}
          searchTerm={searchTerm}
          onSearch={handleSearchUsers}
          onFilter={handleFilterUsers}
          onViewDetails={handleViewUserDetails}
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          darkMode={darkMode}
        />
      </div>
      
      {/* 사용자 상세 정보 모달 */}
      {showUserModal && selectedUser && (
        <UserDetailModal 
          user={selectedUser}
          userGroups={userGroups}
          onClose={() => setShowUserModal(false)}
          onSave={(updatedUser) => {
            handleEditUser(selectedUser.id, updatedUser);
            setShowUserModal(false);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Users;
