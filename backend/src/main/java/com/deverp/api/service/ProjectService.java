package com.deverp.api.service;

import com.deverp.core.domain.Project;
import com.deverp.core.domain.ProjectTask;
import com.deverp.core.mapper.ProjectMapper;
import com.deverp.core.mapper.ProjectTaskMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectMapper projectMapper;
    private final ProjectTaskMapper projectTaskMapper;

    public List<Project> getProjects() {
        return projectMapper.findAll();
    }

    public List<ProjectTask> getProjectTasks(Long projectId) {
        return projectTaskMapper.findByProjectId(projectId);
    }

    @Transactional
    public Project createProject(Project project) {
        projectMapper.insert(project);
        return projectMapper.findById(project.getId());
    }
}
