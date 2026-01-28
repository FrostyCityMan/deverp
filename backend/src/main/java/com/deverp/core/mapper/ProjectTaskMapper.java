package com.deverp.core.mapper;

import com.deverp.core.domain.ProjectTask;
import java.util.List;

public interface ProjectTaskMapper {
    List<ProjectTask> findByProjectId(Long projectId);

    ProjectTask findById(Long id);

    int insert(ProjectTask task);

    int update(ProjectTask task);

    int delete(Long id);
}
