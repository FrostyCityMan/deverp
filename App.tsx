import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Projects } from './pages/Projects';
import { Issues } from './pages/Issues';
import { UnitTests } from './pages/UnitTests';
import { Leave } from './pages/Leave';
import { User } from './types';

const App: React.FC = () => {
  // In a real app, we'd check localStorage/cookie here
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} 
        />
        
        <Route
          path="/*"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/issues" element={<Issues />} />
                  <Route path="/tests" element={<UnitTests />} />
                  <Route path="/leave" element={<Leave />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
