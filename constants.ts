import { AttendanceRecord, AttendanceStatus, ApprovalStatus, Issue, LeaveRequest, LeaveType, Phase, Project, Role, Severity, UnitTest, User } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  username: 'dev_senior',
  name: 'Kim Developer',
  role: Role.DEVELOPER,
  department: 'Backend Team 1',
  avatarUrl: 'https://picsum.photos/200/200'
};

export const ATTENDANCE_DATA: AttendanceRecord[] = [
  { id: 'a1', userId: 'u1', date: '2023-10-23', checkIn: '08:55', checkOut: '18:10', status: AttendanceStatus.PRESENT, workHours: 8.25 },
  { id: 'a2', userId: 'u1', date: '2023-10-24', checkIn: '09:10', checkOut: '18:30', status: AttendanceStatus.LATE, workHours: 8.3 },
  { id: 'a3', userId: 'u1', date: '2023-10-25', checkIn: '08:45', checkOut: '17:50', status: AttendanceStatus.PRESENT, workHours: 8.0 },
  { id: 'a4', userId: 'u1', date: '2023-10-26', checkIn: '09:00', checkOut: null, status: AttendanceStatus.PRESENT, workHours: 0 },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'l1', userId: 'u2', userName: 'Lee Manager', type: LeaveType.ANNUAL, startDate: '2023-11-01', endDate: '2023-11-03', reason: 'Family Trip', status: ApprovalStatus.APPROVED },
  { id: 'l2', userId: 'u1', userName: 'Kim Developer', type: LeaveType.HALF_AFTERNOON, startDate: '2023-10-30', endDate: '2023-10-30', reason: 'Hospital', status: ApprovalStatus.PENDING },
];

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'NextGen ERP Core', description: 'Core module refactoring for the new ERP system.', status: 'ACTIVE', startDate: '2023-09-01', endDate: '2024-03-31', pmId: 'u2' },
  { id: 'p2', name: 'Mobile App V2', description: 'React Native migration.', status: 'PLANNING', startDate: '2023-11-15', endDate: '2024-06-30', pmId: 'u3' },
];

export const PROJECT_WBS: Phase[] = [
  {
    id: 'ph1', projectId: 'p1', name: 'Phase 1: Analysis', tasks: [
      { id: 't1', projectId: 'p1', phaseId: 'ph1', name: 'Requirement Gathering', assigneeId: 'u2', assigneeName: 'Lee Manager', startDate: '2023-09-01', endDate: '2023-09-15', progress: 100, status: 'DONE' },
      { id: 't2', projectId: 'p1', phaseId: 'ph1', name: 'DB Schema Design', assigneeId: 'u1', assigneeName: 'Kim Developer', startDate: '2023-09-16', endDate: '2023-09-30', progress: 100, status: 'DONE' },
    ]
  },
  {
    id: 'ph2', projectId: 'p1', name: 'Phase 2: Development', tasks: [
      { id: 't3', projectId: 'p1', phaseId: 'ph2', name: 'Auth Module Implementation', assigneeId: 'u1', assigneeName: 'Kim Developer', startDate: '2023-10-01', endDate: '2023-10-20', progress: 80, status: 'IN_PROGRESS' },
      { id: 't4', projectId: 'p1', phaseId: 'ph2', name: 'Attendance API', assigneeId: 'u4', assigneeName: 'Park Junior', startDate: '2023-10-21', endDate: '2023-11-05', progress: 20, status: 'TODO' },
    ]
  }
];

export const ISSUES: Issue[] = [
  { id: 'i1', title: 'Login session timeout inconsistency', status: 'OPEN', severity: Severity.HIGH, assigneeName: 'Kim Developer', reporterName: 'Tester Choi', dueDate: '2023-10-28', createdAt: '2023-10-25' },
  { id: 'i2', title: 'Dashboard graph rendering error on Safari', status: 'IN_PROGRESS', severity: Severity.MEDIUM, assigneeName: 'Park Junior', reporterName: 'Lee Manager', dueDate: '2023-10-30', createdAt: '2023-10-24' },
  { id: 'i3', title: 'Update dependency versions', status: 'RESOLVED', severity: Severity.LOW, assigneeName: 'Kim Developer', reporterName: 'System', dueDate: '2023-10-20', createdAt: '2023-10-15' },
];

export const UNIT_TESTS: UnitTest[] = [
  { id: 'ut1', moduleId: 'Auth', caseName: 'Login Success', scenario: 'Valid credentials provided', inputData: 'user: admin, pass: 1234', expectedResult: '200 OK, Token returned', passed: true, executedBy: 'AutoRunner', executedAt: '2023-10-26 02:00' },
  { id: 'ut2', moduleId: 'Auth', caseName: 'Login Fail - Bad Password', scenario: 'Invalid password', inputData: 'user: admin, pass: xxxx', expectedResult: '401 Unauthorized', passed: true, executedBy: 'AutoRunner', executedAt: '2023-10-26 02:01' },
  { id: 'ut3', moduleId: 'Attendance', caseName: 'Check-in Duplicate', scenario: 'User checks in twice', inputData: 'userId: u1', expectedResult: '400 Bad Request', passed: false, actualResult: '500 Internal Server Error', executedBy: 'Kim Developer', executedAt: '2023-10-26 10:30', attachmentUrl: '#' },
];
