package com.deverp.core.mapper;

import com.deverp.core.domain.TestCase;
import java.util.List;

public interface TestCaseMapper {
    List<TestCase> findAll();

    TestCase findById(Long id);

    int insert(TestCase testCase);

    int update(TestCase testCase);

    int delete(Long id);
}
