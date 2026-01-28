package com.deverp.core.mapper;

import com.deverp.core.domain.TestExecution;
import java.util.List;

public interface TestExecutionMapper {
    List<TestExecution> findByTestCaseId(Long testCaseId);

    TestExecution findById(Long id);

    int insert(TestExecution execution);

    int delete(Long id);
}
