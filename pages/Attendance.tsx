import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AttendanceRecord } from '../types';
import { Clock, MapPin, LogIn, LogOut } from 'lucide-react';

export const Attendance: React.FC = () => {
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [todayStatus, setTodayStatus] = useState<AttendanceRecord | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await api.attendance.getHistory();
    setHistory(data);
    // Mock checking if checked in today
    const today = new Date().toISOString().split('T')[0];
    const found = data.find(d => d.date === today);
    if (found) setTodayStatus(found);
  };

  const handleCheckIn = async () => {
    const newRecord = await api.attendance.checkIn();
    setHistory([newRecord, ...history]);
    setTodayStatus(newRecord);
  };

  const handleCheckOut = async () => {
    // Mock update
    if(!todayStatus) return;
    const updated = { 
        ...todayStatus, 
        checkOut: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        workHours: 9 
    };
    setTodayStatus(updated);
    setHistory(history.map(h => h.id === updated.id ? updated : h));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PRESENT': return 'bg-green-100 text-green-700';
      case 'LATE': return 'bg-amber-100 text-amber-700';
      case 'ABSENT': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
            <p className="text-slate-500">Manage your daily check-ins and view history.</p>
        </div>
        <div className="flex gap-3">
            {!todayStatus ? (
                <button 
                    onClick={handleCheckIn}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <LogIn size={18} /> Check In
                </button>
            ) : (
                 <button 
                    onClick={handleCheckOut}
                    disabled={!!todayStatus.checkOut}
                    className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2.5 rounded-lg hover:bg-slate-900 transition-colors shadow-sm disabled:opacity-50"
                >
                    <LogOut size={18} /> {todayStatus.checkOut ? 'Checked Out' : 'Check Out'}
                </button>
            )}
        </div>
      </div>

      {/* Today's Status Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Today's Status</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />
                    <span>Seoul Office (HQ)</span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-3xl font-mono font-bold text-slate-900">
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-sm text-slate-500">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
             <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Check In</p>
                <p className="text-lg font-semibold text-slate-800">{todayStatus?.checkIn || '--:--'}</p>
             </div>
             <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Check Out</p>
                <p className="text-lg font-semibold text-slate-800">{todayStatus?.checkOut || '--:--'}</p>
             </div>
             <div>
                <p className="text-xs font-medium text-slate-500 uppercase">Work Hours</p>
                <p className="text-lg font-semibold text-slate-800">{todayStatus?.workHours ? `${todayStatus.workHours}h` : '-'}</p>
             </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">Recent History</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">In</th>
                        <th className="px-6 py-3">Out</th>
                        <th className="px-6 py-3">Total Hours</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {history.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                    {record.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{record.checkIn || '-'}</td>
                            <td className="px-6 py-4 text-slate-600">{record.checkOut || '-'}</td>
                            <td className="px-6 py-4 text-slate-600 font-medium">{record.workHours}h</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
