import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  CalendarDays, 
  Briefcase, 
  AlertCircle, 
  CheckSquare, 
  LogOut, 
  Menu,
  X,
  Bell
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Attendance', path: '/attendance', icon: Clock },
    { label: 'Leave Mgmt', path: '/leave', icon: CalendarDays },
    { label: 'Projects / WBS', path: '/projects', icon: Briefcase },
    { label: 'Issue Tracker', path: '/issues', icon: AlertCircle },
    { label: 'Unit Tests', path: '/tests', icon: CheckSquare },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            DevERP
          </span>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.role}</p>
                </div>
            </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
            <button 
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
            >
                <LogOut size={20} />
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             <button className="relative text-slate-400 hover:text-slate-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            {children}
        </main>
      </div>
    </div>
  );
};
