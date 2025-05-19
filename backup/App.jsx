import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 레이아웃 컴포넌트
import Layout from './components/shared/Layout';

// 페이지 컴포넌트
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Users from './pages/Users';
import DataManagement from './pages/DataManagement';
import Logs from './pages/Logs';
import Security from './pages/Security';
import Backup from './pages/Backup';
import Settings from './pages/Settings';

// 컨텍스트 제공자
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/users" element={<Users />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/security" element={<Security />} />
            <Route path="/backup" element={<Backup />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppContextProvider>
  );
}

export default App;
