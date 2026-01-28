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
