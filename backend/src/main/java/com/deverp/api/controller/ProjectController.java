package com.deverp.api.controller;

import com.deverp.api.service.ProjectService;
import com.deverp.core.domain.Project;
import com.deverp.core.domain.ProjectTask;
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
@RequestMapping("/api/projects")
@Tag(name = "프로젝트", description = "프로젝트 및 WBS 관리")
public class ProjectController {
    private final ProjectService projectService;

    @Operation(summary = "프로젝트 목록 조회")
    @GetMapping
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(projectService.getProjects());
    }

    @Operation(summary = "프로젝트 생성")
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @Operation(summary = "프로젝트 작업 목록 조회")
    @GetMapping("/{projectId}/tasks")
    public ResponseEntity<List<ProjectTask>> getProjectTasks(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectService.getProjectTasks(projectId));
    }
}
