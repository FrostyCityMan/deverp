import { ATTENDANCE_DATA, ISSUES, LEAVE_REQUESTS, PROJECT_WBS, PROJECTS, UNIT_TESTS, MOCK_USER } from '../constants';
import { AttendanceRecord, Issue, LeaveRequest, Phase, Project, UnitTest, User } from '../types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (username: string, password: string): Promise<User> => {
      await delay(500);
      if (username === 'admin' && password === 'admin') {
        return MOCK_USER;
      }
      // For demo, any login works if not specific
      return MOCK_USER;
    },
    logout: async () => {
      await delay(300);
    }
  },
  attendance: {
    getHistory: async (): Promise<AttendanceRecord[]> => {
      await delay(400);
      return [...ATTENDANCE_DATA];
    },
    checkIn: async (): Promise<AttendanceRecord> => {
      await delay(500);
      return {
        id: `new_${Date.now()}`,
        userId: MOCK_USER.id,
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        checkOut: null,
        status: 'PRESENT', // Fixed generic type issue
        workHours: 0
      } as AttendanceRecord; 
    }
  },
  leave: {
    getRequests: async (): Promise<LeaveRequest[]> => {
      await delay(400);
      return [...LEAVE_REQUESTS];
    },
    createRequest: async (data: Partial<LeaveRequest>): Promise<LeaveRequest> => {
      await delay(600);
      return {
        ...data,
        id: `l_${Date.now()}`,
        status: 'PENDING',
        userName: MOCK_USER.name
      } as LeaveRequest;
    }
  },
  project: {
    getAll: async (): Promise<Project[]> => {
      await delay(300);
      return [...PROJECTS];
    },
    getWBS: async (projectId: string): Promise<Phase[]> => {
      await delay(500);
      return [...PROJECT_WBS].filter(p => p.projectId === projectId);
    }
  },
  issue: {
    getAll: async (): Promise<Issue[]> => {
      await delay(400);
      return [...ISSUES];
    }
  },
  test: {
    getAll: async (): Promise<UnitTest[]> => {
      await delay(300);
      return [...UNIT_TESTS];
    },
    uploadResult: async (file: File, testId: string): Promise<void> => {
        await delay(1000);
        console.log(`Uploaded ${file.name} for test ${testId}`);
    }
  }
};
