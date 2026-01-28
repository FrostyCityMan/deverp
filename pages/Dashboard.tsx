import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, CheckCircle2, AlertOctagon, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 8.5 },
  { name: 'Tue', hours: 7.2 },
  { name: 'Wed', hours: 9.0 },
  { name: 'Thu', hours: 8.0 },
  { name: 'Fri', hours: 8.5 },
];

const issueData = [
  { name: 'Open', value: 4, color: '#ef4444' },
  { name: 'In Progress', value: 3, color: '#f59e0b' },
  { name: 'Done', value: 12, color: '#22c55e' },
];

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Hours" value="38.5h" icon={Clock} color="bg-blue-500" />
        <StatCard title="Pending Tasks" value="12" icon={CheckCircle2} color="bg-emerald-500" />
        <StatCard title="Active Issues" value="3" icon={AlertOctagon} color="bg-red-500" />
        <StatCard title="Team Members" value="8" icon={Users} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Hours Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Weekly Work Hours</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issue Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Issue Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {issueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {issueData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
