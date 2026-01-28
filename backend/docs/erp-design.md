# 개발팀 ERP 설계 초안

## 프로젝트 구조 (단일 모듈)
```
backend/
├─ build.gradle
└─ src/main/
   ├─ java/com/deverp/
   │  ├─ api/
   │  │  ├─ config/
   │  │  ├─ controller/
   │  │  └─ service/
   │  └─ core/
   │     ├─ domain/
   │     └─ mapper/
   └─ resources/
      ├─ application.yml
      ├─ application-closed.yml
      ├─ application-public.yml
      └─ mappers/
```

## 도메인 및 테이블 설계 (DDL 초안)
```sql
-- 회원/권한
CREATE TABLE user_account (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  department_code VARCHAR(50),
  job_title VARCHAR(50),
  role_code VARCHAR(50) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE access_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  action VARCHAR(100) NOT NULL,
  ip_address VARCHAR(50),
  user_agent VARCHAR(255),
  created_at TIMESTAMP
);

-- 출석
CREATE TABLE attendance_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  work_date DATE NOT NULL,
  check_in_at TIMESTAMP,
  check_out_at TIMESTAMP,
  status VARCHAR(30) NOT NULL,
  note VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (user_id, work_date)
);

-- 연차
CREATE TABLE leave_request (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  leave_type VARCHAR(30) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason VARCHAR(255),
  approval_status VARCHAR(30) NOT NULL,
  approver_id BIGINT,
  approved_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE leave_approval_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  leave_request_id BIGINT NOT NULL,
  approver_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL,
  comment VARCHAR(255),
  created_at TIMESTAMP
);

-- 프로젝트/WBS
CREATE TABLE project (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(30),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE project_phase (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE project_task (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_id BIGINT NOT NULL,
  phase_id BIGINT,
  title VARCHAR(200) NOT NULL,
  assignee_id BIGINT,
  start_date DATE,
  end_date DATE,
  progress_rate INT,
  estimated_hours INT,
  actual_hours INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 이슈
CREATE TABLE issue (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_id BIGINT NOT NULL,
  category VARCHAR(30) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(30) NOT NULL,
  severity VARCHAR(30),
  assignee_id BIGINT,
  due_date DATE,
  tags VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE issue_comment (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  issue_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE issue_relation (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  issue_id BIGINT NOT NULL,
  related_issue_id BIGINT NOT NULL,
  relation_type VARCHAR(30) NOT NULL
);

-- 단위테스트/파일
CREATE TABLE test_case (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  scenario VARCHAR(255) NOT NULL,
  precondition TEXT,
  input_value TEXT,
  expected_result TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE file_attachment (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  original_name VARCHAR(255) NOT NULL,
  stored_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(255) NOT NULL,
  content_type VARCHAR(100),
  file_size BIGINT,
  uploader_id BIGINT,
  created_at TIMESTAMP
);

CREATE TABLE test_execution (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  test_case_id BIGINT NOT NULL,
  tester_id BIGINT,
  actual_result TEXT,
  passed BOOLEAN,
  executed_at TIMESTAMP,
  attachment_id BIGINT
);
```

## REST API 설계 (핵심 CRUD)
### 출석
- GET `/api/attendance/users/{userId}`: 사용자 출석 목록 조회
- GET `/api/attendance/{id}`: 단건 조회
- POST `/api/attendance/users/{userId}/check-in`: 출근 등록
- PUT `/api/attendance/{id}`: 출석 수정
- DELETE `/api/attendance/{id}`: 출석 삭제

### 연차
- GET `/api/leaves/users/{userId}`: 연차 목록 조회
- GET `/api/leaves/{id}`: 단건 조회
- POST `/api/leaves`: 연차 신청
- PUT `/api/leaves/{id}`: 연차 수정/승인
- DELETE `/api/leaves/{id}`: 연차 삭제

### 회원
- GET `/api/users`: 사용자 목록 조회
- GET `/api/users/{id}`: 단건 조회
- POST `/api/users`: 사용자 생성
- PUT `/api/users/{id}`: 사용자 수정
- DELETE `/api/users/{id}`: 사용자 비활성화

### 프로젝트/WBS
- GET `/api/projects`: 프로젝트 목록 조회
- GET `/api/projects/{id}`: 단건 조회
- POST `/api/projects`: 프로젝트 생성
- PUT `/api/projects/{id}`: 프로젝트 수정
- DELETE `/api/projects/{id}`: 프로젝트 삭제
- GET `/api/projects/{projectId}/tasks`: 작업 목록 조회
- GET `/api/tasks/{id}`: 작업 단건 조회
- POST `/api/tasks`: 작업 생성
- PUT `/api/tasks/{id}`: 작업 수정
- DELETE `/api/tasks/{id}`: 작업 삭제

### 이슈
- GET `/api/issues/projects/{projectId}`: 프로젝트 이슈 목록
- GET `/api/issues/{id}`: 단건 조회
- POST `/api/issues`: 이슈 등록
- PUT `/api/issues/{id}`: 이슈 수정
- DELETE `/api/issues/{id}`: 이슈 삭제

### 단위테스트/파일
- GET `/api/tests/cases`: 테스트 케이스 목록
- GET `/api/tests/cases/{id}`: 테스트 케이스 단건
- POST `/api/tests/cases`: 테스트 케이스 생성
- PUT `/api/tests/cases/{id}`: 테스트 케이스 수정
- DELETE `/api/tests/cases/{id}`: 테스트 케이스 삭제
- GET `/api/tests/cases/{testCaseId}/executions`: 실행 이력 목록
- POST `/api/tests/executions`: 실행 이력 등록
- DELETE `/api/tests/executions/{id}`: 실행 이력 삭제
- GET `/api/files/{id}`: 첨부 파일 메타 조회
- POST `/api/files`: 첨부 파일 메타 등록
- DELETE `/api/files/{id}`: 첨부 파일 삭제

## 프론트 화면별 API 매핑 (예시)
- 로그인 화면: `POST /api/auth/login`, `POST /api/auth/logout`
- 출석 화면: `GET /api/attendance/users/{userId}`, `POST /api/attendance/users/{userId}/check-in`
- 연차 화면: `GET /api/leaves/users/{userId}`, `POST /api/leaves`
- 프로젝트/WBS 화면: `GET /api/projects`, `GET /api/projects/{projectId}/tasks`
- 이슈 화면: `GET /api/issues/projects/{projectId}`, `POST /api/issues`
- 단위테스트 화면: `GET /api/tests/cases`, `GET /api/tests/cases/{testCaseId}/executions`, `POST /api/tests/executions`
