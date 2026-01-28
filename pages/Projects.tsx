import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Phase, Project } from '../types';
import { FolderOpen, Calendar, ChevronDown, ChevronRight, UserCircle } from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [wbs, setWBS] = useState<Phase[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());

  useEffect(() => {
    api.project.getAll().then(data => {
        setProjects(data);
        if(data.length > 0) setSelectedProject(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      api.project.getWBS(selectedProject).then(data => {
          setWBS(data);
          // Expand all by default
          setExpandedPhases(new Set(data.map(p => p.id)));
      });
    }
  }, [selectedProject]);

  const togglePhase = (id: string) => {
    const newSet = new Set(expandedPhases);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedPhases(newSet);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DONE': return 'bg-green-500';
      case 'IN_PROGRESS': return 'bg-blue-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Management</h1>
          <p className="text-slate-500">Work Breakdown Structure (WBS)</p>
        </div>
        <select 
            className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={selectedProject || ''}
            onChange={(e) => setSelectedProject(e.target.value)}
        >
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
        {/* WBS Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-5">Task Name</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-2">Schedule</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2">Progress</div>
        </div>

        {/* WBS Content - Scrollable */}
        <div className="overflow-y-auto flex-1">
            {wbs.map(phase => (
                <div key={phase.id} className="border-b border-slate-100 last:border-0">
                    {/* Phase Header */}
                    <div 
                        className="flex items-center gap-2 px-6 py-3 bg-slate-50/50 hover:bg-slate-100 cursor-pointer transition-colors"
                        onClick={() => togglePhase(phase.id)}
                    >
                        {expandedPhases.has(phase.id) ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>}
                        <FolderOpen size={16} className="text-indigo-500" />
                        <span className="font-semibold text-slate-800 text-sm">{phase.name}</span>
                    </div>

                    {/* Tasks List */}
                    {expandedPhases.has(phase.id) && (
                        <div>
                            {phase.tasks.map(task => (
                                <div key={task.id} className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-slate-50 items-center text-sm border-t border-slate-100 first:border-0">
                                    <div className="col-span-5 pl-8 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                                        <span className="text-slate-700 truncate">{task.name}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2 text-slate-600">
                                        <UserCircle size={16} />
                                        <span className="truncate">{task.assigneeName}</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col text-xs text-slate-500">
                                        <span>{task.startDate}</span>
                                        <span>{task.endDate}</span>
                                    </div>
                                    <div className="col-span-1 text-center">
                                        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 border border-slate-200 text-slate-600">
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${task.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium w-8 text-right">{task.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
