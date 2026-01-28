import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { UnitTest } from '../types';
import { FileText, UploadCloud, CheckCircle, XCircle, Paperclip } from 'lucide-react';

export const UnitTests: React.FC = () => {
  const [tests, setTests] = useState<UnitTest[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    api.test.getAll().then(setTests);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, testId: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingId(testId);
      await api.test.uploadResult(e.target.files[0], testId);
      setUploadingId(null);
      alert(`File uploaded for test ${testId}`);
    }
  };

  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-2xl font-bold text-slate-900">Unit Test Management</h1>
            <p className="text-slate-500">Execution history and evidence management.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Module / Case</th>
                        <th className="px-6 py-3">Scenario</th>
                        <th className="px-6 py-3">Execution Info</th>
                        <th className="px-6 py-3">Evidence</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {tests.map(test => (
                        <tr key={test.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                                {test.passed ? (
                                    <div className="flex items-center gap-1 text-green-600 font-medium">
                                        <CheckCircle size={16} /> Pass
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-red-600 font-medium">
                                        <XCircle size={16} /> Fail
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{test.caseName}</div>
                                <div className="text-xs text-slate-500 bg-slate-100 inline-block px-1.5 py-0.5 rounded mt-1">{test.moduleId}</div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                                <p className="truncate text-slate-600" title={test.scenario}>{test.scenario}</p>
                                <p className="text-xs text-slate-400 mt-1">Exp: {test.expectedResult}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-slate-900">{test.executedBy}</div>
                                <div className="text-xs text-slate-500">{test.executedAt}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {test.attachmentUrl && test.attachmentUrl !== '#' ? (
                                        <a href="#" className="text-indigo-600 hover:underline flex items-center gap-1">
                                            <FileText size={14} /> Log.txt
                                        </a>
                                    ) : (
                                        <label className="cursor-pointer group relative">
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                onChange={(e) => handleFileUpload(e, test.id)}
                                                disabled={uploadingId === test.id}
                                            />
                                            <div className={`p-2 rounded-full bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors ${uploadingId === test.id ? 'animate-pulse' : ''}`}>
                                                {uploadingId === test.id ? <UploadCloud size={16} /> : <Paperclip size={16} />}
                                            </div>
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Upload Evidence
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
