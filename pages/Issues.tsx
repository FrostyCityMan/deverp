import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Issue, Severity } from '../types';
import { AlertCircle, Filter, Plus } from 'lucide-react';

export const Issues: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.issue.getAll().then(setIssues);
  }, []);

  const getSeverityBadge = (severity: Severity) => {
    const styles = {
        [Severity.CRITICAL]: 'bg-red-100 text-red-700 border-red-200',
        [Severity.HIGH]: 'bg-orange-100 text-orange-700 border-orange-200',
        [Severity.MEDIUM]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        [Severity.LOW]: 'bg-slate-100 text-slate-700 border-slate-200',
    };
    return (
        <span className={`px-2 py-0.5 rounded border text-xs font-bold ${styles[severity]}`}>
            {severity}
        </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Issue Tracker</h1>
            <p className="text-slate-500">Track bugs and system incidents.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={18} /> Report Issue
        </button>
      </div>

      <div className="flex gap-4 items-center pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-500 text-sm bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm">
            <Filter size={16} />
            <span>Filter: All Status</span>
        </div>
        <input 
            type="text" 
            placeholder="Search issues..." 
            className="px-3 py-1.5 text-sm border border-slate-200 rounded bg-white w-64 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid gap-4">
        {issues.map(issue => (
            <div key={issue.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors group">
                <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                        <div className={`mt-1 ${issue.status === 'OPEN' ? 'text-red-500' : 'text-green-500'}`}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-mono text-xs text-slate-400">#{issue.id}</span>
                                <h3 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {issue.title}
                                </h3>
                                {getSeverityBadge(issue.severity)}
                            </div>
                            <div className="text-sm text-slate-500 flex items-center gap-4">
                                <span>Reporter: {issue.reporterName}</span>
                                <span>&bull;</span>
                                <span>Created: {issue.createdAt}</span>
                                <span>&bull;</span>
                                <span className="text-slate-800">Assignee: {issue.assigneeName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            issue.status === 'OPEN' ? 'bg-red-50 text-red-600' : 
                            issue.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-600' : 
                            'bg-slate-100 text-slate-600'
                        }`}>
                            {issue.status.replace('_', ' ')}
                        </span>
                        <p className="text-xs text-slate-400 mt-2">Due: {issue.dueDate}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
