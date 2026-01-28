package com.deverp.api.controller;

import com.deverp.api.service.IssueService;
import com.deverp.core.domain.Issue;
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
@RequestMapping("/api/issues")
@Tag(name = "이슈", description = "이슈 등록 및 추적")
public class IssueController {
    private final IssueService issueService;

    @Operation(summary = "프로젝트 이슈 목록 조회")
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<List<Issue>> getIssues(@PathVariable Long projectId) {
        return ResponseEntity.ok(issueService.getProjectIssues(projectId));
    }

    @Operation(summary = "이슈 등록")
    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        return ResponseEntity.ok(issueService.createIssue(issue));
    }
}
