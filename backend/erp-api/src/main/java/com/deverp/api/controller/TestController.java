package com.deverp.api.controller;

import com.deverp.api.service.TestService;
import com.deverp.core.domain.TestCase;
import com.deverp.core.domain.TestExecution;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tests")
@Tag(name = "단위테스트", description = "테스트 케이스 및 실행 이력")
public class TestController {
    private final TestService testService;

    @Operation(summary = "테스트 케이스 목록 조회")
    @GetMapping("/cases")
    public ResponseEntity<List<TestCase>> getCases() {
        return ResponseEntity.ok(testService.getTestCases());
    }

    @Operation(summary = "테스트 실행 이력 조회")
    @GetMapping("/cases/{testCaseId}/executions")
    public ResponseEntity<List<TestExecution>> getExecutions(@PathVariable Long testCaseId) {
        return ResponseEntity.ok(testService.getExecutions(testCaseId));
    }

    @Operation(summary = "테스트 실행 등록")
    @PostMapping("/executions")
    public ResponseEntity<TestExecution> createExecution(@RequestBody TestExecution execution) {
        return ResponseEntity.ok(testService.createExecution(execution));
    }
}
