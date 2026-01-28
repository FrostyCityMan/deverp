import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ApprovalStatus, LeaveRequest, LeaveType } from '../types';
import { CalendarDays, PlusCircle } from 'lucide-react';

const leaveTypeLabels: Record<LeaveType, string> = {
  [LeaveType.ANNUAL]: '연차',
  [LeaveType.HALF_MORNING]: '오전 반차',
  [LeaveType.HALF_AFTERNOON]: '오후 반차',
  [LeaveType.SICK]: '병가'
};

const statusStyles: Record<ApprovalStatus, string> = {
  [ApprovalStatus.PENDING]: 'bg-amber-100 text-amber-700',
  [ApprovalStatus.APPROVED]: 'bg-green-100 text-green-700',
  [ApprovalStatus.REJECTED]: 'bg-red-100 text-red-700'
};

export const Leave: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [form, setForm] = useState({
    type: LeaveType.ANNUAL,
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    api.leave.getRequests().then(setRequests);
  }, []);

  const submitRequest = async () => {
    const created = await api.leave.createRequest({
      ...form,
      userId: 'u_demo',
      userName: '관리자'
    });
    setRequests([created, ...requests]);
    setForm({
      type: LeaveType.ANNUAL,
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">연차 관리</h1>
          <p className="text-slate-500">연차/반차/병가 신청 및 승인 현황을 관리합니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <CalendarDays size={18} /> 연차 신청
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value as LeaveType })}
          >
            {Object.values(LeaveType).map(type => (
              <option key={type} value={type}>{leaveTypeLabels[type]}</option>
            ))}
          </select>
          <input
            type="date"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            value={form.startDate}
            onChange={(event) => setForm({ ...form, startDate: event.target.value })}
          />
          <input
            type="date"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            value={form.endDate}
            onChange={(event) => setForm({ ...form, endDate: event.target.value })}
          />
          <input
            type="text"
            placeholder="사유"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            value={form.reason}
            onChange={(event) => setForm({ ...form, reason: event.target.value })}
          />
        </div>
        <button
          onClick={submitRequest}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          <PlusCircle size={16} /> 신청 등록
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">최근 신청 내역</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left">신청자</th>
              <th className="px-6 py-3 text-left">기간</th>
              <th className="px-6 py-3 text-left">유형</th>
              <th className="px-6 py-3 text-left">상태</th>
              <th className="px-6 py-3 text-left">사유</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map(request => (
              <tr key={request.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{request.userName}</td>
                <td className="px-6 py-4 text-slate-600">{request.startDate} ~ {request.endDate}</td>
                <td className="px-6 py-4 text-slate-600">{leaveTypeLabels[request.type]}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{request.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
