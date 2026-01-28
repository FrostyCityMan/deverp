// User & Auth
export enum Role {
  ADMIN = 'ADMIN',
  PM = 'PM',
  DEVELOPER = 'DEVELOPER',
  TESTER = 'TESTER'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  department: string;
  avatarUrl?: string;
}

// Attendance
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  LEAVE = 'LEAVE',
  REMOTE = 'REMOTE',
  ABSENT = 'ABSENT'
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  checkIn: string | null; // HH:mm
  checkOut: string | null; // HH:mm
  status: AttendanceStatus;
  workHours: number;
}

// Leave
export enum LeaveType {
  ANNUAL = 'ANNUAL',
  HALF_MORNING = 'HALF_MORNING',
  HALF_AFTERNOON = 'HALF_AFTERNOON',
  SICK = 'SICK'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: ApprovalStatus;
  approverId?: string;
}

// Project & WBS
export interface Task {
  id: string;
  projectId: string;
  phaseId: string;
  name: string;
  assigneeId: string;
  assigneeName: string;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export interface Phase {
  id: string;
  projectId: string;
  name: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'HOLD';
  startDate: string;
  endDate: string;
  pmId: string;
}

// Issues
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Issue {
  id: string;
  title: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  severity: Severity;
  assigneeName: string;
  reporterName: string;
  dueDate: string;
  createdAt: string;
}

// Unit Test
export interface UnitTest {
  id: string;
  moduleId: string;
  caseName: string;
  scenario: string;
  inputData: string;
  expectedResult: string;
  actualResult?: string;
  passed?: boolean;
  executedBy?: string;
  executedAt?: string;
  attachmentUrl?: string;
}
