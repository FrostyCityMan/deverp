package com.deverp.api.service;

import com.deverp.core.domain.TestCase;
import com.deverp.core.domain.TestExecution;
import com.deverp.core.mapper.TestCaseMapper;
import com.deverp.core.mapper.TestExecutionMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestCaseMapper testCaseMapper;
    private final TestExecutionMapper testExecutionMapper;

    public List<TestCase> getTestCases() {
        return testCaseMapper.findAll();
    }

    public List<TestExecution> getExecutions(Long testCaseId) {
        return testExecutionMapper.findByTestCaseId(testCaseId);
    }

    @Transactional
    public TestExecution createExecution(TestExecution execution) {
        testExecutionMapper.insert(execution);
        return testExecutionMapper.findById(execution.getId());
    }
}
